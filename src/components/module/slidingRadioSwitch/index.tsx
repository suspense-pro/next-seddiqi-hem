import React, { useState } from 'react';
import styles from './slidingRadioSwitch.module.scss'; 

const SlidingRadioSwitch = ({ toggleLabel, onToggle }) => {
  const [checkedValue, setCheckedValued] = useState<Boolean>(false);

  return (
    <div className={styles.switchContainer}>
      <p className={styles.toggleLabel}>{toggleLabel}</p>

      <label className={styles.switch}>
        <input
          type="checkbox"
          name="toggle"
          onChange={() => {onToggle(checkedValue); setCheckedValued(prevIndex => (prevIndex === false ? true : false))}}
          className={styles.switchInput}
        />
        <span className={`${[styles.slider]} ${[styles.round]}`}></span>
      </label>
    </div>
  );
};

export default SlidingRadioSwitch;
