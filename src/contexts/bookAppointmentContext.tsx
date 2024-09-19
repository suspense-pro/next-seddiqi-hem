import React, { createContext, useState, useEffect, useContext } from "react";

interface BookAppointmentContextProps {
  selectedCard: any;
  setSelectedCard: (card: any) => void;
  selectedBrands: any[];
  setSelectedBrands: (brands: any[]) => void;
  completedSteps: boolean[];
  setCompletedSteps: (steps: boolean[]) => void;
  currentStep: number;
  setCurrentStep: (step: number) => void;
  handleStepChange: (step: number) => void;
  markStepCompleted: () => void;
}

export const BookAppointmentContext = createContext<BookAppointmentContextProps | undefined>(undefined);

export const useBookAppointmentContext = () => {
  const context = useContext(BookAppointmentContext);
  if (!context) {
    throw new Error("useBookAppointmentContext must be used within a BookAppointmentProvider");
  }
  return context;
};

export const BookAppointmentProvider = ({ children }) => {
  const [selectedCard, setSelectedCard] = useState(null);
  const [selectedBrands, setSelectedBrands] = useState<any[]>([]);
  const [completedSteps, setCompletedSteps] = useState<boolean[]>([false, false, false, false, false]);
  const [currentStep, setCurrentStep] = useState<number | null>(null);
  const [loading, setLoading] = useState(true);

  // Handle Step Change
  const handleStepChange = (step: number) => {
    if (selectedCard) {
      setCompletedSteps((prev) => {
        const updated = [...prev];
        updated[0] = true;
        return updated;
      });
    }
    setCurrentStep(step);
  };

  const markStepCompleted = () => {
    setCompletedSteps((prev) => {
      const updated = [...prev];
      updated[currentStep - 1] = true;
      return updated;
    });
  };

  // On component mount, check if there's a saved step in localStorage
  useEffect(() => {
    const savedStep = localStorage.getItem("currentStep");
    if (savedStep) {
      setCurrentStep(Number(savedStep));
    } else {
      setCurrentStep(1); // Default to step 1 if nothing is in localStorage
    }
    setLoading(false); // Finished loading
  }, []);

  // Save the current step in localStorage whenever it changes
  useEffect(() => {
    if (currentStep !== null) {
      localStorage.setItem("currentStep", JSON.stringify(currentStep));
    }
  }, [currentStep]);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <BookAppointmentContext.Provider
      value={{
        selectedCard,
        setSelectedCard,
        selectedBrands,
        setSelectedBrands,
        completedSteps,
        setCompletedSteps,
        currentStep,
        setCurrentStep,
        handleStepChange,
        markStepCompleted,
      }}
    >
      {children}
    </BookAppointmentContext.Provider>
  );
};
