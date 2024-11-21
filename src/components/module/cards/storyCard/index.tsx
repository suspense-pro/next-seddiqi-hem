import React, { useContext } from "react";
import Image from "@components/module/image";
import styles from "./storyCard.module.scss";
import { CardInfoProps } from "@utils/models";
import Typography from "@components/module/typography";
import Link from "next/link";
import { HeaderContext } from "@contexts/headerContext";

const StoryCard: React.FC<CardInfoProps> = ({ item, className }) => {
  const image = item?.media?.image || item?.image?.image;
  const altText = item?.media?.altText || item?.image?.altText;
  const title = item?.title;
  const subtitle = item?.subTitle;
  const link = item?.link ? item?.link : "/";

  if (!image || !title) return null;
  const headerContext = useContext(HeaderContext);
  const { setMenuOpen, updateCurrent } = headerContext;

  return (
    <div
      onClick={(e) => {
        setMenuOpen(false);
        updateCurrent(null);
      }}
      className={`${styles.storyCardContainer} ${className}`}
    >
      <Link
        onClick={(e) => {
          setMenuOpen(false);
          updateCurrent(null);
        }}
        href={link}
      >
        <Image className={styles.image} image={image} imageAltText={altText} />
        <div className={styles.content}>
          {title && (
            <Typography align="left" variant="span" className={styles.title}>
              {title}
            </Typography>
          )}
          {subtitle && <div className={styles.subtitle}>{subtitle}</div>}
        </div>
      </Link>
    </div>
  );
};

export default StoryCard;
