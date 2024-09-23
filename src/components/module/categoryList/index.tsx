import React, { useCallback, useRef, useState } from "react";
import styles from "./categoryList.module.scss";
import { CategoryListProps } from "@utils/models";
import { useDeviceWidth } from "@utils/useCustomHooks";
import {
  Button,
  ContentHeader,
  GradientOverlay,
  Image,
  Typography,
  Video,
} from "@components/module";

import { Navigation, EffectCoverflow } from "swiper/modules";
import "swiper/css";
import "swiper/css/effect-coverflow";
import "swiper/css/pagination";

import { Swiper, SwiperSlide } from "swiper/react";
import { CategoryCard } from "@components/module";

const CategoryList: React.FC<CategoryListProps> = ({
  cta,
  title,
  listItems,
}) => {
  const isMobile = !useDeviceWidth()[0];
  const swiperRef = useRef(null);
  const [activeIndex, setActiveIndex] = useState(0);

  const onSlideChange = useCallback((swiper) => {
    setActiveIndex(swiper.realIndex);
  }, []);

  return (
    <div className={styles.catogeryListContainer}>
      <Typography variant="h2" className={styles.title}>
        {title}
      </Typography>

      {isMobile ? (
        <div className={styles.categoryListCarousel}>
          <Swiper
            modules={[Navigation, EffectCoverflow]}
            onBeforeInit={(swiper) => {
              swiperRef.current = swiper;
            }}
            slidesPerView={2}
            spaceBetween={20}
            onSlideChange={onSlideChange}
            loop={false}
            className={styles.mySwiper}
          >
            {listItems?.map((item, index) => (
              <SwiperSlide className={styles.swiperSlide} key={index}>
                <CategoryCard item={item} />
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      ) : (
        <div className={styles.containerGrid}>
          <div className={styles.containerGridItems}>
            {listItems?.map((item, index) => (
              <div className={styles.gridItem} key={index}>
                <CategoryCard item={item} />
              </div>
            ))}
          </div>
        </div>
      )}

      <div className={styles.ctaContainer}>
        <Button
          title={cta?.label}
          type={cta?.type}
          className={styles.ctaButton}
        />
      </div>
    </div>
  );
};

export default CategoryList;
