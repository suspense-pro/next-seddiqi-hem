import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination } from "swiper/modules";
import Image from "next/image";
import "swiper/css";

const Carousel = ({ slides, setSwiper, setActiveIndex }) => {
  const onSlideChange = (swiperInstance) => {
    setActiveIndex(swiperInstance.realIndex);
  };

  if(!slides) {
    return null
  }

  return (
    <Swiper
      onSwiper={setSwiper}
      onSlideChange={onSlideChange}
      modules={[Pagination]}
      loop={true}
    >
      {slides.map((slide, index) => (
        <SwiperSlide key={index}>
          <div>
            <Image
              layout="fill"
              objectFit="cover"
              alt={`Slide ${index + 1}`}
              src={slide}
            />
          </div>
        </SwiperSlide>
      ))}
    </Swiper>
  );
};

export default React.memo(Carousel);
