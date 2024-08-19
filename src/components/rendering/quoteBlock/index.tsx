import React, { useState } from "react";
import styles from "./quoteBlock.module.scss";
import Typography from "../../module/typography";
import RichText from "../../module/richText";
import { Image } from "@components/module";
import Carousel from "@components/module/carousel";
import CarouselBtns from "@components/module/carouselBtns";

const QuoteBlock = ({ quoteItem }) => {
  const [swiper, setSwiper] = useState(null);
  const [activeIndex, setActiveIndex] = useState(0);

  if (!quoteItem || quoteItem.length === 0) return null;

  const slides = quoteItem.map((item, index) => {
    const { logoIcon, richText, nameSource, nameDesignation } = item;
    return (
      <div key={index} className={styles.quoteBlockContainer}>
        {logoIcon && logoIcon.image && (
          <div className={styles.logo}>
            <Image
              image={logoIcon.image.image}
              imageAltText={logoIcon.image.altText}
            />
          </div>
        )}
        <div className={styles.richText}>
          <RichText align="center" text={richText} />
        </div>
        <Typography variant="h5" className={styles.nameSource}>
          {nameSource}
        </Typography>

        <Typography variant="p" className={styles.nameDesignation}>
          {nameDesignation}
        </Typography>
      </div>
    );
  });

  return (
    <div className={styles.quoteCarouselContainer}>
      <Carousel
        slides={slides}
        setSwiper={setSwiper}
        setActiveIndex={setActiveIndex}
      />
      <div className={styles.carouselBtnsContainer}>
        <CarouselBtns
          swiper={swiper}
          activeIndex={activeIndex}
          slides={slides}
        />
      </div>
    </div>
  );
};

export default QuoteBlock;
