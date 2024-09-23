import React, { useContext, useEffect, useState } from "react";
import styles from "./index.module.scss";
import ServiceCard from "../serviceCard";
import { Button, Image, TabbedNavigation } from "@components/module";
import { CloseIcon, Tick, Tickbox } from "@assets/images/svg";
import ExclusiveInfoCards from "../exclusiveInfoCards";
import { getCategory } from "@utils/sfcc-connector/dataService";
import WatchesContent from "../watchesContent";
import JewelleryContent from "../jewelleryContent";
import { BookAppointmentContext } from "@contexts/bookAppointmentContext";

// const brandSUggestions = [
//   "Rolex",
//   "Bell & Ross",
//   "Bvlgari",
//   "Patek Philippe",
//   "Emmanuel Bouchet",
//   "H Moser & Cie",
//   "Audemars Piguet",
//   "Dior",
//   "Moritz Grossmann",
//   "Hublot",
//   "Ferdinand Berthoud",
//   "Tag Heuer",
// ];

const StepTwo = () => {
  const { selectedCard, updateStep, handleStepChange, setSelectedCard } = useContext(BookAppointmentContext);
  if (!selectedCard) return null;

  let data = [
    {
      tabLabel: "Watches",
      content: <WatchesContent />,
    },
    {
      tabLabel: "Jewellery",
      content: <JewelleryContent />,
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
        <div className={`${styles.serviceCard}`}>
          <Image
            className={`${true && styles.serviceImg} ${styles.serviceImage}`}
            image={selectedCard?.media?.image}
            imageAltText={selectedCard?.media?.altText}
          />
          <div className={styles.serviceInfo}>
            <div className={styles.serviceTitle}>{selectedCard?.title}</div>
            <div className={styles.serviceDesc}>{selectedCard?.description}</div>
          </div>
          <div
            onClick={() => {
              handleStepChange(1);
              setSelectedCard(null);
              updateStep(1, false);
            }}
          >
            <CloseIcon className={styles.closeIcon} />
          </div>
        </div>
        <TabbedNavigation className={styles.tabNavigation} tabs={tabs} />
      </div>
      <ExclusiveInfoCards />
    </div>
  );
};

export default StepTwo;
