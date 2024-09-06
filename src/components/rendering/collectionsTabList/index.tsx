import { Button, CollectionsCard, ContentHeader, TabbedNavigation } from "@components/module";
import React from "react";
import styles from "./collectionsTabList.module.scss";

import "swiper/css";
import "swiper/css/effect-coverflow";
import "swiper/css/pagination";
import { useDeviceWidth } from "@utils/useCustomHooks";

import { useRef, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { EffectCoverflow, Navigation } from "swiper/modules";
import { BackgroundStyle }  from '@utils/helpers/backgroundStyle';

const CollectionsTabList = ({ ...content }) => {
  const isMobile = !useDeviceWidth()[0];
  console.log('COLLECTIONS TABL LIST', content)

  let tabs = content?.tabItem?.map((item, index) => {
    return {
      id: index + 1,
      title: item?.tabLabel,
      content: isMobile ? (
        <CollectionsTabMobile ind={index} cta={content?.cta} content={content} />
      ) : (
        <CollectionsTabDesktop ind={index} cta={content?.cta} content={content} />
      ),
    };
  });

  const backgroundColor = content?.backgroundColor;         //Getting Bgcolor from props
  const textColor = BackgroundStyle({ backgroundColor });   //Using utility function to select textcolor based on bgcolor selection
    return (
    <div style={{ backgroundColor, color: textColor }} className={styles.container}>
      <ContentHeader
        barColor={textColor}
        subTitleColor={styles.subTitleColor}
        titleColor={styles.titleColor}
        hideUnderline={content?.hideUnderline}
        mainTitle={content?.mainTitle}
        richText={content?.richText}
        textColor={textColor}
      />
      <TabbedNavigation gap={isMobile ? 10 : 60} className={styles.tabNavigation} tabs={tabs} />
    </div>
  );
};


const CollectionsTabDesktop = ({ content, cta, ind }) => {
  return (
    <div className={styles.containerGrid}>
      <div className={styles.containerGridItems}>
        {content?.tabItem[ind]?.collectionItems?.map((item) => {
          return <CollectionsCard item={item} type={content?.type} />
        })}
      </div>
      <Button isLink={true} link={cta?.url} title={cta?.label} color={cta?.color} type={cta?.type} />
    </div>
  );
};

const CollectionsTabMobile = ({ content, cta, ind }) => {
  const swiperRef = useRef(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const isMobile = !useDeviceWidth()[0];

  const onSlideChange = (swiper) => {
    setActiveIndex(swiper.realIndex);
  };

  const listItems = content?.tabItem[ind]?.collectionItems;

  const renderSlide = (item, index) => (
    <SwiperSlide className={styles.swiperSlide} key={index} style={isMobile ? { width: "90%" } : {}}>
      <CollectionsCard item={item} type={content?.type} />
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
        <Button isLink={true} link={cta?.url} title={cta?.label} color={cta?.color} type={cta?.type} />
      </div>
    </div>
  );
};

export default CollectionsTabList;
