import React, { useState } from "react";
import styles from "../allFIlters.module.scss";
import Typography from "@components/module/typography";
import { Ellipse } from "@assets/images/svg";

const sortOptions = [
  "Featured",
  "Most Popular",
  "Price (low to high)",
  "Price (high to low)",
  "Name (A-Z)",
  "Name (Z-A)",
];

const SortFilter = () => {
  const [selectedOption, setSelectedOption] = useState(sortOptions[0]);

  const handleOptionChange = (event) => {
    setSelectedOption(event.target.value);
  };

  return (
    <div className={styles.container}>
      <div className={styles.radioGroup}>
        {sortOptions.map((option) => (
          <label key={option} className={styles.radioLabel}>
            <input
              type="radio"
              value={option}
              checked={selectedOption === option}
              onChange={handleOptionChange}
              className={styles.radioInput}
            />
            <div className={styles.customRadio}>
              <Ellipse className={styles.radioEllipse} />
              <div className={styles.radioDot} />
            </div>
            <Typography align="left" variant="p" className={styles.title}>
              {option}
            </Typography>
          </label>
        ))}
      </div>
    </div>
  );
};

export default SortFilter;
