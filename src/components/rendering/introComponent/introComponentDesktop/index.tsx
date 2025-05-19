import React, { useState } from "react";
import styles from "./introComponentDesktop.module.scss";
import { GradientOverlay, Image, Typography, Video } from "@components/module";
import IntroPopUp from "../introPopUp";
import SearchPopUp from "../searchPopUp";
import SearchInputField from "../searchInputField";
import RichText from "@components/module/richText";

const IntroComponentDesktop = ({ content }) => {
  const [imageInfo, setImageInfo] = useState(null);
  const [searchOpen, setSearchOpen] = useState(false);

  const handleMouseMove = (e) => {
    const container = document.getElementById("parallex");

    if (!container) return;

    const mouseX = e.clientX;
    const mouseY = e.clientY;

    const xDecimal = mouseX / window.innerWidth;
    const yDecimal = mouseY / window.innerHeight;

    const maxX = container.offsetWidth - window.innerWidth;
    const maxY = container.offsetHeight - window.innerHeight;

    const scaleFactor = 2;

    const panX = maxX * (xDecimal - 0.5) * (scaleFactor + 10);
    const panY = maxY * (yDecimal - 0.5) * scaleFactor;

    container.style.transform = `translate(${panX}px, ${panY}px)`;
  };

  if (imageInfo) {
    return <IntroPopUp imageInfo={imageInfo} setImageInfo={setImageInfo} />;
  }
  if (searchOpen) {
    return (
      <SearchPopUp
        content={content?.searchList}
        setSearchOpen={setSearchOpen}
      />
    );
  }

  const renderMediaComponent = (content, heightClass, imageClass) => {
    if (content?.media?.image) {
      return (
        <div className={`${heightClass}`}>
          <div
            onClick={() =>
              setImageInfo({
                ...content,
              })
            }
            className={styles.exploreContainer}
          >
            <div className={styles.exploreBtn}>Explore</div>
          </div>
          <GradientOverlay
            className={imageClass}
            opacity={content?.opacity?.opacity}
          >
            <Image
              className={styles.image}
              height={imageClass}
              image={content?.media?.image}
              imageAltText={"image text"}
            />
          </GradientOverlay>
        </div>
      );
    } else {
      return (
        <div className={`${heightClass}`}>
          <div
            onClick={() =>
              setImageInfo({
                ...content,
              })
            }
            className={styles.exploreContainer}
          >
            <div className={styles.exploreBtn}>Explore</div>
          </div>
          <GradientOverlay
            className={imageClass}
            opacity={content?.opacity?.opacity}
          >
            <Video
              className={`${imageClass} ${styles.image}`}
              video={content?.media?.video}
              autoPlay={content?.media?.autoPlay}
              showPlay={content?.media?.showPlay}
            />
          </GradientOverlay>
        </div>
      );
    }
  };

  return (
    <div className={styles.introContainer}>
      <div
        onMouseMove={(e) => handleMouseMove(e)}
        className={styles.titleSection}
      >
        {content?.mainTitle && (
          <Typography className={styles.heading} variant="h1">
            {content?.mainTitle}
          </Typography>
        )}
        {content?.description && (
          <RichText
            align="center"
            className={styles.description}
            text={content?.description}
          />
        )}
      </div>
      <SearchInputField
        // handleMouseMove={handleMouseMove}
        setSearchOpen={setSearchOpen}
      />
      <div
        id="parallex"
        onMouseMove={(e) => handleMouseMove(e)}
        className={styles.container}
      >
        {renderMediaComponent(
          content?.topLeftItem,
          styles.image1,
          styles.imageClass
        )}
        {renderMediaComponent(
          content?.topMiddleItem,
          styles.image2,
          styles.imageClass
        )}
        {renderMediaComponent(
          content?.topRightItem,
          styles.image3,
          styles.imageClass
        )}
        {renderMediaComponent(
          content?.bottomLeftItem,
          styles.image4,
          styles.imageClass
        )}
        {renderMediaComponent(
          content?.bottomMiddleItem,
          styles.image5,
          styles.imageClass
        )}
        {renderMediaComponent(
          content?.bottomRightItem,
          styles.image6,
          styles.imageClass
        )}
      </div>
    </div>
  );
};

export default IntroComponentDesktop;
