import { BookAppointmentContextProps } from "@utils/models/bookAnAppointment";
import React, { createContext, useState, useEffect, useContext } from "react";


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
  const [selectedWatches, setSelectedWatches] = useState<any[]>([]);
  const [selectedJewellery, setSelectedJewellery] = useState<any[]>([]);
  const [completedSteps, setCompletedSteps] = useState<boolean[]>([false, false, false, false, false]);
  const [currentStep, setCurrentStep] = useState<number | null>(4);
  const [loading, setLoading] = useState(true);

  // Handle Step Change
  const handleStepChange = (step: number) => {
    setCurrentStep(step);
  };

  const markStepCompleted = () => {
    setCompletedSteps((prev) => {
      const updated = [...prev];
      updated[currentStep - 1] = true;
      return updated;
    });
  };

  const updateStep = (stepNumber: number, isCompleted: boolean) => {
    if (stepNumber < 1 || stepNumber > completedSteps.length) {
      console.error("Invalid step number");
      return;
    }

    setCompletedSteps((prev) => {
      const updated = [...prev];
      updated[stepNumber - 1] = isCompleted;
      localStorage.setItem("completedSteps", JSON.stringify(updated));
      return updated;
    });
  };

  useEffect(() => {
    const savedStep = localStorage.getItem("currentStep");
    const savedCompletedSteps = localStorage.getItem("completedSteps");
    const savedSelectedCard = localStorage.getItem("selectedCard");
    const savedWatches = localStorage.getItem("selectedWatches");
    const savedJewellery = localStorage.getItem("selectedJewellery");

    if (savedStep) {
      setCurrentStep(Number(savedStep));
    } else {
      setCurrentStep(1);
    }

    if (savedCompletedSteps) {
      setCompletedSteps(JSON.parse(savedCompletedSteps));
    }

    if (savedSelectedCard) {
      setSelectedCard(JSON.parse(savedSelectedCard));
    }

    if (savedWatches) {
      setSelectedWatches(JSON.parse(savedWatches));
    }

    if (savedJewellery) {
      setSelectedJewellery(JSON.parse(savedJewellery));
    }

    setLoading(false); 
  }, []);

  // Save the current step in localStorage whenever it changes
  useEffect(() => {
    if (currentStep !== null) {
      localStorage.setItem("currentStep", JSON.stringify(currentStep));
    }
  }, [currentStep]);

  // Save completed steps in localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem("completedSteps", JSON.stringify(completedSteps));
  }, [completedSteps]);

  // Save selectedCard in localStorage whenever it changes
  useEffect(() => {
    if (selectedCard) {
      localStorage.setItem("selectedCard", JSON.stringify(selectedCard));
    }
  }, [selectedCard]);

  // Save selectedWatches in localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem("selectedWatches", JSON.stringify(selectedWatches));
  }, [selectedWatches]);

  // Save selectedJewellery in localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem("selectedJewellery", JSON.stringify(selectedJewellery));
  }, [selectedJewellery]);

  // When selectedCard changes, mark the first step as completed
  useEffect(() => {
    if (selectedCard) {
      setCompletedSteps((prev) => {
        const updated = [...prev];
        updated[0] = true;
        return updated;
      });
    }
  }, [selectedCard]);

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
        updateStep,
        selectedWatches,
        setSelectedWatches,
        selectedJewellery,
        setSelectedJewellery,
      }}
    >
      {children}
    </BookAppointmentContext.Provider>
  );
};
