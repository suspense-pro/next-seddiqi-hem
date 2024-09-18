import React from "react";
import styles from "./index.module.scss";
import ServiceCard from "../serviceCard";
import { Button, TabbedNavigation } from "@components/module";
import { Tick, Tickbox } from "@assets/images/svg";

const StepTwo = ({ item, handleStepChange, setSelectedCard }) => {
  if (!item) return null;

  let data = [
    {
      tabLabel: "Watches",
      content: "Watches",
    },
    {
      tabLabel: "Jewellery",
      content: "Hello",
    },
  ];

  let tabs = data?.map((item, index) => {
    return {
      id: index + 1,
      title: item?.tabLabel,
      content: item?.content,
    };
  });

  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <ServiceCard
          handleStepChange={handleStepChange}
          setSelectedCard={setSelectedCard}
          className={styles.seriveCard}
          item={item}
          type={true}
        />
        <TabbedNavigation className={styles.tabNavigation} tabs={tabs} />

        <div className={styles.suggestionContainer}>
          <div className={styles.suggestionTitle}>Top Suggestions</div>
          <div className={styles.suggestionItems}>
            {[1, 2, 3, 4, 5, 6, 7, 8, 9, 20, 11, 12].map((item) => {
              return (
                <div className={styles.brandItem}>
                  {/* <input className={styles.inputCheckbox} type="checkbox" /> */}
                  <div className={styles.checkbox}>
                    <Tick className={styles.tick} />
                  </div>
                  <label htmlFor="name" className={styles.brandName}>
                    Patek Philippe
                  </label>
                </div>
              );
            })}
          </div>
          <Button title="View all brands" className={styles.brandBtn} type="plain" color="green_dark" />
        </div>
      </div>
    </div>
  );
};

export default StepTwo;
