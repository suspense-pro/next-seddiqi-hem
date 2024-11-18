import React from "react";
import Image from "@components/module/image";
import styles from "./storyCard.module.scss";
import { CardInfoProps } from "@utils/models";
import Typography from "@components/module/typography";
import Link from "next/link";

const StoryCard: React.FC<CardInfoProps> = ({ item, className }) => {
  const image = item?.media?.image || item?.image?.image;
  const altText = item?.media?.altText || item?.image?.altText;
  const title = item?.title;
  const subtitle = item?.subTitle;
  const link = item?.link ? item?.link : "/";

  if (!image || !title || !subtitle) return null;

  return (
    <Link href={link}>
      <div className={`${styles.storyCardContainer} ${className}`}>
        <Image className={styles.image} image={image} imageAltText={altText} />
        <div className={styles.content}>
          <Typography align="left" variant="span" className={styles.title}>
            {title}
          </Typography>
          <div className={styles.subtitle}>{subtitle}</div>
        </div>
      </div>
    </Link>
  );
};

export default StoryCard;
