import { Image } from "@components/module";
import React, { useRef, useState, useCallback, useEffect } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import 'swiper/css';

import styles from "./threeTallImageText.module.scss";

const ThreeTallImageText = ({ ...content }) => {

  if (!content) return null;

  const components = content?.components;
  
  return (
    <div className={styles.sliderContainer}>
      <h3 className={styles.title}>{content.mainTitle}</h3>

      <Swiper
        slidesPerView={'auto'}
        spaceBetween={40}
        breakpoints={{
          768: {
            spaceBetween: 32,
            slidesPerView: 3,
          }
        }}
        className={styles.sliderSwiper}
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
