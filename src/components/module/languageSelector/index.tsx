import React, { useContext } from "react";
import { LanguageContext, LANGUAGE_DICT, COUNTRY_DICT } from "@contexts/languageContext";
import styles from "./languageSelector.module.scss";
import { ArrowDown } from "@assets/images/svg";

interface LanguageSelectorProps {
  className?: string;
}

const LanguageSelector: React.FC<LanguageSelectorProps> = ({ className }) => {
  const {
    language,
    country,
    handleLanguageChange,
    handleCountryChange,
  } = useContext(LanguageContext);

  return (
    <div className={`${styles.selection} ${className}`}>
      <label className={styles.label}>COUNTRY & LANGUAGE</label>
      <div className={styles.dropdowns}>
        <div className={`${styles.dropdown} ${styles.countryDropdown}`}>
          <div className={styles.customSelect}>
            <select
              onChange={(e) => handleCountryChange?.(e.target.value)}
              value={country || "ae"}
            >
              {Object.entries(COUNTRY_DICT).map(([key, name]) => (
                <option key={key} value={key}>
                  {name}
                </option>
              ))}
            </select>
            <ArrowDown className={styles.arrow} />
          </div>
        </div>
        <div className={`${styles.dropdown} ${styles.languageDropdown}`}>
          <div className={styles.customSelect}>
            <select
              onChange={(e) => handleLanguageChange?.(e.target.value)}
              value={language || "en"}
            >
              {Object.entries(LANGUAGE_DICT).map(([key, name]) => (
                <option key={key} value={key}>
                  {name}
                </option>
              ))}
            </select>
            <ArrowDown className={styles.arrow} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default LanguageSelector;
