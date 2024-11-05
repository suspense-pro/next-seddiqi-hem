import React, { useRef, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import "swiper/css";
import styles from "./rolexHeroBanner.module.scss";
import { ArrowRightThick } from "@assets/images/svg";
import { GradientOverlay, Image, NavigationLink, Video } from "@components/module";
import { useWindowWidth } from "@utils/useCustomHooks";

const RolexHeroBanner = ({ ...content }) => {
  const swiperRef = useRef(null);
  const [activeIndex, setActiveIndex] = useState(0);

  if (!content) return null;

  const slides = content?.listItems;

  const handleSlideChange = (swiper) => {
    setActiveIndex(swiper.activeIndex);
  };

  const screenSize = useWindowWidth();
  return (
    <Swiper
      ref={swiperRef}
      modules={[Autoplay]}
      spaceBetween={0}
      slidesPerView={1}
      autoplay={{ delay: 3000, disableOnInteraction: false }}
      loop={true}
      speed={600}
      onSlideChange={handleSlideChange}
      className={styles.heroSlider}
    >
      {slides?.map((slide, index) => {
        return (
          <SwiperSlide className={styles.swiperSlide} key={index}>
            <div className={styles.slide}>
              {slide?.media?.image || slide?.mobileMedia?.media?.image ? (
                <GradientOverlay className={styles.gradient} opacity={slide?.opacity?.opacity}>
                  <Image
                    imgWidth="100%"
                    height={styles.image}
                    className={styles.image}
                    image={slide?.media?.image}
                    imageAltText={slide?.media?.altText}
                  />
                  <Image
                    imgWidth="100%"
                    height={styles.mobileImage}
                    className={styles.mobileImage}
                    image={slide?.mobileMedia?.media?.image}
                    imageAltText={slide?.mobileMedia?.media?.altText}
                  />
                </GradientOverlay>
              ) : (
                <Video
                  className={styles.video}
                  video={slide?.media?.video}
                  autoPlay={slide?.media?.autoPlay}
                  showPlay={slide?.media?.showPlay}
                />
              )}
              {slide?.bannerType === "Rolex" ? (
                <div className={styles.textOverlay}>
                  <div className={styles.brand}>{slide?.title}</div>
                  <h2 className={styles.title}>{slide.subHeading}</h2>
                  <div className={styles.btnContainer}>
                    <NavigationLink
                      className={styles.discoverButton}
                      title={slide?.cta?.label}
                      isNewTab={slide?.cta?.isNewTab}
                      url={slide?.cta?.url}
                    />
                  </div>
                </div>
              ) : (
                <div className={styles.textOverlayCpo}>
                  <div className={styles.brand}>{slide?.title}</div>
                  <h2 className={styles.title}>{slide.subHeading}</h2>
                  <div className={styles.btnContainer}>
                    <NavigationLink
                      className={styles.discoverButton}
                      title={slide?.cta?.label}
                      isNewTab={slide?.cta?.isNewTab}
                      url={slide?.cta?.url}
                    />
                  </div>
                </div>
              )}

              {slides?.length > 1 && (
                <>
                  {
                    <div className={styles.sliderLeftBtn} onClick={() => swiperRef.current.swiper.slidePrev()}>
                      <ArrowRightThick />
                    </div>
                  }
                  {
                    <div className={styles.sliderRightBtn} onClick={() => swiperRef.current.swiper.slideNext()}>
                      <ArrowRightThick />
                    </div>
                  }
                </>
              )}
            </div>
          </SwiperSlide>
        );
      })}
    </Swiper>
  );
};

export default RolexHeroBanner;
