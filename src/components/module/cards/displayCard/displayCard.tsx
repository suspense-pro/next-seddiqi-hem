import React from "react";
import styles from "./displayCard.module.scss";
import Image from "next/image";
import { LatestsubTitle } from "@components/rendering/header/dummyData";
import { truncateString } from "@utils/helpers/truncateString";

interface DisplayCardProps {
  item?: LatestsubTitle;
}

// TEMP
const tempImg = "/images/png/watchImage_01.png";
const tempTitle = "Rolex";
const temPSubTitle = "How to take care of your watch?";

const DisplayCard: React.FC<DisplayCardProps> = ({ item }) => {
  return (
    <div className={styles.displayCard}>
      <Image
        className={styles.storyImg}
        src={item?.image ? item.image : tempImg}
        width={226}
        height={301}
        alt=""
      />
      <div className={styles.displayCardInfo}>
        <div className={styles.title}>
          {item?.title ? truncateString(item.title, 49) : tempTitle}
        </div>
        <div className={styles.subTitle}>
          {item?.subTitle ? truncateString(item.subTitle, 49) : temPSubTitle}
        </div>
      </div>
    </div>
  );
};

export default DisplayCard;
