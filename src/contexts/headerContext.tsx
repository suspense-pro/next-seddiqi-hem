import { headerDummyData } from "@components/rendering/header/dummyData";
import { ReactNode, createContext, useState } from "react";

interface HeaderContextProps {
  headerData: typeof headerDummyData;
}

export const HeaderContext = createContext<HeaderContextProps | undefined>(
  undefined
);

interface HeaderProviderProps {
  children: ReactNode;
}

export const HeaderProvider: React.FC<HeaderProviderProps> = ({ children }) => {
  const [headerData, setHeaderData] =
    useState<typeof headerDummyData>(headerDummyData);

  console.log(headerData);

  return (
    <HeaderContext.Provider value={{ headerData }}>
      {children}
    </HeaderContext.Provider>
  );
};
