import { useRouter } from "expo-router";

import { createContext, useContext, useState } from "react";

import type { ReactNode } from "react";

type OnboardingStep = "profile" | "bmi" | "workout" | "time";

type OnboardingContextType = {
  step: OnboardingStep;
  setStep: (step: OnboardingStep) => void;
  handleBack: () => void;
};

const OnboardingContext = createContext<OnboardingContextType | undefined>(
  undefined,
);

export function useOnboardingContext() {
  const context = useContext(OnboardingContext);

  if (!context) {
    throw new Error(
      "useOnboardingContext must be used inside OnboardingProvider",
    );
  }

  return context;
}

export default function OnboardingProvider({
  children,
}: {
  children: ReactNode;
}) {
  const router = useRouter();

  const [step, setStep] = useState<OnboardingStep>("profile");

  const handleBack = () => {
    if (step === "time") {
      setStep("workout");
    } else if (step === "workout") {
      setStep("bmi");
    } else if (step === "bmi") {
      setStep("profile");
    } else {
      router.replace("/login");
    }
  };

  return (
    <OnboardingContext.Provider
      value={{
        step,
        setStep,
        handleBack,
      }}
    >
      {children}
    </OnboardingContext.Provider>
  );
}
