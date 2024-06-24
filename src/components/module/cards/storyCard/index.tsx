import React from "react";
import styles from "./storyCard.module.scss";
import Image from "next/image";
import { LatestsubTitle } from "@components/rendering/header/dummyData";
import { truncateString } from "@utils/helpers/truncateString";

interface StoryCardProps {
  item?: LatestsubTitle;
}

const tempImg = "/images/png/watchImage_02.png";
const tempTitle = "Seddiqi Jewellery Show: Where Nature and Luxur...";
const temPSubTitle = "The world of watchmaking came to Geneva.";

const StoryCard: React.FC<StoryCardProps> = ({ item }) => {
  return (
    <div className={styles.storyCardContainer}>
      <div className={styles.imgContainer}>
        <Image
          src={item?.image ? item.image : tempImg}
          alt="Watch Image"
          fill
          className={styles.image}
        />
      </div>
      <div className={styles.content}>
        <div className={styles.title}>
          {item?.title ? truncateString(item.title, 49) : tempTitle}
        </div>
        <div className={styles.subtitle}>
          {item?.subTitle ? truncateString(item.subTitle, 49) : temPSubTitle}
        </div>
      </div>
    </div>
  );
};

export default StoryCard;
