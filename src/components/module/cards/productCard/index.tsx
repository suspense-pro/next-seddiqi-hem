import React, { useState } from "react";
import Typography from "@components/module/typography";
import HeartIcon from "@assets/images/svg/HeartIcon";
import styles from "./productCard.module.scss";
import Carousel from "@components/module/carousel";
import CarouselBtns from "@components/module/carouselBtns";
// import Image from "next/image";
import Image from "@components/module/image";

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

const ProductCard = ({ item, isCarousel = false, wishlist=true, isNew=false }) => {
  if (!item) return null;
  const [swiper, setSwiper] = useState(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);

  // ITEM ATTRIBS
  const { name, type, image, shortDescription, pricePerUnit, priceCurrency } = item;

  return (
    <div
      // style={{
      //   order: item?.tempId,
      //   gridRowEnd: `span 1`,
      //   gridColumnEnd: `span 1`,
      // }}
      className={styles.productContainer}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className={styles.productTop}>
        {isNew ? (
          <div className={styles.newContainer}>
            <div className={styles.new}>New In</div>
          </div>
        ) : (
          <div>&nbsp;</div>
        )}
        {wishlist ? <HeartIcon fill="#" /> : <div>&nbsp;</div>}
      </div>
      {/* <div className={styles.imgContainer}>
        <Carousel
          slides={slides}
          setSwiper={setSwiper}
          setActiveIndex={setActiveIndex}
        />
        <Image
          layout="fill"
          objectFit="cover"
          alt={`Slide`}
          src={image?.absUrl}
        />
      </div> */}
      <Image className={`${styles.image}`} image={image} imageAltText={""} />
      <div className={styles.productBottom}>
        <Typography align="center" variant="p" className={styles.title}>
          {name?.default}
        </Typography>
        <Typography align="center" variant="p" className={styles.type}>
          {type ? type : WATCH_TYPE}
        </Typography>
        {priceCurrency && (
          <Typography align="center" variant="p" className={styles.price}>
            {priceCurrency} {pricePerUnit}
          </Typography>
        )}

        {isCarousel && isHovered && <CarouselBtns swiper={swiper} activeIndex={activeIndex} slides={slides} />}
      </div>
    </div>
  );
};

export default React.memo(ProductCard);
