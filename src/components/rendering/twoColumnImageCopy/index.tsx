import React from "react";
import Image from "@components/module/image";
import { NavigationLink, Typography } from "@components/module";
import styles from "./twoColumnImageCopy.module.scss";
import RichText from "@components/module/richText";

const ImageComponent = ({ image, alt }) => (
  <Image
    className={styles.image}
    image={image}
    imageAltText={alt}
    query={"h=700"}
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
          <div className={styles.headingSecondary}>
            <RichText align={"center"} text={contentLeft?.description} />
          </div>
        </div>
        <ImageComponent image={leftImage} alt="watch" />
      </div>
      <div className={styles.columnTwo}>
        <ImageComponent image={rightImage} alt="watch" />
        <div className={styles.columnContent}>
          <div className={styles.headingSecondary}>
            <RichText align={"center"} text={contentRight?.description} />
          </div>
          <NavigationLink title={cta?.label} className={styles.discoverBtn} />
        </div>
      </div>
    </div>
  );
};

export default TwoColumnImageCopy;
