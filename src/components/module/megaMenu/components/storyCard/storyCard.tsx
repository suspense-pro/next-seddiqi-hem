import React from "react";
import styles from "./storyCard.module.scss";
import Image from "next/image";

const StoryCard = () => {
  return (
    <div className={styles.storyCardContainer}>
      <Image
        src="/images/png/watchImage_02.png"
        alt="Watch Image"
        width={160}
        height={109}
        className={styles.image}
      />
      <div className={styles.content}>
        <div className={styles.title}>
          Seddiqi Jewellery Show: Where Nature and Luxur...
        </div>
        <div className={styles.subtitle}>
          The world of watchmaking came to Geneva.
        </div>
      </div>
    </div>
  );
};

export default StoryCard;
