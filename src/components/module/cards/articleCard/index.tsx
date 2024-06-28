import React from "react";
import Link from "next/link";
import styles from "./articleCard.module.scss";
import { LatestsubTitle } from "@components/rendering/header/dummyData";
import { truncateString } from "@utils/helpers/truncateString";

interface ArticleCardProps {
  item?: LatestsubTitle;
}

const DEFAULT_IMAGE = "/images/png/watchImage_02.png";
const DEFAULT_TITLE = "Horology for The Holidays";
const MAX_TITLE_LENGTH = 49;

const ArticleCard: React.FC<ArticleCardProps> = ({ item }) => {
  const backgroundImage = `url(${item?.image || DEFAULT_IMAGE})`;
  const title = item?.title
    ? truncateString(item.title, MAX_TITLE_LENGTH)
    : DEFAULT_TITLE;

  return (
    <div className={styles.articleCard} style={{ backgroundImage }}>
      <div className={styles.backgroundFade} />
      <div className={styles.articleTitle}>{title}</div>
      <Link href="#" className={styles.articleBtn}>
        Read Article
      </Link>
    </div>
  );
};

export default ArticleCard;
