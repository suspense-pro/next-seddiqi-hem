import { FC, ReactNode, createContext, useEffect, useState } from "react";

import { useRouter } from "next/router";

export enum LANGUAGE_DICT {
  "en" = "English",
  "ar" = "عربى",
}

export type LanguageContextType = {
  language: string;
  handleLanguageChange?: (value: string) => void;
  allLocales: string[] | undefined;
};

export const LanguageContext = createContext<LanguageContextType>({
  language: "en",
  allLocales: ["en", "ar"],
});

const LanguageProvider: FC<{ children: ReactNode }> = ({ children }) => {
  const router = useRouter();
  const { locale: activeLocale, locales: allLocales, asPath } = router;
  const [language, setLanguage] = useState<string>(activeLocale as string);

  useEffect(() => {
    document.documentElement.setAttribute("lang", language);
    document.documentElement.setAttribute(
      "dir",
      activeLocale === "ar" ? "rtl" : "ltr"
    );
  }, [activeLocale]);

  const handleLanguageChange = (value: string) => {
    setLanguage(value);
    router.push(asPath, asPath, { locale: value });
  };

  return (
    <LanguageContext.Provider
      value={{ language, handleLanguageChange, allLocales }}
    >
      {children}
    </LanguageContext.Provider>
  );
};

export default LanguageProvider;
