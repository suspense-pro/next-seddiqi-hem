import { FC, ReactNode, createContext, useEffect, useState } from "react";
import { useRouter } from "next/router";

export const LANGUAGE_DICT = {
  en: "English",
  ar: "عربى",
};

export const COUNTRY_DICT = {
  ae: "UAE",
  us: "US",
  uk: "UK",
};

export type LanguageContextType = {
  language: string;
  country: string;
  handleLanguageChange?: (value: string) => void;
  handleCountryChange?: (value: string) => void;
  allLocales: string[] | undefined;
};

export const LanguageContext = createContext<LanguageContextType>({
  language: "en",
  country: "ae",
  allLocales: ["en", "ar"],
});

const LanguageProvider: FC<{ children: ReactNode }> = ({ children }) => {
  const router = useRouter();
  const { locale: activeLocale, locales: allLocales, asPath } = router;

  const [language, setLanguage] = useState<string>(activeLocale || "en");
  const [country, setCountry] = useState<string>("ae");

  useEffect(() => {
    document.documentElement.setAttribute("lang", language);
    document.documentElement.setAttribute(
      "dir",
      language === "ar" ? "rtl" : "ltr"
    );
  }, [language]);

  const handleLanguageChange = (value: string) => {
    setLanguage(value);
    router.push(asPath, asPath, { locale: value });
  };

  const handleCountryChange = (value: string) => {
    setCountry(value);
  };

  return (
    <LanguageContext.Provider
      value={{
        language,
        country,
        handleLanguageChange,
        handleCountryChange,
        allLocales,
      }}
    >
      {children}
    </LanguageContext.Provider>
  );
};

export default LanguageProvider;
