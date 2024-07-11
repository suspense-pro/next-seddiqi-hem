import React from "react";
import Image from "next/image";
import styles from "./displayCard.module.scss";
import { CardInfoProps } from "@utils/models";
import Typography from "@components/module/typography";

const DisplayCard: React.FC<CardInfoProps> = ({ item }) => {
  const image = item?.image?.image;
  const imageUrl = `https://${image?.defaultHost}/i/${image?.endpoint}/${image?.name}`;
  const altText = item?.image?.altText;
  const title = item?.title;
  const subtitle = item?.subTitle;

  if (!image || !title || !subtitle || !imageUrl) return null;

  return (
    <div className={styles.displayCard}>
      <div className={styles.imgContainer}>
        <Image className={styles.storyImg} src={imageUrl} fill alt={altText} />
      </div>
      <div className={styles.displayCardInfo}>
        <Typography align="left" variant="span" className={styles.title}>
          {title}
        </Typography>
        <div className={styles.subTitle}>{subtitle}</div>
      </div>
    </div>
  );
};

export default DisplayCard;
