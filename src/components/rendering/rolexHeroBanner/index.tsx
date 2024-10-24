import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import styles from "./rolexHeroBanner.module.scss"; // Assuming SCSS modules for styling
import ArrowRightThick from "@assets/images/svg/ArrowRightThick";

const RolexHeroBanner = () => {
  const slides = [
    {
      brand: "Rolex",
      image: "/images/jpg/rolex-hero-banner.jpeg", // Replace with your actual image paths
      title: "New watches 2024",
      description: "Discover",
    },
  ];

  return (
    <Swiper
      modules={[Navigation, Pagination, Autoplay]}
      spaceBetween={50}
      slidesPerView={1}
      navigation
      pagination={{ clickable: true }}
      autoplay={{ delay: 3000 }}
      loop={true}
      className={styles.heroSlider}
    >
      {slides.map((slide, index) => (
        <SwiperSlide key={index}>
          <div className={styles.slide}>
            <img src={slide.image} alt="Rolex Watch" className={styles.image} />
            <div className={styles.textOverlay}>
              <div className={styles.brand}>{slide.brand}</div>
              <h2 className={styles.title}>{slide.title}</h2>
              <div className={styles.btnContainer}>
                <a href="#discover" className={styles.discoverButton}>
                  {slide.description}
                </a>
              </div>
            </div>
              <div className={styles.sliderBtn}>
                <ArrowRightThick />
              </div>
          </div>
        </SwiperSlide>
      ))}
    </Swiper>
  );
};

export default RolexHeroBanner;
