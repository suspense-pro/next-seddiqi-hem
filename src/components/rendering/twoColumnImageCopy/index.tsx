import React from "react";
import Image from "@components/module/image";
import { Button, NavigationLink, ContentHeader, Typography, Video } from "@components/module";
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

const TwoColumnImageCopy = ({ contentLeft, contentRight, ...content }) => {
  if (!contentLeft?.image?.image || !contentRight?.image?.image) return null;

  const leftImage = contentLeft.image.image;
  const rightImage = contentRight.image.image;
  const cta = contentRight.cta;

  return (
    <div className={styles.container}>
      <div className={styles.columnOne}>
        <ContentHeader
          barColor={styles.barColor}
          subTitleColor={styles.subTitleColor}
          titleColor={styles.titleColor}
          hideUnderline={contentLeft?.hideUnderline}
          mainTitle={contentLeft?.heading}
          richText={contentLeft?.description}
        />
        {contentLeft?.media?.image ? (
          <ImageComponent image={contentLeft?.media?.image} alt="watch" />
        ) : (
          <Video
            className={styles.image}
            video={contentLeft?.media?.video}
            autoPlay={contentLeft?.media?.autoPlay}
            showPlay={contentLeft?.media?.showPlay}
          />
        )}
      </div>
      <div className={styles.columnTwo}>
      {contentRight?.media?.image ? (
          <ImageComponent image={contentRight?.media?.image} alt="watch" />
        ) : (
          <Video
            className={styles.image}
            video={contentRight?.media?.video}
            autoPlay={contentRight?.media?.autoPlay}
            showPlay={contentRight?.media?.showPlay}
          />
        )}
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
