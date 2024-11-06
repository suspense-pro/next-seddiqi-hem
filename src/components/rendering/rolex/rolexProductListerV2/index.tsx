import React, { useEffect, useState } from "react";
import styles from "./rolexProductListerV2.module.scss";
import { Typography, NavigationLink } from "@components/module";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import { getProducts } from "@utils/sfcc-connector/dataService";
import Image from "next/image";

const RolexProductListerV2 = ({ listItems = [], cta }) => {
  const [products, setProducts] = useState(null);

  useEffect(() => {
    const fetchProducts = async () => {
      if (listItems.length > 0) {
        const data = await getProducts({
          pids: listItems.join(","),
          method: "GET",
        });
        setProducts(data?.data);
      }
    };
    fetchProducts();
  }, [listItems]);

  if (!products) return null;

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
            const imageData = product?.imageGroups?.[1]?.images?.[0]?.link;
            const altText = product?.imageGroups?.[1]?.images?.[0]?.alt || "";
            const title = product?.brand;
            const subtitle = product?.name;
            const price = product?.price;

            return (
              <SwiperSlide key={index}>
                <div className={styles.productItem}>
                  <div className={styles.imageContainer}>
                    {imageData && (
                      <Image
                        layout="fill"
                        objectFit="contain"
                        alt={altText}
                        src={imageData}
                        className={styles.productImage} 
                      />
                    )}
                  </div>
                  <div className={styles.productInfo}>
                  <Typography variant="p" className={styles.productTitle}>
                      {title}
                    </Typography>
                    <Typography variant="p" className={styles.productName}>
                      {subtitle?.toUpperCase()}
                    </Typography>
                    <Typography variant="p" className={styles.productPrice}>
                      AED {price}
                    </Typography>
                  </div>
                </div>
              </SwiperSlide>
            );
          })}
        </Swiper>
      </div>
      <div className={styles.btnContainer}>
        <NavigationLink
          className={styles.discoverButton}
          title={cta?.label || "Shop"}
        />
      </div>
    </div>
  );
};

export default RolexProductListerV2;
