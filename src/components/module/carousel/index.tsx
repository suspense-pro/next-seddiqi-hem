import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { EffectFade, Pagination } from "swiper/modules";
import Image from "next/image";
import "swiper/css";
import 'swiper/css/effect-fade';
import 'swiper/css/pagination';
import styles from "./carousel.module.scss";
import Video from "../video";

const Carousel = ({ slides, setSwiper, setActiveIndex, setTransition, setSpeed, isAnimated }) => {
  // console.log("slides------", slides)
  const onSlideChange = (swiperInstance) => {
    setActiveIndex(swiperInstance.realIndex);
  };

  if (!slides) {
    return null;
  }

  return (
    <Swiper
      onSwiper={setSwiper}
      onSlideChange={onSlideChange}
      effect={setTransition}
      fadeEffect={{ crossFade: true }}
      modules={[EffectFade, Pagination]}
      speed={setSpeed}
      loop={true}
      // autoHeight={true}
      className={`${isAnimated === "yes" ? styles.swiperScaleEffect : "" }`}
    >
      {slides.map((slide, index) => {
        return (
          <SwiperSlide key={index} className={isAnimated === "yes" ? styles.swiperSlide : ""}>
          {isAnimated === "yes" ?
            <div style={
              slide.type === "image" ? { backgroundImage: "url('" + slide.url + "')", backgroundRepeat: "no-repeat", transformOrigin: "50% 50%" } : { position: "relative", width: "100%", height: "100%" }
              }
              className={`${slide.type === "image" ? styles.swiperSlideCover : ""}`}
            >
              {slide.type === "image" ? (
                ""
              ) : slide.type === "video" ? (
                <Video
                  video={slide?.video}
                  autoPlay={slide?.autoPlay}
                  showPlay={slide?.showPlay}
                />
              ) : slide}
            </div>
            :
            <div style={{ position: "relative", width: "100%", height: "100%" }}>
              {slide.type === "image" ? (
                <Image
                  layout="fill"
                  objectFit="cover"
                  alt={`Slide ${index + 1}`}
                  src={slide.url}
                />
              ) : slide.type === "video" ? (
                // <video
                //   src={slide.url}
                //   autoPlay={slide.autoPlay}
                //   controls={slide.showPlay}
                //   style={{ width: "100%", height: "100%", objectFit: "cover" }}
                // />
                <Video
                  video={slide?.video}
                  autoPlay={slide?.autoPlay}
                  showPlay={slide?.showPlay}
                />
              ) : (
                slide
              )}
            </div>
          } 
          </SwiperSlide>
        );
      })}
    </Swiper>
  );
};

export default React.memo(Carousel);
