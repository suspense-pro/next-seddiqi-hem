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
  const link = item?.link ? item?.link : "/";
  if (!backgroundImage) return null;
  if (!image && !title && !linkBtn && !backgroundImage) return null;

  return (
    <Link href={link}>
      <div className={styles.articleCard} style={{ backgroundImage }}>
        <div className={styles.backgroundFade} />
        {title && (
          <Typography align="left" variant="h3" className={styles.articleTitle}>
            {title}
          </Typography>
        )}

        {linkBtn && (
          <Link href="#" className={styles.articleBtn}>
            {linkBtn}
          </Link>
        )}
      </div>
    </Link>
  );
};

export default ArticleCard;
