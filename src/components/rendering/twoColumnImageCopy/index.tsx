import React from "react";
import Image from "next/image";
import { Typography } from "@components/module";
import styles from "./twoColumnImageCopy.module.scss";

const CONTENT = {
  HEADING_PRIMARY: "OYSTER PERPETUAL COLLECTION",
  HEADING_SECONDARY: "The Oyster Perpetual collection embodies Rolex prestige and know-how. It consists of 11 ranges, split into two categories: Classic watches such as the Datejust.",
  HEADING_SECONDARY_02: "The Day-Date and the Sky-Dweller, and Professional watches, including the Explorer, the Submariner and the GMT-Master II, designed for specific activities.",
  BTN_TEXT: "Discover Now",
  IMAGE_01: "/images/png/column_image_01.png",
  IMAGE_02: "/images/png/column_image_02.png",
};

const ImageComponent = ({ src, alt }) => (
  <Image
    className={styles.image}
    alt={alt}
    width={502}
    height={700}
    objectFit="contain"
    src={src}
  />
);

const TwoColumnImageCopy = () => {
  return (
    <div className={styles.container}>
      <div className={styles.columnOne}>
        <div className={styles.columnContent}>
          <Typography
            align="center"
            variant="h1"
            className={styles.headingPrimary}
          >
            {CONTENT.HEADING_PRIMARY}
          </Typography>
          <div className={styles.bar}>&nbsp;</div>
          <Typography
            align="center"
            variant="p"
            className={styles.headingSecondary}
          >
            {CONTENT.HEADING_SECONDARY}
          </Typography>
        </div>
        <ImageComponent src={CONTENT.IMAGE_01} alt="watch" />
      </div>
      <div className={styles.columnTwo}>
        <ImageComponent src={CONTENT.IMAGE_02} alt="watch" />
        <div className={styles.columnContent}>
          <Typography
            align="center"
            variant="p"
            className={styles.headingSecondary}
          >
            {CONTENT.HEADING_SECONDARY_02}
          </Typography>
          <div className={styles.discoverBtn}>{CONTENT.BTN_TEXT}</div>
        </div>
      </div>
    </div>
  );
};

export default TwoColumnImageCopy;