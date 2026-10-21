import { createContext, ReactNode, useContext, useState } from "react";
import { UpdateProfileRequest } from "../../type/api/profile/update-profile";

export type OnboardingContext = {
  step: number;
  setStep: (step: number) => void;
  data: Partial<UpdateProfileRequest>;
  setData: (key: keyof UpdateProfileRequest, value: any) => void;
};

const OnboardingContext = createContext({} as OnboardingContext);

export function useOnboarding() {
  return useContext(OnboardingContext);
}

export function OnboardingProvider({ children }: { children: ReactNode }) {
  const [step, setStep] = useState(1);
  const [data, setData] = useState({} as Partial<UpdateProfileRequest>);

  function handleChangeData(key: keyof UpdateProfileRequest, value: any) {
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
