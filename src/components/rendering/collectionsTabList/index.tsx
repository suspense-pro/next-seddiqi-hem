import { Button, Image, SectionHeader, TabbedNavigation, Typography, Video } from "@components/module";
import React, { useRef, useState } from "react";
import styles from "./collectionsTabList.module.scss";
import { Swiper, SwiperSlide } from "swiper/react";

import "swiper/css";
import "swiper/css/effect-coverflow";
import "swiper/css/pagination";
import { useDeviceWidth } from "@utils/useCustomHooks";
import { EffectCoverflow, Navigation } from "swiper/modules";

const CollectionsTabList = ({ ...content }) => {
  const isMobile = !useDeviceWidth()[0];

  let tabs = content?.tabItem?.map((item, index) => {
    return {
      id: index + 1,
      title: item?.tabLabel,
      content: isMobile ? (
        <ContainerGridMobile cta={content?.cta} content={content} />
      ) : (
        <ContainerGrid cta={content?.cta} content={content} />
      ),
    };
  });
  return (
    <div className={styles.container}>
      <SectionHeader
        barColor={styles.barColor}
        subTitleColor={styles.subTitleColor}
        titleColor={styles.titleColor}
        hideUnderline={content?.hideUnderline}
        mainTitle={content?.mainTitle}
        richText={content?.richText}
      />
      <TabbedNavigation
        gap={isMobile ? 10 : 60}
        className={styles.tabNavigation}
        tabs={tabs}
        // tabs={[...tabs, { id: 2, title: "Collection Category Text", content: "" }]}
      />
    </div>
  );
};

export default CollectionsTabList;

const ContainerGrid = ({ content, cta }) => {
  return (
    <div className={styles.containerGrid}>
      <div className={styles.containerGridItems}>
        {content?.tabItem[0]?.collectionItems?.map((item) => {
          return (
            <div className={styles.item}>
              {item?.media?.image ? (
                <Image className={`${styles.image}`} image={item?.media?.image} imageAltText={item.media.altText} />
              ) : item?.media?.video ? (
                <div className={styles.videoContainer}>
                  <Video className={styles.video} video={item?.media?.video} />
                </div>
              ) : null}
              <div className={styles.itemContent}>
                <div className={styles.category}>{item?.title}</div>
                <div className={styles.title}>{item?.cta?.label}</div>
                <div className={styles.itemBar}>&nbsp;</div>
              </div>
            </div>
          );
        })}
      </div>
      <Button
        isLink={true}
        link={cta?.url}
        className={styles.appointmentBtn}
        title={cta?.label}
        color={cta?.color}
        type={cta?.type}
      />
    </div>
  );
};
const ContainerGridMobile = ({ content, cta }) => {
  const swiperRef = useRef(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const isMobile = !useDeviceWidth()[0];

  const onSlideChange = (swiper) => {
    setActiveIndex(swiper.realIndex);
  };

  const listItems = content?.tabItem[0]?.collectionItems;

  const renderSlide = (item, index) => (
    <SwiperSlide className={styles.swiperSlide} key={index} style={isMobile ? { width: "90%" } : {}}>
      <div className={styles.item}>
        {item?.media?.image ? (
          <Image className={`${styles.image}`} image={item.media.image} imageAltText={item.media.altText} />
        ) : item?.media?.video ? (
          <div className={styles.videoContainer}>
            <Video className={isMobile ? styles.mobileVid : styles.video} video={item.media.video} />
          </div>
        ) : null}
        <div className={styles.itemContent}>
          <div className={styles.category}>{item?.title}</div>
          <div className={styles.title}>{item?.cta?.label}</div>
          <div className={styles.itemBar}>&nbsp;</div>
        </div>
      </div>
    </SwiperSlide>
  );

  return (
    <div className={styles.containerSlider}>
      <Swiper
        modules={[Navigation, EffectCoverflow]}
        onBeforeInit={(swiper) => {
          swiperRef.current = swiper;
        }}
        slidesPerView={isMobile ? "auto" : listItems?.length < 3 ? listItems?.length : 3}
        onSlideChange={onSlideChange}
        className={styles.mySwiper}
      >
        {listItems?.map(renderSlide)}
      </Swiper>
      <div>
        <Button
          isLink={true}
          link={cta?.url}
          className={styles.appointmentBtn}
          title={cta?.label}
          color={cta?.color}
          type={cta?.type}
        />
      </div>
    </div>
  );
};
