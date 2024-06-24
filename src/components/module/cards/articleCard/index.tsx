import React from "react";
import styles from "./articleCard.module.scss";
import Link from "next/link";
import { LatestsubTitle } from "@components/rendering/header/dummyData";
import { truncateString } from "@utils/helpers/truncateString";

interface ArticleCardProps {
  item?: LatestsubTitle;
}

const ArticleCard: React.FC<ArticleCardProps> = ({ item }) => {
  const articleCardstyles = {
    backgroundImage: `url(${
      item?.image ? item.image : "/images/png/watchImage_02.png"
    })`,
  };

  const title = "Horology for The Holidays";

  return (
    <div style={articleCardstyles} className={styles.articleCard}>
      <div className={styles.backgroundFade}>&nbsp;</div>
      <div className={styles.articleTitle}>
        {item?.title ? truncateString(item.title, 49) : title}
      </div>
      <Link href={"#"}>
        <span className={styles.articleBtn}>Read Article</span>
      </Link>
    </div>
  );
};

export default ArticleCard;
