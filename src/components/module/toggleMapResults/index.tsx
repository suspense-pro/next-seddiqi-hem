import React from "react";
import SlidingRadioSwitch from "@components/module/slidingRadioSwitch";
import styles from "./toggleMapResults.module.scss";

const ToggleMapResults = ({ onToggle, activeTab, storeCounts }) => {
  return (
    <div className={styles.toggleResultsContainer}>
      <SlidingRadioSwitch toggleLabel={"Map View"} onToggle={onToggle} />
      <p className={styles.storeResult}>
        {storeCounts[activeTab] > 10 ? storeCounts[activeTab] : "0" + storeCounts[activeTab]} Results
      </p>
    </div>
  );
};

export default ToggleMapResults;