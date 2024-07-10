import React from "react";
import Image from "next/image";
import styles from "./storyCard.module.scss";
import { CardInfoProps } from "@utils/models";

const DEFAULT_IMAGE = "/images/png/watchImage_02.png";
const DEFAULT_TITLE = "Seddiqi Jewellery Show: Where Nature and Luxur...";
const DEFAULT_SUBTITLE = "The world of watchmaking came to Geneva.";

const StoryCard: React.FC<CardInfoProps> = ({ item }) => {
  const image = item?.image?.image;
  if (!image) return null;
  const imageUrl =
    `https://${image?.defaultHost}/i/${image?.endpoint}/${image?.name}` ||
    DEFAULT_IMAGE;
  const altText = item?.image?.altText || "Story Image";

  const title = item?.title ? item.title : DEFAULT_TITLE;
  const subtitle = item?.subTitle ? item.subTitle : DEFAULT_SUBTITLE;

  return (
    <div className={styles.storyCardContainer}>
      <div className={styles.imgContainer}>
        <Image src={imageUrl} alt={altText} fill className={styles.image} />
      </div>
      <div className={styles.content}>
        <div className={styles.title}>{title}</div>
        <div className={styles.subtitle}>{subtitle}</div>
      </div>
    </div>
  );
};

export default StoryCard;
