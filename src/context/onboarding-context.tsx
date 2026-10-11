import { createContext, ReactNode, useContext, useState } from "react";
import { UpdateProfile } from "../../type/request/profile/update-profile";

export type OnboardingContext = {
  step: number;
  setStep: (step: number) => void;
  data: Partial<UpdateProfile>;
  setData: (key: keyof UpdateProfile, value: any) => void;
};

const OnboardingContext = createContext({} as OnboardingContext);

export function useOnboarding() {
  return useContext(OnboardingContext);
}

export function OnboardingProvider({ children }: { children: ReactNode }) {
  const [step, setStep] = useState(1);
  const [data, setData] = useState({} as Partial<UpdateProfile>);

  function handleChangeData(key: keyof UpdateProfile, value: any) {
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
