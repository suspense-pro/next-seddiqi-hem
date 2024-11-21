import React from "react";
import { Typography } from "@components/module";
import styles from "./categoryCard.module.scss";
import Image from "@components/module/image";
import Video from "@components/module/video";
import GradientOverlay from "@components/module/gradientOverlay";

const CategoryCard: React.FC<any> = ({ item }) => {
  // Check if at least one media (image or video) is present
  const hasMedia = item?.media?.image || item?.media?.video;

  return (
    <div>
      {hasMedia && (
        <GradientOverlay
          opacity={item?.opacity?.opacity}
          className={styles.containerImg}
        >
          <div className={styles.categoryListItem}>
            {item?.media?.image ? (
              <a href={item?.linkUrl} className={styles.imageContainer}>
                <Image className={styles.image} image={item?.media?.image} />
              </a>
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
      )}
      <div className={styles.contentWrapper}>
        {item?.title && (
          <div className={styles.titleContainer}>
            {item?.title && (
              <Typography variant="h2" className={styles.slideTitle}>
             <a href={item?.linkText}>{item?.title}</a>
            </Typography>
              
            )}
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
