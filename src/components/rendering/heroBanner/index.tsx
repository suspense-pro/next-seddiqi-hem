import React, { useState } from "react";
import Image from "../../module/image";
import styles from "./heroBanner.module.scss";
import Button from "../../module/button";
import Carousel from "@components/module/carousel";
import CarouselBtns from "@components/module/carouselBtns";
import Typography from "../../module/typography";
import RichText from "../../module/richText";

interface HeroBannerProps {
  banners: any[];
  bannerType: string;
}

const HeroBanner: React.FC<HeroBannerProps> = ({ banners, bannerType }) => {
  const [swiper, setSwiper] = useState(null);
  const [activeIndex, setActiveIndex] = useState(0);

  if (!banners || banners.length === 0) return null;

  const containerClass =
    bannerType === "full_banner" ? styles.fullWidth : styles.standardWidth;

  const slides = banners
    ?.map((banner) => {
      if (banner.media.image) {
        return {
          type: "image",
          url: `https://${banner.media.image.defaultHost}/i/${banner.media.image.endpoint}/${banner.media.image.name}`,
          altText: banner.media.altText,
        };
      } else if (banner.media.video) {
        return {
          type: "video",
          video: banner.media.video,
          autoPlay: banner.media.autoPlay,
          showPlay: banner.media.showPlay,
        };
      }
      return null;
    })
    .filter(Boolean);

  const activeBanner = banners[activeIndex];
  const alignmentClass = `${activeBanner?.horizontalAlignment || "center"}-${
    activeBanner?.verticalAlignment || "center"
  }`;
  
  const contentAlign =
    activeBanner?.horizontalAlignment === "right"
      ? "left"
      : activeBanner?.horizontalAlignment || "center";

  return (
    <>
      <div className={`${styles.heroBanner} ${containerClass}`}>
      <div className={styles.heroBannerContainer}>
        <Carousel
          slides={slides}
          setSwiper={setSwiper}
          setActiveIndex={setActiveIndex}
          setEffect={'fade'}
          setSpeed={2000}
          isHeroBanner={"yes"}
        />
      </div>

        {activeBanner && (
          <div className={styles.bannerItem}>
            {activeBanner.overlay && <div className={styles.overlay} />}
            <div
              className={`${styles.textContainer} ${styles[alignmentClass]} ${
                activeBanner.verticalAlignment === "bottom"
                  ? styles.bottomPadding
                  : ""
              }`}
            >
              {activeBanner.logoIcon && activeBanner.logoIcon.image && (
                <div className={styles.logo}>
                  <Image
                    className={styles.logoIcon}
                    image={activeBanner.logoIcon.image.image}
                    imageAltText={activeBanner.logoIcon.altText}
                  />
                </div>
              )}
              {activeBanner.mainTitle && (
                <Typography
                  align={contentAlign}
                  variant="h1"
                  className={styles.title}
                >
                  {activeBanner.mainTitle}
                </Typography>
              )}
              {activeBanner.hideUnderline && (
                <div className={styles.underline}></div>
              )}
              {activeBanner.richText && (
                <RichText
                  align={contentAlign}
                  className={styles.description}
                  text={activeBanner.richText}
                />
              )}
              {activeBanner.cta && activeBanner.cta.length > 0 && (
                <div className={styles.ctaButton}>
                  <Button
                    title={activeBanner.cta[0]?.label}
                    type={activeBanner.cta[0]?.type}
                  />
                </div>
              )}
            </div>
          </div>
        )}
        {slides && slides.length > 1 && (
          <div className={styles.carouselBtnsContainer}>
            <CarouselBtns
              swiper={swiper}
              activeIndex={activeIndex}
              slides={slides}
            />
          </div>
        )}
      </div>
    </>
  );
};

export default HeroBanner;
