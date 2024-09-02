import React, { useRef, useState, useCallback } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, EffectCoverflow } from "swiper/modules";
import { ArrowRight } from "@assets/images/svg";
import styles from "./threeItemCarousel.module.scss";
import "swiper/css";
import "swiper/css/effect-coverflow";
import "swiper/css/pagination";
import { useDeviceWidth } from "@utils/useCustomHooks";

import Image from "@components/module/image";
import Typography from "@components/module/typography";
import Button from "@components/module/button";
import Video from "@components/module/video";
import { ContentHeader, GradientOverlay } from "@components/module";

const ThreeItemCarousel = ({ mainTitle, hideUnderline, richText, listItems = [] }) => {
  if (!listItems) {
    return null;
  }

  const swiperRef = useRef(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const isMobile = !useDeviceWidth()[0];

  const handleSlide = useCallback((direction) => {
    if (swiperRef.current) {
      swiperRef.current[direction === "prev" ? "slidePrev" : "slideNext"]();
    }
  }, []);

  const onSlideChange = useCallback((swiper) => {
    setActiveIndex(swiper.realIndex);
  }, []);

  const imageClassNames = listItems.length < 3 ? `${styles.twoColumnImg} ${styles.image}` : styles.image;
  const videoContainerClassNames = listItems.length < 3 ? `${styles.twoColumnVid}` : styles.videoContainer;
  const videoClassNames = isMobile ? styles.mobileVid : styles.video;

  const renderSlide = (item, index) => {
    const isVideo = item?.media?.video;
    const isImage = item?.media?.image;
    const opacity = item?.opacity?.opacity;

    return (
      <SwiperSlide className={styles.swiperSlide} key={index} style={isMobile ? { width: "90%" } : {}}>
        <GradientOverlay opacity={opacity}>
          <div className={styles.sliderItem}>
            {isImage && (
              <Image className={imageClassNames} image={item.media?.image} imageAltText={item.media?.altText} />
            )}
            {isVideo && (
              <div className={videoContainerClassNames}>
                <Video
                  className={videoClassNames}
                  video={item.media.video}
                  autoPlay={item?.media?.autoPlay}
                  showPlay={item?.media?.showPlay}
                />
              </div>
            )}
            <div className={styles.categoryContent}>
              <Typography className={styles.categoryTitle} variant="h4">
                {item.title}
              </Typography>
              <Button
                isLink={true}
                link={item.cta.url}
                className={styles.discoverBtn}
                title={item.cta.label}
                color={item.cta.color}
                type={item.cta.type}
              />
            </div>
          </div>
        </GradientOverlay>
      </SwiperSlide>
    );
  };

  const hasMultipleItems = listItems.length > 3;

  return (
    <div className={styles.container}>
      {/* CONTAINER HEADER */}
      <ContentHeader
        barColor={styles.barColor}
        subTitleColor={styles.subTitleColor}
        titleColor={styles.titleColor}
        hideUnderline={hideUnderline}
        mainTitle={mainTitle}
        richText={richText}
      />
      <div className={styles.containerSlider}>
        {/* SLIDER BTNS */}
        {hasMultipleItems && !isMobile && (
          <>
            {activeIndex > 0 && (
              <div className={styles.leftBtn} onClick={() => handleSlide("prev")}>
                <ArrowRight fill="white" className={styles.arrowLeft} />
              </div>
            )}
            {activeIndex < listItems.length - 3 && (
              <div className={styles.rightBtn} onClick={() => handleSlide("next")}>
                <ArrowRight fill="white" className={styles.arrowRight} />
              </div>
            )}
          </>
        )}
        {/* SLIDER CONTAINER */}
        <Swiper
          modules={[Navigation, EffectCoverflow]}
          onBeforeInit={(swiper) => {
            swiperRef.current = swiper;
          }}
          slidesPerView={isMobile ? "auto" : listItems?.length < 3 ? listItems?.length : 3}
          onSlideChange={onSlideChange}
          className={styles.mySwiper}
        >
          {listItems?.map((item, ind) => renderSlide(item, ind))}
        </Swiper>
      </div>
    </div>
  );
};

export default ThreeItemCarousel;
