import React from "react";
import Image from "@components/module/image";
import styles from "./storyCard.module.scss";
import { CardInfoProps } from "@utils/models";
import Typography from "@components/module/typography";

const StoryCard: React.FC<CardInfoProps> = ({ item }) => {
  const image = item?.image?.image;
  const altText = item?.image?.altText;
  const title = item?.title;
  const subtitle = item?.subTitle;

  if (!image || !title || !subtitle) return null; 

  return (
    <div className={styles.storyCardContainer}>
        <Image className={styles.image} image={image} imageAltText={altText} />
      <div className={styles.content}>
        <Typography align="left" variant="span" className={styles.title}>
          {title}
        </Typography>
        <div className={styles.subtitle}>{subtitle}</div>
      </div>
    </div>
  );
};

export default StoryCard;
