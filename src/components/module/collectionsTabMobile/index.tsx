import { useDeviceWidth } from "@utils/useCustomHooks";
import { useRef, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { EffectCoverflow, Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/effect-coverflow";
import "swiper/css/pagination";

import styles from "./collectionsTabMobile.module.scss";
import ProductCard from "../cards/productCard";
import Button from "../button";
import CollectionsCard from "../cards/collectionsCard";

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
      {content?.hideUnderline ? (
        <CollectionsCard item={item} />
      ) : (
        <div>
          <ProductCard
            item={{ name: { default: item?.title }, image: item?.media?.image, type: item?.cta?.label }}
            wishlist={false}
          />
        </div>
      )}
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

export default CollectionsTabMobile;
