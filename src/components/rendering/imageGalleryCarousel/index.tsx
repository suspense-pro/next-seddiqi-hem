import React, { useCallback, useRef, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, EffectCoverflow } from "swiper/modules";
import "swiper/css";
import "swiper/css/effect-coverflow";
import styles from "./imageGalleryCarousel.module.scss";
import { GradientOverlay, Image } from "@components/module";
import { ArrowRight, PlusIcon } from "@assets/images/svg";
import { useDeviceWidth } from "@utils/useCustomHooks";
import ProductZoom from "@components/module/productZoom";

const ImageGalleryCarousel = ({ galleryItems, ...content }) => {
  if (!galleryItems) return null;
  const swiperRef = useRef(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const isMobile = !useDeviceWidth()[0];
  const [showZoom, setShowZoom] = useState(false);
  const [currentImage, setCurrentImage] = useState("");

  const onSlideChange = useCallback((swiper) => {
    setActiveIndex(swiper.realIndex);
  }, []);

  const handleSlide = useCallback((direction) => {
    if (swiperRef.current) {
      swiperRef.current[direction === "prev" ? "slidePrev" : "slideNext"]();
    }
  }, []);

  const hasMultipleItems = galleryItems?.length > 2;
  const slidesPerView = isMobile ? 1.4 : Math.min(galleryItems?.length, 3);

  return (
    <div className={styles.container}>
      {showZoom && <ProductZoom setShowZoom={setShowZoom} listitems={currentImage} />}
      {hasMultipleItems && !isMobile && (
        <>
          {activeIndex > 0 && (
            <div className={styles.leftBtn} onClick={() => handleSlide("prev")}>
              <ArrowRight fill="black" className={styles.arrowLeft} />
            </div>
          )}
          {activeIndex < galleryItems.length - 3 && (
            <div className={styles.rightBtn} onClick={() => handleSlide("next")}>
              <ArrowRight fill="black" className={styles.arrowRight} />
            </div>
          )}
        </>
      )}
      <Swiper
        modules={[Navigation, EffectCoverflow]}
        onBeforeInit={(swiper) => {
          swiperRef.current = swiper;
        }}
        slidesPerView={slidesPerView}
        onSlideChange={onSlideChange}
        className={styles.mySwiper}
        spaceBetween={2}
      >
        {galleryItems?.map((item, ind) => (
          <SwiperSlide key={item?.id || ind} className={styles.swiperSlide}>
            <div className={styles.sliderItem}>
              <GradientOverlay opacity={item?.opacity?.opacity}>
                <Image className={styles.image} image={item?.listItems[0]?.image} imageAltText="image" />
              </GradientOverlay>
              <div className={styles.sliderContent}>
                <div className={styles.contentInfo}>
                  <div className={styles.label}>{item?.mainTitle}</div>
                  <div className={styles.desc}>{item?.titleDescription}</div>
                </div>
                <div
                  onClick={() => {
                    setShowZoom(true);
                    setCurrentImage(item);
                  }}
                  className={styles.iconBg}
                >
                  <PlusIcon />
                </div>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default ImageGalleryCarousel;
