import React from "react";
import styles from "./index.module.scss";
import ExclusiveInfoCards from "../exclusiveInfoCards";
import ServiceCard from "../serviceCard";

const StepOne = ({ content, handleStepChange, setSelectedCard }) => {
  if (!content) return null;
  return (
    <div className={styles.container}>
      <div className={styles.heading}>
        <div className={styles.title}>{content?.title}</div>
        <div className={styles.desc}>{content?.description}</div>
      </div>

      <div className={styles.serviceCards}>
        {content?.listItems?.map((item) => (
          <div
            onClick={() => {
              setSelectedCard(item);
              handleStepChange(2);
            }}
          >
            <ServiceCard handleStepChange={handleStepChange} setSelectedCard={setSelectedCard} item={item} />
          </div>
        ))}
      </div>
      <ExclusiveInfoCards />
    </div>
  );
};

export default StepOne;
