import React from "react";
import Image from "next/image";
import styles from "./storyCard.module.scss";
import { LatestsubTitle } from "@components/rendering/header/dummyData";
import { truncateString } from "@utils/helpers/truncateString";

interface StoryCardProps {
  item?: LatestsubTitle;
}

const DEFAULT_IMAGE = "/images/png/watchImage_02.png";
const DEFAULT_TITLE = "Seddiqi Jewellery Show: Where Nature and Luxur...";
const DEFAULT_SUBTITLE = "The world of watchmaking came to Geneva.";
const MAX_STRING_LENGTH = 49;

const StoryCard: React.FC<StoryCardProps> = ({ item }) => {
  const imageUrl = item?.image || DEFAULT_IMAGE;
  const title = item?.title
    ? truncateString(item.title, MAX_STRING_LENGTH)
    : DEFAULT_TITLE;
  const subtitle = item?.subTitle
    ? truncateString(item.subTitle, MAX_STRING_LENGTH)
    : DEFAULT_SUBTITLE;

  return (
    <div className={styles.storyCardContainer}>
      <div className={styles.imgContainer}>
        <Image src={imageUrl} alt="Watch Image" fill className={styles.image} />
      </div>
      <div className={styles.content}>
        <div className={styles.title}>{title}</div>
        <div className={styles.subtitle}>{subtitle}</div>
      </div>
    </div>
  );
};

export default StoryCard;
