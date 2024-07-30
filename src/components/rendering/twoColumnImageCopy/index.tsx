import React from "react";
import Image from "@components/module/image";
import { Button, NavigationLink, Typography } from "@components/module";
import styles from "./twoColumnImageCopy.module.scss";
import RichText from "@components/module/richText";

const ImageComponent = ({ image, alt }) => (
  <Image
    className={styles.image}
    image={image}
    imageAltText={alt}
    // query={"h=700"}
  />
);

const TwoColumnImageCopy = ({contentLeft, contentRight}) => {

  if (!contentLeft?.image?.image || !contentRight?.image?.image) return null;

  const leftImage = contentLeft.image.image;
  const rightImage = contentRight.image.image;
  const cta = contentRight.cta;

  return (
    <div
      className={styles.container}
    >
      <div className={styles.columnOne}>
        <div className={styles.columnContent}>
          <Typography
            variant="h1"
            className={styles.headingPrimary}
          >
            {contentLeft?.heading}
          </Typography>
          <div className={styles.bar}>&nbsp;</div>
          <div className={styles.headingSecondary}>
            <RichText align="" className={styles.desc} text={contentLeft?.description} />
          </div>
        </div>
        <ImageComponent image={leftImage} alt="watch" />
      </div>
      <div className={styles.columnTwo}>
        <ImageComponent image={rightImage} alt="watch" />
        <div className={styles.columnContent}>
          <div className={styles.headingSecondary}>
            <RichText align="" className={styles.desc} text={contentRight?.description} />
          </div>
          <Button
            isLink={true}
            link={"/"}
            className={styles.discoverBtn}
            title={cta?.label}
            color="dark_green"
            type={cta?.type}
          />
        </div>
      </div>
    </div>
  );
};

export default TwoColumnImageCopy;
