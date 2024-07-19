import React from "react";
import Image from "next/image";
import { NavigationLink, Typography } from "@components/module";
import styles from "./twoColumnImageCopy.module.scss";

const CONTENT = {
  HEADING_PRIMARY: "OYSTER PERPETUAL COLLECTION",
  HEADING_SECONDARY:
    "The Oyster Perpetual collection embodies Rolex prestige and know-how. It consists of 11 ranges, split into two categories: Classic watches such as the Datejust.",
  HEADING_SECONDARY_02:
    "The Day-Date and the Sky-Dweller, and Professional watches, including the Explorer, the Submariner and the GMT-Master II, designed for specific activities.",
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

const TwoColumnImageCopy = ({ item }) => {
  if (!item) return null;

  const { tempId, rows = [], cols = [], component = {} } = item;
  const gridRowSpan = rows.pop();
  const gridColSpan = cols.pop();

  const { contentLeft, contentRight } = component;

  if (!contentLeft?.image?.image || !contentRight?.image?.image) return null;

  const leftImage = contentLeft.image.image;
  const rightImage = contentRight.image.image;

  const LEFT_IMAGE_URL = `https://${leftImage.defaultHost}/i/${leftImage.endpoint}/${leftImage.name}`;
  const RIGHT_IMAGE_URL = `https://${rightImage.defaultHost}/i/${rightImage.endpoint}/${rightImage.name}`;

  const cta = contentRight.cta;

  return (
    <div
      style={{
        order: tempId,
        gridRowEnd: `span ${gridRowSpan}`,
        gridColumnEnd: `span ${gridColSpan}`,
      }}
      className={styles.container}
    >
      <div className={styles.columnOne}>
        <div className={styles.columnContent}>
          <Typography
            align="center"
            variant="h1"
            className={styles.headingPrimary}
          >
            {contentLeft?.heading}
          </Typography>
          <div className={styles.bar}>&nbsp;</div>
          <Typography
            align="center"
            variant="p"
            className={styles.headingSecondary}
          >
            {contentLeft?.description}
          </Typography>
        </div>
        <ImageComponent src={LEFT_IMAGE_URL} alt="watch" />
      </div>
      <div className={styles.columnTwo}>
        <ImageComponent src={RIGHT_IMAGE_URL} alt="watch" />
        <div className={styles.columnContent}>
          <Typography
            align="center"
            variant="p"
            className={styles.headingSecondary}
          >
            {contentLeft?.description}
          </Typography>
          <NavigationLink title={cta?.label} className={styles.discoverBtn} />
        </div>
      </div>
    </div>
  );
};

export default TwoColumnImageCopy;
