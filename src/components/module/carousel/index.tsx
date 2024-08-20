import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination } from "swiper/modules";
import Image from "next/image";
import "swiper/css";
import Video from "../video";

const Carousel = ({ slides, setSwiper, setActiveIndex }) => {
  console.log("slides------", slides)
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
      modules={[Pagination]}
      loop={true}
      autoHeight={true}
    >
      {slides.map((slide, index) => (
        <SwiperSlide key={index}>
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
                video={slide.url}
                autoPlay={slide.autoPlay}
                showPlay={slide.showPlay} 
              />
            ) : slide}
          </div>
        </SwiperSlide>
      ))}
    </Swiper>
  );
};

export default React.memo(Carousel);