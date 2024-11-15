import React, { useRef, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import "swiper/css";
import styles from "./rolexHeroBanner.module.scss";
import { ArrowRightThick } from "@assets/images/svg";
import { GradientOverlay, Image, NavigationLink, Video } from "@components/module";
import { useWindowWidth } from "@utils/useCustomHooks";
import CarouselBtns from "@components/module/carouselBtns";

const RolexHeroBanner = ({ ...content }) => {
  const swiperRef = useRef(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [swiper, setSwiper] = useState(null);

  if (!content) return null;

  console.log("content", content);

  const slides = content?.listItems;

  const handleSlideChange = (swiper) => {
    setActiveIndex(swiper?.activeIndex);
  };

  const handleReachEnd = () => {
    setActiveIndex(0);
  };

  const bannerType = content?.listItems[0]?.bannerType;

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
      className={`${bannerType === "CPO" && styles.cpoHeroSlider} ${styles.heroSlider}`}
      onReachEnd={handleReachEnd}
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
                  {slide?.title && <div className={styles.brand}>{slide?.title}</div>}
                  {slide.subHeading && <h2 className={styles.title}>{slide.subHeading}</h2>}
                  {slide?.cta?.label && (
                    <div className={styles.btnContainer}>
                      <NavigationLink
                        className={styles.discoverButton}
                        title={slide?.cta?.label}
                        isNewTab={slide?.cta?.isNewTab}
                        url={slide?.cta?.url}
                      />
                    </div>
                  )}
                </div>
              ) : (
                <div className={`${slide?.textPosition === "Center" && styles.centerCpo} ${styles.textOverlayCpo}`}>
                  {slide?.title && <div className={styles.brand}>{slide?.title}</div>}

                  {slide?.subHeading && <h2 className={styles.title}>{slide?.subHeading}</h2>}

                  {slide?.cta && slide?.cta?.label &&  (
                    <div className={styles.btnContainer}>
                      <NavigationLink
                        className={styles.discoverButton}
                        title={slide?.cta?.label}
                        isNewTab={slide?.cta?.isNewTab}
                        url={slide?.cta?.url}
                      />
                    </div>
                  )}
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
      {slides?.length > 1 && (
        <div className={styles.carouselBtns}>
          <CarouselBtns
            btnWidth={40}
            activeIndex={activeIndex}
            slides={slides}
            swiper={swiper}
            btnColor="white"
            activeBtn={false}
          />
        </div>
      )}
    </Swiper>
  );
};

export default RolexHeroBanner;
