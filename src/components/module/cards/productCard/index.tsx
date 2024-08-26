import React, { useState } from "react";
import Typography from "@components/module/typography";
import HeartIcon from "@assets/images/svg/HeartIcon";
import styles from "./productCard.module.scss";
import Carousel from "@components/module/carousel";
import CarouselBtns from "@components/module/carouselBtns";
import Image from "next/image";

// TEMP
const TITLE = "Hublot";
const WATCH_TYPE = "Classic Fusion";
const PRICE = "AED 20'500";

const slides = [
  "/images/png/product_watch_01.png",
  "/images/png/product_watch_02.png",
  "/images/png/product_watch_03.png",
  "/images/png/product_watch_04.png",
];

const ProductCard = ({ item, isCarousel = true }) => {
  if (!item) return null;
  const [swiper, setSwiper] = useState(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);

  // ITEM ATTRIBS
  const { name, image, imageGroups, shortDescription, pricePerUnit, currency } = item;

  return (
    <div
      style={{
        order: item?.tempId,
        gridRowEnd: `span 1`,
        gridColumnEnd: `span 1`,
      }}
      className={styles.productContainer}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className={styles.productTop}>
        <div className={styles.newContainer}>
          <div className={styles.new}>New In</div>
        </div>
        <HeartIcon fill="#" />
      </div>
      <div className={styles.imgContainer}>
        {/* <Carousel
          slides={slides}
          setSwiper={setSwiper}
          setActiveIndex={setActiveIndex}
        /> */}
        <Image
          layout="fill"
          objectFit="cover"
          alt={`Slide`}
          // src={image?.absUrl}
          src={imageGroups[1]?.images?.[0]?.link}
        />
      </div>
      <div className={styles.productBottom}>
        <Typography align="center" variant="p" className={styles.title}>
          {name}
        </Typography>
        <Typography align="center" variant="p" className={styles.type}>
          {WATCH_TYPE}
        </Typography>
        <Typography align="center" variant="p" className={styles.price}>
          {currency} {pricePerUnit}
        </Typography>
        {isCarousel && isHovered && <CarouselBtns swiper={swiper} activeIndex={activeIndex} slides={slides} />}
      </div>
    </div>
  );
};

export default React.memo(ProductCard);
