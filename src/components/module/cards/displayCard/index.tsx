import React from "react";
import Image from "@components/module/image";
import styles from "./displayCard.module.scss";
import { CardInfoProps } from "@utils/models";
import Typography from "@components/module/typography";

const DisplayCard: React.FC<CardInfoProps> = ({ item }) => {
  if(!item) return null
  const image = item?.image?.image;
  const title = item?.title;
  const subtitle = item?.subTitle;

  if (!image || !title || !subtitle ) return null;

  return (
    <div className={styles.displayCard}>
      <div className={styles.imgContainer}>
        <Image className={styles.storyImg} image={image} imageAltText={item?.image?.altText} />
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
