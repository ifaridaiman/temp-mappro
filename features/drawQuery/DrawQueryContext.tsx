import React, { createContext, useContext, useState, ReactNode } from "react";
import { ArahanTypeEnum, JenisArahanEnum, NoSiriEnum, SkalaEnum } from "./enum/formEnum";

type DrawQueryContextType = {
  step: number;
  setStep: (step: number) => void;
  nextStep: () => void; // Add this
  prevStep: () => void; // Add this
  selectedArahan: ArahanTypeEnum | null;
  setSelectedArahan: (selectedArahan: ArahanTypeEnum) => void;
  selectedNoSiri: NoSiriEnum | null;
  setSelectedNoSiri: (selectedNoSiri: NoSiriEnum) => void;
  selectedJenisArahan: JenisArahanEnum | null;
  setSelectedJenisArahan: (selectedJenisArahan: JenisArahanEnum) => void;
  selectedSkala: SkalaEnum | null;
  setSelectedSkala: (selectedSkala: SkalaEnum) => void;
  // Add any other state you want to share across the components
};

const DrawQueryContext = createContext<DrawQueryContextType | undefined>(
  undefined
);

export const useDrawQueryContext = () => {
  const context = useContext(DrawQueryContext);
  if (!context) {
    throw new Error("useDrawQueryContext must be used within a ThemeProvider");
  }
  return context;
};

type DrawQueryProviderProps = {
  children: ReactNode;
};

export const DrawQueryProvider = ({ children }: DrawQueryProviderProps) => {
  const [step, setStep] = useState(0);
  const [selectedArahan, setSelectedArahan] = useState<ArahanTypeEnum | null>(null);
  const [selectedNoSiri, setSelectedNoSiri] = useState<NoSiriEnum | null>(null);
  const [selectedJenisArahan, setSelectedJenisArahan] =useState<JenisArahanEnum | null>(null);
  const [selectedSkala, setSelectedSkala] =useState<SkalaEnum | null>(null);

  const nextStep = () => setStep(step + 1);
  const prevStep = () => setStep(step - 1);
  return (
    <DrawQueryContext.Provider
      value={{
        step,
        setStep,
        nextStep,
        prevStep,
        selectedArahan,
        setSelectedArahan,
        selectedNoSiri,
        setSelectedNoSiri,
        selectedJenisArahan,
        setSelectedJenisArahan,
        selectedSkala, 
        setSelectedSkala
      }}
    >
      {children}
    </DrawQueryContext.Provider>
  );
};
