import React, { useRef, useState, useCallback, useEffect } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import 'swiper/css';

import styles from "./threeTallImageText.module.scss";

const ThreeTallImageText = () => {

  const sliderData = [
    {imageUrl: "/images/png/keep-exploring1.png", linkText: "ROLEX CERTIFIED PRE-OWNED AT Ahmed seddiqi", linkUrl: "/"},
    {imageUrl: "/images/png/keep-exploring2.png", linkText: "our selection", linkUrl: "/"},
    {imageUrl: "/images/png/keep-exploring3.png", linkText: "The rolex certification", linkUrl: "/"},
  ];
  
  return (
    <div className={styles.sliderContainer}>
      <h3 className={styles.title}>Keep Exploring</h3>

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
        {sliderData.map((data, index) => (
        <SwiperSlide  key={index} className={`${[styles.sliderSlide]}`}>
          <a href={data.linkUrl} className={styles.sliderLink}>
            <img src={data.imageUrl} className={styles.sliderImage} />
            <span className={styles.sliderText}>{data.linkText}</span>
          </a>
        </SwiperSlide>
        ))}
      </Swiper>

    </div>
  )
};

export default ThreeTallImageText;
