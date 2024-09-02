import React from "react";
import styles from "./collectionsCard.module.scss";
import Image from "@components/module/image";
import Video from "@components/module/video";
import GradientOverlay from "@components/module/gradientOverlay";

const CollectionsCard = ({ item, type }) => {
  const isProduct = type?.toLowerCase() === "product";
  return (
    <div className={`${isProduct && styles.productItem} ${styles.item}`}>
      <GradientOverlay opacity={item?.opacity?.opacity}>
        {item?.media?.image ? (
          <Image
            className={`${isProduct && styles.productImg} ${styles.image}`}
            image={item?.media?.image}
            imageAltText={item.media.altText}
          />
        ) : item?.media?.video ? (
          <div className={styles.videoContainer}>
            <Video className={styles.video} video={item?.media?.video} />
          </div>
        ) : null}
      </GradientOverlay>
      <div className={`${isProduct && styles.productContent} ${styles.itemContent}`}>
        <div className={styles.category}>{item?.title}</div>
        <div className={styles.title}>{item?.cta?.label}</div>
        {!item?.hideUnderline && <div className={styles.itemBar}>&nbsp;</div>}
      </div>
    </div>
  );
};

export default CollectionsCard;
