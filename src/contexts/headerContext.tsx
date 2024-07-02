import { headerDummyData } from "@components/rendering/header/dummyData";
import { ReactNode, createContext, useState } from "react";

interface HeaderContextProps {
  headerData: typeof headerDummyData;
  current: number;
  updateCurrent: (data: number) => void;
  header_data?: any;
}

export const HeaderContext = createContext<HeaderContextProps | undefined>(
  undefined
);

interface HeaderProviderProps {
  children: ReactNode;
  header_data?: any;
}

export const HeaderProvider: React.FC<HeaderProviderProps> = ({
  children,
  header_data,
}) => {
  const [headerData, setHeaderData] =
    useState<typeof headerDummyData>(headerDummyData);
  const [current, setCurrent] = useState<number | null>(null);

  const updateCurrent = (data: number | null) => {
    setCurrent(data);
  };

  return (
    <HeaderContext.Provider
      value={{ headerData, current, updateCurrent, header_data }}
    >
      {children}
    </HeaderContext.Provider>
  );
};
