import React from "react";
import Link from "next/link";
import styles from "./articleCard.module.scss";
import { CardInfoProps } from "@utils/models";
import Typography from "@components/module/typography";

const ArticleCard: React.FC<CardInfoProps> = ({ item }) => {
  const image = item?.image?.image;
  const backgroundImage = `url(${`https://${image?.defaultHost}/i/${image?.endpoint}/${image?.name}`})`;

  const title = item?.title;
  const linkBtn = item?.linkTitle;
  if (!image || !title || !linkBtn || !backgroundImage) return null;

  return (
    <div className={styles.articleCard} style={{ backgroundImage }}>
      <div className={styles.backgroundFade} />
      <Typography align="left" variant="h3" className={styles.articleTitle}>
        {title}
      </Typography>
      <Link href="#" className={styles.articleBtn}>
        {linkBtn}
      </Link>
    </div>
  );
};

export default ArticleCard;
