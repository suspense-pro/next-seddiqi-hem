import React from "react";
import styles from "./exclusiveInfoCards.module.scss";
import { CareIcon, ProtectionIcon, WatchIcon } from "@assets/images/svg";
import Image from "@components/module/image";

const ExclusiveInfoCards = ({ exclusiveInfoCards }) => {
  if (!exclusiveInfoCards) {
    return null;
  }
  return (
    <div className={styles.container}>
      <div className={styles.title}>{exclusiveInfoCards?.title}</div>
      <div className={styles.cards}>
        {exclusiveInfoCards?.listItems?.map((item) => {
          return (
            <div className={`${styles[item?.backgroundColor]} ${styles.infoListCard}`}>
              <Image
                height={styles.height}
                className={styles.image}
                image={item?.logo?.image?.image}
                imageAltText={item?.logo?.image?.altText}
              />
              <div className={styles.info}>
                <div className={styles.infoTitle}>{item?.title}</div>
                <div className={styles.infoDesc}>{item?.subTitle}</div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ExclusiveInfoCards;
