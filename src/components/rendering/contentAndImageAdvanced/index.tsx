import {
  Button,
  GradientOverlay,
  Image,
  Typography,
  Video,
} from "@components/module";
import React, { useEffect, useState } from "react";
import styles from "./contentAndImageAdvanced.module.scss";

const ContentAndImageAdvanced = ({ ...content }) => {
  console.log("content", content);
  const media = {
    _meta: {
      schema: "https://seddiqi.amplience.com/module/video",
      name: "mp4hublot1",
      deliveryId: "658e5c84-3c65-4196-bedc-05f1684a9489",
    },
    video: {
      _meta: {
        schema:
          "http://bigcontent.io/cms/schema/v1/core#/definitions/video-link",
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

  const [showMedia, setShowMedia] = useState(true);
  const [animateImages, setAnimateImages] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setAnimateImages(true);
      setTimeout(() => setShowMedia(false), 1000); // Delay removing media after animation
    }, 10000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className={styles.container}>
      <div className={styles.media}>
        {showMedia && (
          <GradientOverlay opacity={60}>
            <Video
              className={`${styles.media} ${styles.fadeOut}`}
              video={media?.video}
              autoPlay={media?.autoPlay}
              showPlay={media?.showPlay}
            />
            <h1 className={styles.heading}>
              Ahmed Seddiqi: Legacy of Timeless Elegance
            </h1>
          </GradientOverlay>
        )}

        <div className={styles.imagesContainer}>
          <div
            className={`${styles.leftImageContainer} ${
              animateImages ? styles.slideInLeft : ""
            } ${styles.imageContainer}`}
          >
            <GradientOverlay className={`${styles.leftImage}`} opacity={60}>
              {content?.leftItem?.media?.image ? (
                <Image
                  className={`${styles.image} ${styles.leftImage}`}
                  height={styles.image1}
                  image={content?.leftItem?.media?.image}
                  imageAltText={"image text"}
                />
              ) : (
                <Video
                  video={content?.leftItem?.media?.video}
                  className={`${styles.image} ${styles.rightImage}`}
                />
              )}
            </GradientOverlay>

            <div className={styles.textContainer}>
              {content?.leftItem?.title && (
                <h2 className={styles.title}>{content?.leftItem?.title}</h2>
              )}
              {content?.leftItem?.description && (
                <div className={styles.desc}>
                  {content?.leftItem?.description}
                </div>
              )}

              <div className={styles.btnContainer}>
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
          <div
            className={`${styles.rightImageContainer} ${
              animateImages ? styles.slideInRight : ""
            } ${styles.imageContainer}`}
          >
            <GradientOverlay className={`${styles.rightImage}`} opacity={60}>
              {content?.rightItem?.media?.image ? (
                <Image
                  className={`${styles.image} ${styles.rightImage}`}
                  height={styles.image1}
                  image={content?.rightItem?.media?.image}
                  imageAltText={"image text"}
                />
              ) : (
                <Video
                  video={content?.rightItem?.media?.video}
                  className={`${styles.image} ${styles.rightImage}`}
                />
              )}
            </GradientOverlay>

            <div className={styles.textContainer}>
              {content?.rightItem?.title && (
                <h2 className={styles.title}>{content?.rightItem?.title}</h2>
              )}
              {content?.rightItem?.description && (
                <div className={styles.desc}>
                  {content?.rightItem?.description}
                </div>
              )}

              <div className={styles.btnContainer}>
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
        </div>
      </div>
    </div>
  );
};

export default ContentAndImageAdvanced;
