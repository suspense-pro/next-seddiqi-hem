import React from "react";
import styles from "./articleCard.module.scss";
import Image from "next/image";
import Link from "next/link";

const ArticleCard = () => {
  return (
    <div className={styles.articleCard}>
      {/* <Image
        alt="imag"
        src={"/images/png/watchImage_02.png"}
        width={473}
        height={315}
      /> */}
      <div className={styles.articleTitle}>Horology for The Holidays</div>
      <Link href={"#"}>
        <span className={styles.articleBtn}>Read Article</span>
      </Link>
    </div>
  );
};

export default ArticleCard;
