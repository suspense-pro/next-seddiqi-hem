import React from "react";
import styles from "./introPopUp.module.scss";
import { GradientOverlay, Image, Typography, Video } from "@components/module";
import { CloseIconV2 } from "@assets/images/svg";
import RichText from "@components/module/richText";

const IntroPopUp = ({ imageInfo, setImageInfo }) => {
  const onlyMedia = !imageInfo?.title && !imageInfo?.description;

  return (
    <div className={styles.container}>
      <div className={styles.section}>
        <div onClick={() => setImageInfo(null)} className={styles.closeIcon}>
          <CloseIconV2 />
        </div>

        {imageInfo?.media?.image ? (
          <GradientOverlay className={`${onlyMedia && styles.imgFull} ${styles.image}`} opacity={60}>
            <Image
              className={`${onlyMedia && styles.imgFull} ${styles.image}`}
              height={styles.image2}
              image={imageInfo?.media?.image}
              imageAltText={"image text"}
            />
          </GradientOverlay>
        ) : (
          <GradientOverlay className={`${onlyMedia && styles.imgFull} ${styles.image}`} opacity={60}>
            <Video
              className={`${onlyMedia && styles.imgFull} ${styles.image2} ${styles.image}`}
              video={imageInfo?.media?.video}
            />
          </GradientOverlay>
        )}

        <div className={styles.textContainer}>
          <Typography className={styles.title} variant="h2">
            {imageInfo?.title}
          </Typography>
          <RichText className={styles.description} text={imageInfo?.description} />
        </div>
      </div>
    </div>
  );
};

export default IntroPopUp;
