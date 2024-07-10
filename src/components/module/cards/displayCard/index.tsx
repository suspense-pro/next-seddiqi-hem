import React from "react";
import Image from "next/image";
import styles from "./displayCard.module.scss";
import { CardInfoProps } from "@utils/models";

const DEFAULT_IMAGE = "/images/png/watchImage_01.png";
const DEFAULT_TITLE = "Rolex";
const DEFAULT_SUBTITLE = "How to take care of your watch?";

const DisplayCard: React.FC<CardInfoProps> = ({ item }) => {
  const image = item?.image?.image;
  if (!image) return null;
  const imageUrl =
    `https://${image?.defaultHost}/i/${image?.endpoint}/${image?.name}` ||
    DEFAULT_IMAGE;
  const altText = item?.image?.altText || "Story Image";
  const title = item?.title ? item.title : DEFAULT_TITLE;
  const subtitle = item?.subTitle ? item.subTitle : DEFAULT_SUBTITLE;

  return (
    <div className={styles.displayCard}>
      <div className={styles.imgContainer}>
        <Image className={styles.storyImg} src={imageUrl} fill alt={altText} />
      </div>
      <div className={styles.displayCardInfo}>
        <div className={styles.title}>{title}</div>
        <div className={styles.subTitle}>{subtitle}</div>
      </div>
    </div>
  );
};

export default DisplayCard;
