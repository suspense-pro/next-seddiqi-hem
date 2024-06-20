import React from "react";
import styles from "./displayCard.module.scss";
import Image from "next/image";

const StoryCard = () => {
  return (
    <div className={styles.displayCard}>
      <Image
        className={styles.storyImg}
        src={"/images/png/watchImage_01.png"}
        width={226}
        height={301}
        alt=""
      />
      <div className={styles.displayCardInfo}>
        <div className={styles.title}>ROLEX</div>
        <div className={styles.subTitle}>How to take care of your watch?</div>
      </div>
    </div>
  );
};

export default StoryCard;
