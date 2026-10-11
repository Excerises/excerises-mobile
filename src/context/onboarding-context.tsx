import { createContext, ReactNode, useContext, useState } from "react";
import { CalculateFitnessRequest } from "../../type/request/onboarding/calculate-fitness-level";

export type OnboardingContext = {
  step: number;
  setStep: (step: number) => void;
  data: Partial<CalculateFitnessRequest>;
  setData: (key: keyof CalculateFitnessRequest, value: any) => void;
};

const OnboardingContext = createContext({} as OnboardingContext);

export function useOnboarding() {
  return useContext(OnboardingContext);
}

export function OnboardingProvider({ children }: { children: ReactNode }) {
  const [step, setStep] = useState(1);
  const [data, setData] = useState({} as Partial<CalculateFitnessRequest>);

  function handleChangeData(key: keyof CalculateFitnessRequest, value: any) {
    setData((v) => {
      v[key] = value;
      return v;
    });
  }

  return (
    <OnboardingContext.Provider
      value={{
        step,
        setStep,
        data,
        setData: handleChangeData,
      }}
    >
      {children}
    </OnboardingContext.Provider>
  );
}
