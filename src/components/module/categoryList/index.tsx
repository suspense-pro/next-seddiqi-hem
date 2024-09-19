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

import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, EffectCoverflow } from "swiper/modules";
import { ArrowRight } from "@assets/images/svg";
import "swiper/css";
import "swiper/css/effect-coverflow";
import "swiper/css/pagination";

const CategoryList: React.FC<CategoryListProps> = ({ ...content }) => {
  let { cta, title, listItems } = content;

  const isMobile = !useDeviceWidth()[0];
  const swiperRef = useRef(null);
  const [activeIndex, setActiveIndex] = useState(0);

  const onSlideChange = useCallback((swiper) => {
    setActiveIndex(swiper.realIndex);
  }, []);

  const handleSlide = useCallback((direction) => {
    if (swiperRef.current) {
      swiperRef.current[direction === "prev" ? "slidePrev" : "slideNext"]();
    }
  }, []);

  return (
    <div className={styles.catogeryListContainer}>
      <Typography variant="h2" className={styles.title}>
        {title}
      </Typography>

      <div className={styles.carousel}>
        <Swiper
          modules={[Navigation, EffectCoverflow]}
          onBeforeInit={(swiper) => {
            swiperRef.current = swiper;
          }}
          slidesPerView={!isMobile ? 6.1 : 1.5}
          onSlideChange={onSlideChange}
          className={styles.mySwiper}
          spaceBetween={24}
        >
          {listItems?.map((item, index) => {
            return (
              <SwiperSlide className={styles.swiperSlide} key={index}>
                <GradientOverlay
                  opacity={item?.opacity?.opacity}
                  className={styles.containerImg}
                >
                  <div className={styles.categoryListItem}>
                    {item?.media?.image && (
                      <Image
                        className={styles.image}
                        image={item?.media?.image}
                      />
                    )}
                    {item?.media?.video && (
                      <Video
                        className={styles.image}
                        video={item?.media?.video}
                        autoPlay={item?.media?.autoPlay}
                        showPlay={item?.media?.showPlay}
                      />
                    )}
                  </div>
                </GradientOverlay>
                <div className={styles.contentWrapper}>
                  {item?.title && (
                    <div className={styles.titleContainer}>
                      <Typography variant="h2" className={styles.slideTitle}>
                        {item.title}
                      </Typography>
                    </div>
                  )}
                  {item?.description && (
                    <div className={styles.descriptionContainer}>
                      <Typography
                        variant="h5"
                        className={styles.slideDescription}
                      ></Typography>
                    </div>
                  )}
                </div>
              </SwiperSlide>
            );
          })}
        </Swiper>
      </div>
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
