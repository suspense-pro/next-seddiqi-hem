import React from "react";
import Image from "next/image";
import styles from "./displayCard.module.scss";
import { LatestsubTitle } from "@components/rendering/header/dummyData";
import { truncateString } from "@utils/helpers/truncateString";

interface DisplayCardProps {
  item?: LatestsubTitle;
}

const DEFAULT_IMAGE = "/images/png/watchImage_01.png";
const DEFAULT_TITLE = "Rolex";
const DEFAULT_SUBTITLE = "How to take care of your watch?";
const MAX_STRING_LENGTH = 49;

const DisplayCard: React.FC<DisplayCardProps> = ({ item }) => {
  const imageUrl = item?.image || DEFAULT_IMAGE;
  const title = item?.title
    ? truncateString(item.title, MAX_STRING_LENGTH)
    : DEFAULT_TITLE;
  const subtitle = item?.subTitle
    ? truncateString(item.subTitle, MAX_STRING_LENGTH)
    : DEFAULT_SUBTITLE;

  return (
    <div className={styles.displayCard}>
      <div className={styles.imgContainer}>
        <Image
          className={styles.storyImg}
          src={imageUrl}
          fill
          alt="Story image"
        />
      </div>
      <div className={styles.displayCardInfo}>
        <div className={styles.title}>{title}</div>
        <div className={styles.subTitle}>{subtitle}</div>
      </div>
    </div>
  );
};

export default DisplayCard;
