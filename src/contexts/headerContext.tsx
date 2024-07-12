import { ReactNode, createContext, useState } from "react";

interface HeaderContextProps {
  current: number;
  updateCurrent: (data: number) => void;
  headerData?: any;
}

export const HeaderContext = createContext<HeaderContextProps | undefined>(
  undefined
);

interface HeaderProviderProps {
  children: ReactNode;
  headerData?: any;
}

export const HeaderProvider: React.FC<HeaderProviderProps> = ({
  children,
  headerData,
}) => {
  const [current, setCurrent] = useState<number | null>(null);

  const updateCurrent = (data: number | null) => {
    setCurrent(data);
  };

  return (
    <HeaderContext.Provider
      value={{
        current,
        updateCurrent,
        headerData,
      }}
    >
      {children}
    </HeaderContext.Provider>
  );
};
