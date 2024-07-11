import React from "react";
import Image from "next/image";
import styles from "./storyCard.module.scss";
import { CardInfoProps } from "@utils/models";
import Typography from "@components/module/typography";

const StoryCard: React.FC<CardInfoProps> = ({ item }) => {
  const image = item?.image?.image;
  const imageUrl = `https://${image?.defaultHost}/i/${image?.endpoint}/${image?.name}`;
  const altText = item?.image?.altText;
  const title = item?.title;
  const subtitle = item?.subTitle;

  if (!image || !title || !subtitle || !imageUrl) return null; 

  return (
    <div className={styles.storyCardContainer}>
      <div className={styles.imgContainer}>
        <Image src={imageUrl} alt={altText} fill className={styles.image} />
      </div>
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
