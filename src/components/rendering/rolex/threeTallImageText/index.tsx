import { Image } from "@components/module";
import React, { useRef, useState, useCallback, useEffect } from "react";
import styles from "./threeTallImageText.module.scss";

import { Swiper, SwiperSlide } from "swiper/react";
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

import { Navigation, Pagination } from "swiper/modules";

const ThreeTallImageText = ({ ...content }) => {

  if (!content) return null;

  const components = content?.components;
  const [activeIndex, setActiveIndex] = useState(0);

  const handleSlideChange = (swiper) => {
    setActiveIndex(swiper.activeIndex);
  };
  
  return (
    <div className={styles.sliderContainer}>
      <h3 className={styles.title}>{content.mainTitle}</h3>

      <Swiper
        slidesPerView={'auto'}
        spaceBetween={40}
        navigation={true}
        pagination={{ clickable: true }}
        breakpoints={{
          768: {
            spaceBetween: 32,
            slidesPerView: 3,
          }
        }}
        modules={[Navigation, Pagination]}
        className={styles.sliderSwiper}
        onSlideChange={handleSlideChange}
      >
        {components.map((data, index) => (
        <SwiperSlide  key={index} className={`${[styles.sliderSlide]}`}>
          <a href={data.linkUrl} className={styles.sliderLink}>
          <Image
            imgWidth="100%"
            height={styles.image}
            className={styles.image}
            image={data?.media?.image}
            imageAltText={data?.media?.altText}
          />
            
            <span className={styles.sliderText}>{data.linkText}</span>
          </a>
        </SwiperSlide>
        ))}
      </Swiper>

    </div>
  )
};

export default ThreeTallImageText;
