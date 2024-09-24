import React from "react";
import { Typography } from "@components/module";
import styles from "./categoryCard.module.scss";
import Image from "@components/module/image";
import Video from "@components/module/video";
import GradientOverlay from "@components/module/gradientOverlay";

const CategoryCard: React.FC<any> = ({ item }) => {
  return (
    <div>
      <GradientOverlay
        opacity={item?.opacity?.opacity}
        className={styles.containerImg}
      >
        <div className={styles.categoryListItem}>
          {item?.media?.image ? (
            <Image className={styles.image} image={item?.media?.image} />
          ) : item?.media?.video ? (
            <Video
              className={styles.image}
              video={item?.media?.video}
              autoPlay={item?.media?.autoPlay}
              showPlay={item?.media?.showPlay}
            />
          ) : null}
        </div>
      </GradientOverlay>
      <div className={styles.contentWrapper}>
        {item?.title && (
          <div className={styles.titleContainer}>
            <Typography variant="h2" className={styles.slideTitle}>
              {item.title}
            </Typography>
          </div>
        )}
        {item?.description && (
          <div className={styles.descriptionContainer}>
            <Typography variant="h5" className={styles.slideDescription}>
              {item.description}
            </Typography>
          </div>
        )}
      </div>
    </div>
  );
};

export default CategoryCard;
