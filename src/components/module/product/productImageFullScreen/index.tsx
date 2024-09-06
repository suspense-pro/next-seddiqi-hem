import styles from "./productImageFullScreen.module.scss";
import React, { useCallback, useRef, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, EffectCoverflow } from "swiper/modules";
import "swiper/css";
import "swiper/css/effect-coverflow";
import "swiper/css/pagination";
import { ArrowRight, CloseIconV2 } from "@assets/images/svg";
import Image from "next/image";

const ProductImageFullScreen = ({ setShowZoom, listitems, thumbnails = true }) => {
  const swiperRef = useRef(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [swiper, setSwiper] = useState(null);

  const onSlideChange = useCallback((swiper) => {
    setActiveIndex(swiper.realIndex);
  }, []);

  const handlePaginationClick = useCallback(
    (index) => {
      if (swiper) swiper.slideToLoop(index);
    },
    [swiper]
  );

  const VideoSlide = ({ item }) => {
    return (
      <div className={styles.imgContainer}>
        <video
          loop
          muted
          autoPlay
          className={styles.videoPlayer}
          style={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
          }}
        >
          <source src={item?.videoLink1} type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      </div>
    );
  };

  const renderSlides = () =>
    listitems?.map((item, index) => (
      <SwiperSlide style={{ height: !thumbnails ? "100%" : "" }} className={styles.swiperSlide} key={index}>
        {item?.videoLink1 ? (
          <VideoSlide item={item} />
        ) : (
          <Image fill className={styles.image} src={item?.disBaseLink} alt={item?.alt} />
        )}
        <Image fill className={styles.image} src={item?.disBaseLink} alt={item?.alt} />
      </SwiperSlide>
    ));

  const renderThumbnails = () =>
    listitems?.map((item, index) => (
      <div
        key={index}
        className={`${activeIndex === index ? styles.activeImage : ""} ${styles.thumbnail}`}
        onClick={() => handlePaginationClick(index)}
      >
        {item?.videoLink1 ? (
          <VideoSlide item={item} />
        ) : (
          <Image fill className={styles.image} src={item?.disBaseLink} alt={item?.alt} />
        )}
      </div>
    ));
  const handleSlide = useCallback((direction) => {
    if (swiperRef.current) {
      swiperRef.current[direction === "prev" ? "slidePrev" : "slideNext"]();
    }
  }, []);

  return (
    <div className={styles.container}>
      {thumbnails && (
        <div className={styles.sliderBtns}>
          {activeIndex > 0 && (
            <div className={styles.leftBtn} onClick={() => handleSlide("prev")}>
              <ArrowRight fill="white" className={styles.arrowLeft} />
            </div>
          )}
          {activeIndex < listitems.length - 1 && (
            <div className={styles.rightBtn} onClick={() => handleSlide("next")}>
              <ArrowRight fill="white" className={styles.arrowRight} />
            </div>
          )}
        </div>
      )}

      <div onClick={() => setShowZoom(false)} className={styles.closeIcon}>
        <CloseIconV2 />
      </div>
      <Swiper
        style={{ height: !thumbnails ? "100%" : "" }}
        onSwiper={setSwiper}
        modules={[Navigation, EffectCoverflow]}
        onBeforeInit={(swiper) => {
          swiperRef.current = swiper;
        }}
        slidesPerView={1}
        onSlideChange={onSlideChange}
        className={styles.mySwiper}
        spaceBetween={0}
      >
        {renderSlides()}
      </Swiper>

      {thumbnails && (
        <>
          <div className={styles.thumbnails}>{renderThumbnails()}</div>
          <div className={styles.slideBtns}>
            {listitems?.map((key, ind) => (
              <div
                onClick={() => handlePaginationClick(ind)}
                key={ind}
                className={`${styles.slideItem} ${ind === activeIndex ? styles.slideActive : ""}`}
              >
                &nbsp;
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default ProductImageFullScreen;
