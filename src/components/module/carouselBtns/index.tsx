import React, { useCallback } from "react";
import { ArrowRight } from "@assets/images/svg";
import styles from "./carouselBtns.module.scss";

const CarouselBtns = ({ swiper, activeIndex, slides }) => {
  const handlePaginationClick = useCallback(
    (index) => {
      if (swiper) swiper.slideToLoop(index);
    },
    [swiper]
  );

  const handlePrevClick = useCallback(() => {
    if (swiper) {
      if (activeIndex === 0) {
        swiper.slideToLoop(slides.length - 1);
      } else {
        swiper.slidePrev();
      }
    }
  }, [swiper, activeIndex, slides.length]);

  const handleNextClick = useCallback(() => {
    if (swiper) {
      if (activeIndex === slides.length - 1) {
        swiper.slideToLoop(0);
      } else {
        swiper.slideNext();
      }
    }
  }, [swiper, activeIndex, slides.length]);

  return (
    <div className={styles.carousel}>
      <span onClick={handlePrevClick}>
        <ArrowRight className={styles.arrowLeft} />
      </span>
      <div className={styles.btns}>
        {slides.map((_, index) => (
          <div
            key={index}
            className={`${styles.carouselBtn} ${
              index === activeIndex ? styles.activeCarouselBtn : ""
            }`}
            onClick={() => handlePaginationClick(index)}
          >
            &nbsp;
          </div>
        ))}
      </div>
      <span onClick={handleNextClick}>
        <ArrowRight className={styles.arrowRight} />
      </span>
    </div>
  );
};

export default React.memo(CarouselBtns);
