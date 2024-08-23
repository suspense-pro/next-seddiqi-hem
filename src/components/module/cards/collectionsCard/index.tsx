import React from "react";
import styles from "./collectionsCard.module.scss";
import Image from "@components/module/image";
import Video from "@components/module/video";

const CollectionsCard = ({ item }) => {
  // console.log("Item", item);
  return (
    <div className={styles.item}>
      {item?.media?.image ? (
        <Image className={`${styles.image}`} image={item?.media?.image} imageAltText={item.media.altText} />
      ) : item?.media?.video ? (
        <div className={styles.videoContainer}>
          <Video className={styles.video} video={item?.media?.video} />
        </div>
      ) : null}
      {!item?.hideOverlay && (
        <div className={styles.itemContent}>
          <div className={styles.category}>{item?.title}</div>
          <div className={styles.title}>{item?.cta?.label}</div>
          {!item?.hideUnderline && <div className={styles.itemBar}>&nbsp;</div>}
        </div>
      )}
    </div>
  );
};

export default CollectionsCard;
