import { CloseIcon, MapIcon } from "@assets/images/svg";
import styles from "./selectedLocation.module.scss";
import { useContext } from "react";
import { BookAppointmentContext } from "@contexts/bookAppointmentContext";

const SelectedLocation = () => {
  const { selectedCard, updateStep, handleStepChange, setSelectedCard } = useContext(BookAppointmentContext);

  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <div className={styles.locationDetails}>
          <div className={styles.header}>
            <h2>Ahmed Seddiqi</h2>
            <div
              onClick={() => {
                handleStepChange(3);
                updateStep(3, false);
              }}
            >
              <CloseIcon className={styles.closeIcon} />
            </div>
          </div>

          <p>
            <span className={styles.icon}>
              <MapIcon />
            </span>{" "}
            Dubai | The Grand Atrium
          </p>
        </div>
      </div>
    </div>
  );
};

export default SelectedLocation;
