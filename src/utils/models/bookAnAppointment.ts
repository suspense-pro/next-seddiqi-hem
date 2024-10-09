export interface BookAppointmentContextProps {
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
  updateStep: (stepNumber: number, isCompleted: boolean) => void;
  selectedWatches: any[];
  setSelectedWatches: (watches: any[]) => void;
  selectedJewellery: any[];
  setSelectedJewellery: (jewellery: any[]) => void;
  
  // New properties
  selectedDate: any | null;
  setSelectedDate: (date: any | null) => void;
  selectedTime: string | null;
  setSelectedTime: (time: string | null) => void;
}
