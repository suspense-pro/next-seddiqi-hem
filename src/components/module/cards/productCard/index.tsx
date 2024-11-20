import React, { useState } from "react";
import Typography from "@components/module/typography";
import HeartIcon from "@assets/images/svg/HeartIcon";
import styles from "./productCard.module.scss";
import Image from "next/image";
import { HoverProductSlider, CarouselBtns } from "@components/module";
import Link from "next/link";

// TEMP
const WATCH_TYPE = "Classic Fusion";

const slides = [
  "/images/png/product_watch_01.png",
  "/images/png/product_watch_02.png",
  "/images/png/product_watch_03.png",
  "/images/png/product_watch_04.png",
];

interface Props {
  item: any;
  hasCarousel?: boolean;
}

const ProductCard = ({ item, hasCarousel = false }: Props) => {
  if (!item) return null;

  const [swiper, setSwiper] = useState(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
 
  const {
    id,
    name,
    image,
    pricePerUnit,
    priceCurrency,
    c_brandName,
    c_model,
    c_edition,
    c_additionalField1,
    imageGroups,
    productId,
    representedProduct
  } = item;
 
  const cleanedId = (id ?? productId).replace(/\//g, "%2F");

  return (
    <Link
      href={`/product/${cleanedId}`}
      //target="_blank"
      rel="noopener noreferrer"
    >
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
            <div className={styles.new}>
            {c_edition ?? representedProduct?.c_edition}
            </div>
          </div>
          {/* <HeartIcon fill="#" /> */}
        </div>
        <div className={styles.imgContainer}>
          {imageGroups && hasCarousel && isHovered ? (
            <HoverProductSlider
              slides={imageGroups[0].images}
              setSwiper={setSwiper}
              setActiveIndex={setActiveIndex}
              setTransition={"slide"}
              setSpeed={500}
            />
          ) : (
            <Image
              layout="fill"
              objectFit="contain"
              alt={`Non-Slide`}
              src={image?.absUrl ?? image.link}
              // src={imageGroups[1]?.images?.[0]?.link}
            />
          )}
        </div>
        <div className={styles.productBottom}>
          <Typography align="center" variant="p" className={styles.title}>
            {c_brandName ?? representedProduct?.c_brandName}
          </Typography>
          <Typography align="center" variant="p" className={styles.type}>
            {(c_model ?? representedProduct?.c_model) + " - " + (c_additionalField1 ?? representedProduct?.c_additionalField1)}

          </Typography>
          {/* <Typography align="center" variant="p" className={styles.price}>
            {priceCurrency} {pricePerUnit}
          </Typography> */}
          {imageGroups && hasCarousel && isHovered && (
            <CarouselBtns
              swiper={swiper}
              activeIndex={activeIndex}
              slides={imageGroups[0].images}
              btnWidth={16}
              btnColor={"grey-light-5"}
            />
          )}
        </div>
      </div>
    </Link>
  );
};

export default React.memo(ProductCard);
