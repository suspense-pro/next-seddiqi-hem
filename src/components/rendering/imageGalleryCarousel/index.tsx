import React, { useCallback, useRef, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, EffectCoverflow } from "swiper/modules";
import "swiper/css";
import "swiper/css/effect-coverflow";
import styles from "./imageGalleryCarousel.module.scss";
import { GradientOverlay, Image, ProductImageFullScreen, Video } from "@components/module";
import { ArrowRight, PlusIcon } from "@assets/images/svg";
import { useDeviceWidth } from "@utils/useCustomHooks";

const ImageGalleryCarousel = ({ galleryItems, ...content }) => {
  console.log("galleryItems", galleryItems);
  if (!galleryItems) return null;
  const swiperRef = useRef(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const isMobile = !useDeviceWidth()[0];
  const [showZoom, setShowZoom] = useState(false);
  const [currentImage, setCurrentImage] = useState(null);

  const onSlideChange = useCallback((swiper) => {
    setActiveIndex(swiper.realIndex);
  }, []);

  const handleSlide = useCallback((direction) => {
    if (swiperRef.current) {
      swiperRef.current[direction === "prev" ? "slidePrev" : "slideNext"]();
    }
  }, []);

  const slidesPerView = isMobile ? 1.2 : Math.min(galleryItems?.length, 3);

  const showLeftArrow = activeIndex > 0;
  const showRightArrow = isMobile
    ? activeIndex < galleryItems.length - slidesPerView
    : activeIndex < galleryItems.length - 3;

  const currentImg = currentImage?.listItems[0]?.image;
  let productItem;
  if (currentImg) {
    productItem = {
      link: `https://${currentImg?.defaultHost}/i/${currentImg?.endpoint}/${encodeURIComponent(
        currentImg?.name
      )}`,
      alt: "product",
    };
  }

  return (
    <div className={styles.container}>
      {showZoom && <ProductImageFullScreen setShowZoom={setShowZoom} listitems={[productItem]} thumbnails={false} />}
      {(showLeftArrow || showRightArrow) && (
        <>
          {showLeftArrow && (
            <div className={styles.leftBtn} onClick={() => handleSlide("prev")}>
              <ArrowRight fill="black" className={styles.arrowLeft} />
            </div>
          )}
          {showRightArrow && (
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
                {item?.listItems[0]?.image && (
                  <Image className={styles.image} image={item?.listItems[0]?.image} imageAltText="image" />
                )}
                {item?.listItems[0]?.video && (
                  <Video
                    className={styles.image}
                    video={item?.listItems[0]?.video}
                    autoPlay={item?.listItems[0]?.autoPlay}
                    showPlay={item?.listItems[0]?.showPlay}
                  />
                )}
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
