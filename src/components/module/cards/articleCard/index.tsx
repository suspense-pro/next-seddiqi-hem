import React from "react";
import Link from "next/link";
import styles from "./articleCard.module.scss";
import { CardInfoProps } from "@utils/models";

const DEFAULT_IMAGE = "/images/png/watchImage_02.png";
const DEFAULT_TITLE = "Horology for The Holidays";
const DEFAULT_BTN = "Read Article";

const ArticleCard: React.FC<CardInfoProps> = ({ item }) => {
  const image = item?.image?.image;
  if (!image) return null;
  const backgroundImage = `url(${
    `https://${image?.defaultHost}/i/${image?.endpoint}/${image?.name}` ||
    DEFAULT_IMAGE
  })`;

  const title = item?.title ? item.title : DEFAULT_TITLE;
  const linkBtn = item?.linkTitle ? item?.linkTitle : DEFAULT_BTN;

  return (
    <div className={styles.articleCard} style={{ backgroundImage }}>
      <div className={styles.backgroundFade} />
      <div className={styles.articleTitle}>{title}</div>
      <Link href="#" className={styles.articleBtn}>
        {linkBtn}
      </Link>
    </div>
  );
};

export default ArticleCard;
