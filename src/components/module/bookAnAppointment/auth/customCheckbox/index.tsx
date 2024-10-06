import React, { useState } from "react";
import styles from "./CustomCheckbox.module.scss"; // Import as a module

const CustomCheckbox = ({ label, subText }) => {
  const [checked, setChecked] = useState(false);

  const handleCheckboxChange = () => {
    setChecked(!checked);
  };

  return (
    <div className={styles.checkboxContainer}>
      <label className={styles.customCheckbox}>
        <input
          type="checkbox"
          checked={checked}
          onChange={handleCheckboxChange}
        />
        <span className={`${styles.checkboxSwitch} ${checked ? styles.checked : ""}`}>
          <span className={`${styles.innerSwitch}  ${checked ? styles.checked : ""}`}></span>
        </span>
      </label>
      <div className={styles.checkboxLabel}>
        {label}
        <span className={styles.checkboxSubtext}>{subText}</span>
      </div>
    </div>
  );
};

export default CustomCheckbox;
