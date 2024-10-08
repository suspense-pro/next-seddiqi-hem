import React from "react";
import styles from "./twoColumnFullScreenImage.module.scss";
import { ContentHeader, GradientOverlay, Image } from "@components/module";

const TwoColumnFullScreenImage = ({ ...content }) => {
  let leftImage = content?.imageLeft?.image?.image;
  let rightImage = content?.imageRight?.image?.image;
  const isSingleColumn = !leftImage || !rightImage;

  return (
    <div className={styles.container}>
      <ContentHeader
        barColor={styles.barColor}
        subTitleColor={styles.subTitleColor}
        titleColor={styles.titleColor}
        hideUnderline={content?.hideUnderline}
        mainTitle={content?.mainTItle}
        richText={content?.description}
      />
      <div style={{ gridTemplateColumns: isSingleColumn && "1fr" }} className={styles.containerImgs}>
        <GradientOverlay opacity={content?.imageLeft?.opacity?.opacity}>
          <Image
            className={`${isSingleColumn && styles.imgHeight} ${styles.image}`}
            image={leftImage}
            imageAltText={leftImage?.altText}
          />
        </GradientOverlay>
        <GradientOverlay opacity={content?.imageRight?.opacity?.opacity}>
          <Image
            className={`${isSingleColumn && styles.imgHeight} ${styles.image}`}
            image={rightImage}
            imageAltText={rightImage?.altText}
          />
        </GradientOverlay>
      </div>
    </div>
  );
};

export default TwoColumnFullScreenImage;
