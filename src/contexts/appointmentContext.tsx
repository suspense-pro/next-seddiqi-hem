import React, { createContext, useContext, useState, useEffect, ReactNode } from "react";

interface AppointmentContextType {
  currentStep: number | null;
  handleStepChange: (step: number) => void;
  markStepCompleted: () => void;
  completedSteps: boolean[];
}

const AppointmentContext = createContext<AppointmentContextType | undefined>(undefined);

export const AppointmentProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [currentStep, setCurrentStep] = useState<number | null>(null);
  const [completedSteps, setCompletedSteps] = useState<boolean[]>([false, false, false, false, false]);

  useEffect(() => {
    const savedStep = localStorage.getItem("currentStep");
    if (savedStep) {
      setCurrentStep(Number(savedStep));
    } else {
      setCurrentStep(1); // Default to step 1 if nothing is in localStorage
    }
  }, []);

  useEffect(() => {
    if (currentStep !== null) {
      localStorage.setItem("currentStep", JSON.stringify(currentStep));
    }
  }, [currentStep]);

  const handleStepChange = (step: number) => {
    if (step > 1 && !completedSteps[step - 2]) {
      alert("Please complete the previous steps first.");
      return;
    }
    setCurrentStep(step);
  };

  const markStepCompleted = () => {
    setCompletedSteps((prev) => {
      const updated = [...prev];
      updated[currentStep! - 1] = true;
      return updated;
    });
  };

  return (
    <AppointmentContext.Provider value={{ currentStep, handleStepChange, markStepCompleted, completedSteps }}>
      {children}
    </AppointmentContext.Provider>
  );
};

export const useAppointmentContext = (): AppointmentContextType => {
  const context = useContext(AppointmentContext);
  if (context === undefined) {
    throw new Error("useAppointmentContext must be used within an AppointmentProvider");
  }
  return context;
};
