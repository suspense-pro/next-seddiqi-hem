import React from "react";
import styles from "./rolexProductLister.module.scss";
import { Typography, NavigationLink, Image } from "@components/module";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";

const RolexProductLister = (content) => {
  if (!content) return null;

  const products = content?.productImages;

  return (
    <div className={styles.productListerContainer}>
      <div className={styles.swiperWrapper}>
        <Swiper
          slidesPerView={1}
          spaceBetween={16}
          breakpoints={{
            768: {
              slidesPerView: 1,
              spaceBetween: 16,
            },
            1024: {
              slidesPerView: 3,
              spaceBetween: 40,
            },
          }}
          className={styles.productLister}
        >
          {products.map((product, index) => {
            const imageData = product.image.image;
            const altText = product.image.altText || "";
            const title = product.productTitle;
            const name = product.productName;
            const price = product.price;

            return (
              <SwiperSlide key={index}>
                <div className={styles.productItem}>
                  <div className={styles.imageContainer}>
                    {imageData && (
                      <Image
                        image={imageData}
                        imageAltText={altText}
                        className={styles.productImage}
                      />
                    )}
                  </div>
                  <div className={styles.productInfo}>
                    <Typography variant="p" className={styles.productTitle}>
                      {title}--000
                    </Typography>
                    <Typography variant="p" className={styles.productName}>
                      {name}
                    </Typography>
                    <Typography variant="p" className={styles.productPrice}>
                      {price}
                    </Typography>
                  </div>
                </div>
              </SwiperSlide>
            );
          })}
        </Swiper>
      </div>
      <div className={styles.btnContainer}>
        <NavigationLink className={styles.discoverButton} title={"Shop"} />
      </div>
    </div>
  );
};

export default RolexProductLister;
