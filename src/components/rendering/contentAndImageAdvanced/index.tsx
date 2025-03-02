import { Button, GradientOverlay, Image, Typography, Video } from "@components/module";
import React from "react";
import styles from "./contentAndImageAdvanced.module.scss";

const ContentAndImageAdvanced = () => {
  const media = {
    _meta: {
      schema: "https://seddiqi.amplience.com/module/video",
      name: "mp4hublot1",
      deliveryId: "658e5c84-3c65-4196-bedc-05f1684a9489",
    },
    video: {
      _meta: {
        schema: "http://bigcontent.io/cms/schema/v1/core#/definitions/video-link",
      },
      id: "473d8c1e-d88b-4871-870e-4bb10c5c74d8",
      name: "mp4 video",
      endpoint: "seddiqi",
      defaultHost: "cdn.media.amplience.net",
      mimeType: "video/mp4",
    },
    showPlay: true,
    autoPlay: true,
  };

  const image = {
    _meta: {
      schema: "http://bigcontent.io/cms/schema/v1/core#/definitions/image-link",
    },
    id: "7942dffb-3623-47dd-8b4d-dba5e376a026",
    name: "column_image_01",
    endpoint: "likedigital",
    defaultHost: "cdn.media.amplience.net",
    mimeType: "image/png",
  };

  return (
    <div className={styles.container}>
      <div className={styles.media}>
        <GradientOverlay opacity={60}>
          <Video className={styles.media} video={media?.video} autoPlay={media?.autoPlay} showPlay={media?.showPlay} />
          <h1 className={styles.heading}>Ahmed Seddiqi: Legacy of Timeless Elegance</h1>
        </GradientOverlay>
        <div className={styles.imagesContainer}>
          <div className={`${styles.leftImageContainer} ${styles.imageContainer}`}>
            <GradientOverlay className={`${styles.leftImage}`} opacity={60}>
              <Image
                className={`${styles.image} ${styles.leftImage}`}
                height={styles.image1}
                image={image}
                imageAltText={"image text"}
              />
            </GradientOverlay>

            <div className={styles.textContainer}>
              <h2 className={styles.title}>Watches</h2>
              <div className={styles.desc}>
                Unveil the world of horology to and discover a curated and exclusive selection of timepieces.{" "}
              </div>
              <div>
                <Button
                  clickHandler={() => console.log("")}
                  className={styles.discoverBtn}
                  title="Discover"
                  isLink={false}
                  type="transparant"
                  color="white"
                />
              </div>
            </div>
          </div>
          <div className={`${styles.rightImageContainer} ${styles.imageContainer}`}>
            <Image
              className={`${styles.image} ${styles.rightImage}`}
              height={styles.image1}
              image={image}
              imageAltText={"image text"}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContentAndImageAdvanced;
