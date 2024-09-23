import React from "react";
import styles from "../allFIlters.module.scss";
import Typography from "@components/module/typography";
import { Ellipse } from "@assets/images/svg";

const SortFilter = ({ sortingOptions, selectedSortOption, onSortChange }) => {
  const handleOptionChange = (event) => {
    onSortChange(event.target.value);
  };

  return (
    <div className={styles.container}>
      <div className={styles.radioGroup}>
        {sortingOptions.map((option) => (
          <label key={option.id} className={styles.radioLabel}>
            <input
              type="radio"
              value={option.id} 
              checked={selectedSortOption === option.id}
              onChange={handleOptionChange}
              className={styles.radioInput}
            />
            <div className={styles.customRadio}>
              <Ellipse className={styles.radioEllipse} />
              <div className={styles.radioDot} />
            </div>
            <Typography align="left" variant="p" className={styles.title}>
              {option.label}
            </Typography>
          </label>
        ))}
      </div>
    </div>
  );
};

export default SortFilter;
