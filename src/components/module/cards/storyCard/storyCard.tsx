import React from "react";
import styles from "./storyCard.module.scss";
import Image from "next/image";
import { LatestsubTitle } from "@components/rendering/header/dummyData";

interface StoryCardProps {
  item?: LatestsubTitle;
}

const StoryCard: React.FC<StoryCardProps> = ({ item }) => {
  return (
    <div className={styles.storyCardContainer}>
      <Image
        src={item?.image ? item.image : "/images/png/watchImage_02.png"}
        alt="Watch Image"
        width={160}
        height={109}
        className={styles.image}
      />
      <div className={styles.content}>
        <div className={styles.title}>
          {item?.title
            ? item.title
            : "Seddiqi Jewellery Show: Where Nature and Luxur..."}
        </div>
        <div className={styles.subtitle}>
          {item?.subTitle
            ? item.subTitle
            : "The world of watchmaking came to Geneva."}
        </div>
      </div>
    </div>
  );
};

export default StoryCard;
