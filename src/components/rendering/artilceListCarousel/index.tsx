import React, { useCallback, useRef, useState } from "react";
import styles from "./artilceListCarousel.module.scss";
import { Button, ContentHeader, Image, Typography } from "@components/module";
import { useDeviceWidth } from "@utils/useCustomHooks";

import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, EffectCoverflow } from "swiper/modules";
import { ArrowRight } from "@assets/images/svg";
import "swiper/css";
import "swiper/css/effect-coverflow";
import "swiper/css/pagination";
import RichText from "@components/module/richText";

const ArticleListCarousel = ({ ...content }) => {

  const listItems = content?.listItems[0].storyCard;
  const isMobile = !useDeviceWidth()[0];

  const swiperRef = useRef(null);
  const [activeIndex, setActiveIndex] = useState(0);

  const onSlideChange = useCallback((swiper) => {
    setActiveIndex(swiper.realIndex);
  }, []);

  const { cta } = content;
  const hasMultipleItems = listItems.length > 2;
  const handleSlide = useCallback((direction) => {
    if (swiperRef.current) {
      swiperRef.current[direction === "prev" ? "slidePrev" : "slideNext"]();
    }
  }, []);

  return (
    <div className={styles.container}>
      <div className={styles.headerItem}>
        <Typography variant="h2" className={`${styles.headingPrimary}`}>
          {content?.mainTitle}
        </Typography>
        <div className={`${styles.headingSecondary}`}>
          <RichText align="" className={`${styles.headingSecondary}`} text={content?.richText} />
        </div>
        {!isMobile && <Button isLink={true} link={cta?.url} title={cta?.label} color={cta?.color} type={cta?.type} />}
      </div>
      <div className={styles.carousel}>
        {hasMultipleItems && !isMobile && (
          <>
            {activeIndex > 0 && (
              <div className={styles.leftBtn} onClick={() => handleSlide("prev")}>
                <ArrowRight fill="white" className={styles.arrowLeft} />
              </div>
            )}
            {listItems?.length > 2 && activeIndex < listItems.length - 2 && (
              <div className={styles.rightBtn} onClick={() => handleSlide("next")}>
                <ArrowRight fill="white" className={styles.arrowRight} />
              </div>
            )}
          </>
        )}
        <Swiper
          modules={[Navigation, EffectCoverflow]}
          onBeforeInit={(swiper) => {
            swiperRef.current = swiper;
          }}
          slidesPerView={isMobile ? 1.3 : 2.2}
          onSlideChange={onSlideChange}
          className={styles.mySwiper}
          spaceBetween={20}
        >
          {listItems?.map((item, index) => {
            return (
              <SwiperSlide className={styles.swiperSlide} key={index}>
                <div className={styles.articleItem}>
                  <div className={styles.containerImg}>
                    <Image className={styles.image} image={item?.image?.image} />
                  </div>
                  <div className={styles.articleContent}>
                    <div className={styles.label}>{item?.readTime}</div>
                    <div className={styles.title}>{item?.title}</div>
                    <div className={styles.desc}>{item?.subTitle}</div>
                  </div>
                </div>
              </SwiperSlide>
            );
          })}
        </Swiper>
      </div>
      <div className={styles.storyBtn}>
        {isMobile && <Button isLink={true} link={cta?.url} title={cta?.label} color={cta?.color} type={cta?.type} />}
      </div>
    </div>
  );
};

export default ArticleListCarousel;
