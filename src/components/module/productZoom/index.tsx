import styles from "./productZoom.module.scss";
import Image from "../image";
import React, { useCallback, useRef, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, EffectCoverflow } from "swiper/modules";
import "swiper/css";
import "swiper/css/effect-coverflow";
import "swiper/css/pagination";
import { useDeviceWidth } from "@utils/useCustomHooks";
import { CloseIconV2 } from "@assets/images/svg";

const ProductZoom = ({ setShowZoom, listitems }) => {
  const swiperRef = useRef(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [swiper, setSwiper] = useState(null);

  const isMobile = !useDeviceWidth()[0];

  const onSlideChange = useCallback((swiper) => {
    setActiveIndex(swiper.realIndex);
  }, []);

  const handlePaginationClick = useCallback(
    (index) => {
      if (swiper) swiper.slideToLoop(index);
    },
    [swiper]
  );

  const renderSlides = () =>
    listitems?.listItems?.map((item) => (
      <SwiperSlide
        className={styles.swiperSlide}
        key={item.id || item.image} 
      >
        <Image
          className={styles.image}
          image={item?.image}
          imageAltText="image"
        />
      </SwiperSlide>
    ));

  const renderThumbnails = () =>
    listitems?.listItems?.map((item, index) => (
      <div
        key={item.id || item.image}
        className={`${activeIndex === index ? styles.activeImage : ""} ${styles.thumbnail}`}
        onClick={() => handlePaginationClick(index)}
      >
        <Image
          className={styles.image}
          image={item?.image}
          imageAltText="image"
        />
      </div>
    ));

  return (
    <div className={styles.container}>
      <div onClick={() => setShowZoom(false)} className={styles.closeIcon}>
        <CloseIconV2 />
      </div>
      <Swiper
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

      <div className={styles.thumbnails}>
        {renderThumbnails()}
      </div>
    </div>
  );
};

export default ProductZoom;
