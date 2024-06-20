import React from "react";
import styles from "./articleCard.module.scss";
import Link from "next/link";

const ArticleCard = () => {
  return (
    <div className={styles.articleCard}>
      <div className={styles.articleTitle}>Horology for The Holidays</div>
      <Link href={"#"}>
        <span className={styles.articleBtn}>Read Article</span>
      </Link>
    </div>
  );
};

export default ArticleCard;
