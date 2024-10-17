import React, { useState } from "react";
import styles from "./filterAccordian.module.scss";
import { ArrowDown } from "@assets/images/svg";
import Typography from "../typography";

const FilterAccordionItem = ({ title, children, onClear, selectedCount }) => {
  const [isOpen, setIsOpen] = useState(false);
  
  const toggleOpen = () => {
    setIsOpen(!isOpen);
  };

  const handleClear = () => {
    if (onClear) {
      onClear();
    }
  };

  const formattedCount = selectedCount < 10 ? `0${selectedCount}` : selectedCount;

  return (
    <div className={`${styles.accordionItem} ${isOpen ? styles.open : ""}`}>
      <div className={styles.accordionHeader}>
        <Typography
          align="left"
          variant="p"
          className={styles.accordionHeaderText}
        >
          {title}
        </Typography>
        <div className={styles.iconGroup}>
          <div className={styles.clearTextContainer} onClick={handleClear}>
            <Typography align="left" variant="p" className={styles.clearText}>
            ({formattedCount}) Clear
            </Typography>
          </div>
          <ArrowDown
            className={`${styles.arrow} ${isOpen ? styles.rotate : ""}`}
          />
        </div>
        <span className={styles.accordionHeaderClick} onClick={toggleOpen}></span>
      </div>
      {isOpen && <div className={styles.accordionContent}>{children}</div>}
    </div>
  );
};

const FilterAccordian = ({ children }) => {
  return <div className={styles.accordion}>{children}</div>;
};

export { FilterAccordian, FilterAccordionItem };
