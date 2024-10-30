import React, { useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import 'swiper/css';
import 'swiper/css/navigation';

import styles from "./fourItemSlider.module.scss";

import { Navigation } from "swiper/modules";

const FourItemSlider = () => {

  const sliderData = [
    {imageUrl: "/images/png/keep-exploring1.png", linkText: "Discover Rolex", linkUrl: "/"},
    {imageUrl: "/images/png/keep-exploring2.png", linkText: "Rolex watches", linkUrl: "/"},
    {imageUrl: "/images/png/keep-exploring3.png", linkText: "New watches 2024", linkUrl: "/"},
    {imageUrl: "/images/png/keep-exploring4.png", linkText: "Watchmaking", linkUrl: "/"},
    {imageUrl: "/images/png/keep-exploring1.png", linkText: "Discover Rolex", linkUrl: "/"}
  ];

  const [activeIndex, setActiveIndex] = useState(0);

  const handleSlideChange = (swiper) => {
    setActiveIndex(swiper.activeIndex);
  };
  
  return (
    <div className={styles.sliderContainer}>
      <h3 className={styles.title}>Keep Exploring</h3>

      <Swiper
        slidesPerView={'auto'}
        spaceBetween={12}
        navigation={true}
        breakpoints={{
          768: {
            slidesPerView: 4,
          }
        }}
        modules={[Navigation]}
        className={styles.sliderSwiper}
        onSlideChange={handleSlideChange}
      >
        {sliderData.map((data, index) => (
        <SwiperSlide  key={index} className={`${[styles.sliderSlide]} ${index < activeIndex || index > activeIndex + 3 ? styles.hiddenSlide : ''}`}>
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

export default FourItemSlider;
