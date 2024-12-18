import React, { useState } from "react";
import Image from "../../module/image";
import styles from "./heroBanner.module.scss";
import Button from "../../module/button";
import Carousel from "@components/module/carousel";
import CarouselBtns from "@components/module/carouselBtns";
import Typography from "../../module/typography";
import RichText from "../../module/richText";
import { GradientOverlay } from "@components/module";
import Link from "next/link";

interface HeroBannerProps {
  banners: any[];
  bannerType: string;
}

const HeroBanner: React.FC<HeroBannerProps> = ({ banners, bannerType }) => {
  const [swiper, setSwiper] = useState(null);
  const [activeIndex, setActiveIndex] = useState(0);

  if (!banners || banners.length === 0) return null;

  const bannerStyles = {
    full_banner: styles.fullWidth,
    content_banner: styles.mediumWidth,
    small_banner: styles.smallWidth,
  };

  const containerClass = bannerStyles[bannerType] || styles.fullWidth;

  const slides = banners
    ?.map((banner) => {
      if (banner?.media?.image) {
        return {
          type: "image",
          url: `https://${banner.media.image.defaultHost}/i/${banner.media.image.endpoint}/${banner.media.image.name}`,
          altText: banner.media.altText,
        };
      } else if (banner?.media?.video) {
        return {
          type: "video",
          video: banner?.media?.video,
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
    activeBanner?.horizontalAlignment === "right" ? "left" : activeBanner?.horizontalAlignment || "center";

  // console.log("HeroBanner -> activeBanner", activeBanner);
  return (
    <>
      <div className={`${styles.heroBanner} ${containerClass}`}>
        {activeBanner && (
          <div className={styles.bannerItem}>
            <div
              className={`${styles.textContainer} ${styles[alignmentClass]} ${
                activeBanner.verticalAlignment === "bottom" ? styles.bottomPadding : ""
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
                <Typography align={contentAlign} variant="h1" className={styles.title}>
                  {activeBanner.mainTitle}
                </Typography>
              )}
              {!activeBanner.hideUnderline && (
                <div className={styles.underlineConainer}>
                  <div className={styles.underline}></div>
                </div>
              )}
              {activeBanner.richText && (
                <RichText align={contentAlign} className={styles.description} text={activeBanner.richText} />
              )}

              {activeBanner.cta &&
                activeBanner.cta?.length > 0 &&
                activeBanner.cta.map((_cta: any, index) => (
                  _cta.label && _cta.label.length > 0 && 
                    <div className={styles.ctaButton} key={index}>
                      <Link href={`${_cta?.url}`}>
                      <Button
                        isLink={true}
                        link={_cta?.url}
                        title={_cta?.label}
                        type={`${_cta?.type?.toLowerCase()} ${_cta.color?.toLowerCase()}`}
                        new_tab={_cta?.isNewTab}
                        />
                      </Link>
                  </div>
                  
              
                ))}
            </div>
          </div>
        )}
        <div className={styles.heroBannerContainer}>
          {/* <GradientOverlay
            opacity={
              !activeBanner?.opacity?.hideOverlay
                ? activeBanner?.opacity?.opacity
                : null
            }
            className={styles.containerImg}
          > */}
          <Carousel
            slides={slides}
            setSwiper={setSwiper}
            setActiveIndex={setActiveIndex}
            setTransition={"fade"}
            setSpeed={2000}
            isAnimated={"no"}
            opacity={!activeBanner?.opacity?.hideOverlay ? activeBanner?.opacity?.opacity : null}
            className={bannerStyles[bannerType] || styles.fullWidth}
          />
          {/* </GradientOverlay> */}
        </div>

        {slides && slides.length > 1 && (
          <div className={styles.carouselBtnsContainer}>
            <CarouselBtns swiper={swiper} activeIndex={activeIndex} slides={slides} />
          </div>
        )}
      </div>
    </>
  );
};

export default HeroBanner;
