import React, { useRef, useState, useCallback, useEffect } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, EffectCoverflow } from "swiper/modules";
import { ArrowRight } from "@assets/images/svg";
import styles from "./featuredProductCarousel.module.scss";
import "swiper/css";
import "swiper/css/effect-coverflow";
import "swiper/css/pagination";
import { useDeviceWidth } from "@utils/useCustomHooks";

import Image from "@components/module/image";
import Typography from "@components/module/typography";
import Button from "@components/module/button";
import Video from "@components/module/video";
import { ContentHeader } from "@components/module";
import { getProducts } from "@utils/sfcc-connector/dataService";
import ProductCard from "@components/module/cards/productCard";

const FeaturedProductCarousel = ({ mainTitle, hideUnderline, richText, listItems = [], cta }) => {
  console.log("LISTITEM", listItems);
  if (!listItems) {
    return null;
  }

  const [products, setProducts] = useState(null);

  useEffect(() => {
    const fetchProducts = async () => {
      if (listItems) {
        const data = await getProducts({ pids: listItems?.join(","), method: "GET" });
        setProducts(data?.data);
      }
    };
    fetchProducts();
  }, [listItems]);

  console.log("PRODUCTS", products);

  const swiperRef = useRef(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const isMobile = !useDeviceWidth()[0];

  const handleSlide = useCallback((direction) => {
    if (swiperRef.current) {
      swiperRef.current[direction === "prev" ? "slidePrev" : "slideNext"]();
    }
  }, []);

  const onSlideChange = useCallback((swiper) => {
    setActiveIndex(swiper.realIndex);
  }, []);

  const imageClassNames = listItems.length < 3 ? `${styles.twoColumnImg} ${styles.image}` : styles.image;
  const videoContainerClassNames = listItems.length < 3 ? `${styles.twoColumnVid}` : styles.videoContainer;
  const videoClassNames = isMobile ? styles.mobileVid : styles.video;

  const renderSlide = (item, index) => {
    const isVideo = item?.media?.video;
    const isImage = item?.media?.image;

    return (
      <SwiperSlide className={styles.swiperSlide} key={index} style={isMobile ? { width: "90%" } : {}}>
        <div className={styles.sliderItem}>
          <ProductCard item={item} isCarousel={false} />
          {/* {isVideo && (
            <div className={videoContainerClassNames}>
              <Video
                className={videoClassNames}
                video={item.media.video}
                autoPlay={item?.media?.autoPlay}
                showPlay={item?.media?.showPlay}
              />
            </div>
          )} */}
        </div>
      </SwiperSlide>
    );
  };

  const hasMultipleItems = listItems.length > 3;

  return (
    <div className={styles.container}>
      {/* CONTAINER HEADER */}
      <ContentHeader
        barColor={styles.barColor}
        subTitleColor={styles.subTitleColor}
        titleColor={styles.titleColor}
        hideUnderline={hideUnderline}
        mainTitle={mainTitle}
        richText={richText}
      />
      <div className={styles.containerSlider}>
        {/* SLIDER BTNS */}
        {hasMultipleItems && !isMobile && (
          <>
            {activeIndex > 0 && (
              <div className={styles.leftBtn} onClick={() => handleSlide("prev")}>
                <ArrowRight fill="white" className={styles.arrowLeft} />
              </div>
            )}
            {activeIndex < listItems.length - 3 && (
              <div className={styles.rightBtn} onClick={() => handleSlide("next")}>
                <ArrowRight fill="white" className={styles.arrowRight} />
              </div>
            )}
          </>
        )}
        {/* SLIDER CONTAINER */}
        <Swiper
          modules={[Navigation, EffectCoverflow]}
          onBeforeInit={(swiper) => {
            swiperRef.current = swiper;
          }}
          slidesPerView={isMobile ? "auto" : listItems?.length < 3 ? listItems?.length : 3}
          onSlideChange={onSlideChange}
          className={styles.mySwiper}
        >
          {products?.map((item, index) => renderSlide(item, index))}
        </Swiper>
      </div>
      <Button
        isLink={true}
        link={cta.url}
        className={styles.discoverBtn}
        title={cta.label}
        color={cta.color}
        type={cta.type}
      />
    </div>
  );
};

export default FeaturedProductCarousel;
