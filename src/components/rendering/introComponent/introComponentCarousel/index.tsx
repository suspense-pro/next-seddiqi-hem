import React, { useRef } from "react";
import styles from "./introComponentCarousel.module.scss";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";

import "swiper/css";
import "swiper/css/effect-coverflow";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { GradientOverlay, Image } from "@components/module";

const IntroComponentCarousel = () => {
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

  const swiperRef = useRef(null);

  return (
    <div className={styles.container}>
      <div className={styles.titleSection}>
        <h3>Ahmed Seddiqi Heritage</h3>
        <p>A pioneer among leading retailers in the region</p>
      </div>

      <div className={styles.toggleBtn}>Grid View</div>
      <div className={styles.cards}>
        <Swiper
          modules={[Navigation]}
          onBeforeInit={(swiper) => {
            swiperRef.current = swiper;
          }}
          slidesPerView={"auto"}
          //onSlideChange={onSlideChange}
          className={styles.mySwiper}
          spaceBetween={24}
          freeMode={true}
          navigation={true}
        >
          <SwiperSlide className={styles.swiperSlide} key={1}>
            <div className={styles.imageCard}>
              <Image className={styles.image} height={styles.image1} image={image} imageAltText={"image text"} />
            </div>
          </SwiperSlide>
          <SwiperSlide className={styles.swiperSlide} key={1}>
            <div className={styles.imageCard}>
              <Image className={styles.image} height={styles.image1} image={image} imageAltText={"image text"} />
            </div>
          </SwiperSlide>
          <SwiperSlide className={styles.swiperSlide} key={1}>
            <div className={styles.imageCard}>
              <Image className={styles.image} height={styles.image1} image={image} imageAltText={"image text"} />
            </div>
          </SwiperSlide>
          <SwiperSlide className={styles.swiperSlide} key={1}>
            <div className={styles.imageCard}>
              <Image className={styles.image} height={styles.image1} image={image} imageAltText={"image text"} />
            </div>
          </SwiperSlide>
          <SwiperSlide className={styles.swiperSlide} key={1}>
            <div className={styles.imageCard}>
              <Image className={styles.image} height={styles.image1} image={image} imageAltText={"image text"} />
            </div>
          </SwiperSlide>
        </Swiper>
      </div>
    </div>
  );
};

export default IntroComponentCarousel;
