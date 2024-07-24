import React, { useState } from "react";
import styles from "./filterAccordian.module.scss";
import { ArrowDown } from "@assets/images/svg";
import Typography from "../typography";

const FilterAccordionItem = ({ title, children }) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleOpen = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className={`${styles.accordionItem} ${isOpen ? styles.open : ""}`}>
      <div className={styles.accordionHeader} onClick={toggleOpen}>
        <Typography
          align="left"
          variant="p"
          className={styles.accordionHeaderText}
        >
          {title}
        </Typography>
        <div className={styles.iconGroup}>
          <Typography align="left" variant="p" className={styles.clearText}>
            (00) Clear
          </Typography>
          <ArrowDown
            className={`${styles.arrow} ${isOpen ? styles.rotate : ""}`}
          />
        </div>
      </div>
      {isOpen && <div className={styles.accordionContent}>{children}</div>}
    </div>
  );
};

const FilterAccordian = ({ children }) => {
  return <div className={styles.accordion}>{children}</div>;
};

export { FilterAccordian, FilterAccordionItem };
