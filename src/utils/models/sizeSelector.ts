export interface SizeSelectorProps {
    title: string | null;
    description: string | null;
    onClose: () => void;
    isOpen: boolean;
    productId?: string;
  }