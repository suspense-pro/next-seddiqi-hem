import React from "react";
import styles from "./productCard.module.scss";
import Image from "next/image";
import { HeartIcon } from "@assets/images/svg";

// TEMP
const DEFAULT_IMAGE = "/images/png/product_watch_01.png";
const TITLE = "Hublot";
const WATCH_TYPE = "Classic Fusion";
const PRICE = "AED 20'500";

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
        <Image className={styles.image} fill alt="watch" src={DEFAULT_IMAGE} />
      </div>
      <div className={styles.productBottom}>
        <div className={styles.title}>{TITLE}</div>
        <div className={styles.type}>{WATCH_TYPE}</div>
        <div className={styles.price}>{PRICE}</div>
      </div>
    </div>
  );
};

export default ProductCard;
