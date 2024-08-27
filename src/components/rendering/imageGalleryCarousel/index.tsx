import React, { useCallback, useRef, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, EffectCoverflow, Zoom } from "swiper/modules";
import "swiper/css";
import "swiper/css/effect-coverflow";
import "swiper/css/pagination";
import styles from "./imageGalleryCarousel.module.scss";
import { Image } from "@components/module";
import { PlusIcon } from "@assets/images/svg";
import { useDeviceWidth } from "@utils/useCustomHooks";
import ProductZoom from "@components/module/productZoom";

const ImageGalleryCarousel = ({ ...content }) => {
  const swiperRef = useRef(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const isMobile = !useDeviceWidth()[0];
  const [showZoom, setShowZoom] = useState(false);
  const [currentImage, setCurrentImage] = useState("");

  const onSlideChange = useCallback((swiper) => {
    setActiveIndex(swiper.realIndex);
  }, []);

  let arr = [1, 2, 3];
  console.log("image galler", content);
  return (
    <div style={{ margin: "200px 0" }} className={styles.container}>
      {showZoom && <ProductZoom setShowZoom={setShowZoom} listitems={currentImage} />}
      <Swiper
        modules={[Navigation, EffectCoverflow]}
        onBeforeInit={(swiper) => {
          swiperRef.current = swiper;
        }}
        // slidesPerView={isMobile ? "auto" : listItems?.length < 3 ? listItems?.length : 3}
        slidesPerView={3}
        onSlideChange={onSlideChange}
        className={styles.mySwiper}
        spaceBetween={2}
      >
        {content?.galleryItems?.map((item) => {
          return (
            <>
              <SwiperSlide className={styles.swiperSlide} key={item} style={isMobile ? { width: "90%" } : {}}>
                <div className={styles.sliderItem}>
                  <div className={styles.imgContainer}>
                    <Image className={styles.image} image={item?.listItems[0]?.image} imageAltText="image" />
                  </div>
                  <div className={styles.sliderContent}>
                    <div className={styles.contentInfo}>
                      <div className={styles.label}>{item?.mainTitle}</div>
                      <div className={styles.desc}>{item?.titleDescription}</div>
                    </div>
                    <div
                      onClick={() => {
                        setShowZoom(true);
                        setCurrentImage(item);
                      }}
                      className={styles.iconBg}
                    >
                      <PlusIcon />
                    </div>
                  </div>
                </div>
              </SwiperSlide>
            </>
          );
        })}
      </Swiper>
    </div>
  );
};

export default ImageGalleryCarousel;
