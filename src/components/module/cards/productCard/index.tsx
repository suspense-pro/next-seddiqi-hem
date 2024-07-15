import React from "react";
import styles from "./productCard.module.scss";
import Image from "next/image";
import { HeartIcon } from "@assets/images/svg";

const ProductCard = ({ item }: { item: any }) => {
  const { tempId } = item;
  return (
    <div
      style={{
        order: tempId,
      }}
      className={styles.productContainer}
    >
      <div className={styles.productTop}>
        <div className={styles.newContainer}>
          <div className={styles.new}>New In</div>
        </div>
        <HeartIcon fill="#" />
      </div>
      <div className={styles.imgContainer}>
        <Image
          className={styles.image}
          fill
          alt="watch"
          src={"/images/png/product_watch_01.png"}
        />
      </div>
      <div className={styles.productBottom}>
        <div className={styles.title}>Hublot</div>
        <div className={styles.type}>Classic Fusion</div>
        <div className={styles.price}>AED 20'500</div>
      </div>
    </div>
  );
};

export default ProductCard;
