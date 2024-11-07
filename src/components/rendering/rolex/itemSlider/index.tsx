import { Image } from "@components/module";
import React, { useState } from "react";
import styles from "./itemSlider.module.scss";
import { Swiper, SwiperSlide } from "swiper/react";
import 'swiper/css';
import 'swiper/css/navigation';
import { Navigation } from "swiper/modules";

const ItemSlider = ({ ...content }) => {

  if (!content) return null;

  const sliderItem = content?.sliderItem;
  const [activeIndex, setActiveIndex] = useState(0);

  const handleSlideChange = (swiper) => {
    setActiveIndex(swiper.activeIndex);
  };
  
  return (
    <div className={styles.sliderContainer}>
      <h3 className={styles.title}>{content.mainTitle}</h3>

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
        {sliderItem.map((data, index) => (
        <SwiperSlide  key={index} className={`${[styles.sliderSlide]} ${index < activeIndex || index > activeIndex + 3 ? styles.hiddenSlide : ''}`}>
          <a href={data.linkUrl} className={styles.sliderLink}>
            <Image
              imgWidth="100%"
              height={"auto"}
              image={data.media?.image}
              imageAltText={data.media?.altText}
            />
            <span className={styles.sliderText}>{data.linkText}</span>
          </a>
        </SwiperSlide>
        ))}
      </Swiper>

    </div>
  )
};

export default ItemSlider;
