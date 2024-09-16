import React from "react";
import styles from "./exclusiveInfoCards.module.scss";
import { CareIcon, ProtectionIcon, WatchIcon } from "@assets/images/svg";

const ExclusiveInfoCards = () => {
  return (
    <div className={styles.container}>
      <div className={styles.title}>Why Ahmed Seddiqi Is the Best Place to Buy Luxury Watches</div>
      <div className={styles.cards}>
        <div className={styles.infoListCard}>
          <CareIcon />
          <div className={styles.info}>
            <div className={styles.infoTitle}>Product Care and Protection</div>
            <div className={styles.infoDesc}>
              Discover our maintenance available services in order to take care of your watch or your Atmos.
            </div>
          </div>
        </div>
        <div className={styles.infoListCard}>
          <WatchIcon />
          <div className={styles.info}>
            <div className={styles.infoTitle}>Up to 5 Years of Exclusive Warranty</div>
            <div className={styles.infoDesc}>
              Highly personalised experience with value-adding information, advice and services.{" "}
            </div>
          </div>
        </div>
        <div className={styles.infoListCard}>
          <ProtectionIcon />
          <div className={styles.info}>
            <div className={styles.infoTitle}>Product Protection Kit</div>
            <div className={styles.infoDesc}>
              We understand the frustration of seeing your beloved watch marred by scratches and scuffs.{" "}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ExclusiveInfoCards;
