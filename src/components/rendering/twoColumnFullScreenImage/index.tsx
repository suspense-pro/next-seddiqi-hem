import React from "react";
import styles from "./twoColumnFullScreenImage.module.scss";
import { Image, SectionHeader } from "@components/module";

const TwoColumnFullScreenImage = ({ ...content }) => {
  let leftImage = content?.imageLeft?.image?.image;
  let rightImage = content?.imageRight?.image?.image;
  const isSingleColumn = !leftImage || !rightImage;

  return (
    <div className={styles.container}>
      <SectionHeader
        barColor={styles.barColor}
        subTitleColor={styles.subTitleColor}
        titleColor={styles.titleColor}
        hideUnderline={content?.hideUnderline}
        mainTitle={content?.mainTItle}
        richText={content?.description}
      />
      <div style={{ gridTemplateColumns: isSingleColumn && "1fr" }} className={styles.containerImgs}>
        <Image
          className={`${isSingleColumn && styles.imgHeight} ${styles.image}`}
          image={leftImage}
          imageAltText={leftImage?.altText}
        />
        <Image
          className={`${isSingleColumn && styles.imgHeight} ${styles.image}`}
          image={rightImage}
          imageAltText={rightImage?.altText}
        />
      </div>
    </div>
  );
};

export default TwoColumnFullScreenImage;
