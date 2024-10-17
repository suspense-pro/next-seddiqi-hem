import React, { useContext } from "react";
import styles from "./selectedBrands.module.scss";
import { EditIcon } from "@assets/images/svg";
import { BookAppointmentContext } from "@contexts/bookAppointmentContext";

const SelectedBrands = () => {
  const { selectedWatches, selectedJewellery, handleStepChange, setSelectedStore, updateStep } = useContext(BookAppointmentContext);

  if (!selectedWatches || !selectedJewellery) return null;

  return (
    <div className={`${styles.container}`}>
      <div className={styles.selectedBrands}>
        {selectedWatches?.map((brand, index) => (
          <div className={styles.brand} key={brand}>
            {brand}
            {index < selectedWatches.length - 1 ? ", " : ""}
          </div>
        ))}

        {selectedJewellery?.map((brand, index) => (
          <div className={styles.brand} key={brand}>
            {brand}
            {index < selectedJewellery.length - 1 ? ", " : ""}
          </div>
        ))}
      </div>
      <div
        onClick={() => {
          handleStepChange(2);
          setSelectedStore(null);
          updateStep(2, false);
        }}
        className={styles.closeIconContainer}
      >
        <EditIcon className={styles.closeIcon} />
      </div>
    </div>
  );
};

export default SelectedBrands;
