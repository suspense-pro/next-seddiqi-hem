import styles from "./productZoom.module.scss";
import Image from "../image";
import React, { useCallback, useRef, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, EffectCoverflow } from "swiper/modules";
import "swiper/css";
import "swiper/css/effect-coverflow";
import "swiper/css/pagination";
import { useDeviceWidth } from "@utils/useCustomHooks";

const image = {
  _meta: {
    schema: "http://bigcontent.io/cms/schema/v1/core#/definitions/image-link",
  },
  id: "c33dd291-b4a1-4d30-9e6c-1cca1378b2b3",
  name: "brand_category_list_02",
  endpoint: "likedigital",
  defaultHost: "cdn.media.amplience.net",
  mimeType: "image/png",
};

const ProductZoom = ({setShowZoom, listitems}) => {
  let arr = [1, 2, 3];
  console.log("LIST", listitems)
  const swiperRef = useRef(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [swiper, setSwiper] = useState(null);

  const isMobile = !useDeviceWidth()[0];

  const onSlideChange = useCallback((swiper) => {
    setActiveIndex(swiper.realIndex);
  }, []);

  const handlePaginationClick = useCallback(
    (index) => {
      if (swiper) swiper.slideToLoop(index);
    },
    [swiper]
  );

  return (
    <div  className={styles.container}>
      <Swiper
        onSwiper={setSwiper}
        modules={[Navigation, EffectCoverflow]}
        onBeforeInit={(swiper) => {
          swiperRef.current = swiper;
        }}
        // slidesPerView={isMobile ? "auto" : listItems?.length < 3 ? listItems?.length : 3}
        slidesPerView={1}
        onSlideChange={onSlideChange}
        className={styles.mySwiper}
        spaceBetween={0}
      >
        {arr.map((item) => {
          return (
            <SwiperSlide className={styles.swiperSlide} key={item} style={isMobile ? { width: "90%" } : {}}>
                <div className={styles.spotlight}>
                  <Image className={styles.image} image={image} imageAltText="image" />
                </div>
            </SwiperSlide>
          );
        })}
      </Swiper>

      {/* <div className={styles.spotlight}>
        <Image className={styles.image} image={image} imageAltText="image" />
      </div> */}
      <div className={styles.thumbnails}>
        {arr.map((item, index) => {
          return (
            <div onClick={() => handlePaginationClick(index)}>
              <Image
                className={`${activeIndex === index && styles.activeImage} ${styles.image}`}
                image={image}
                imageAltText="image"
              />
            </div>
          );
        })}
        {/* <Image className={styles.image} image={image} imageAltText="image" />
        <Image className={styles.image} image={image} imageAltText="image" />
        <Image className={styles.image} image={image} imageAltText="image" /> */}
      </div>
    </div>
  );
};

export default ProductZoom;
