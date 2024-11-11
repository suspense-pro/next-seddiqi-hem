import React from "react";
import styles from "./contentAndImageTwoColumn.module.scss";
import { ContentAndImageTwoColumnProps } from "@utils/models/contentAndImageTwoColumn";
import { Typography } from "@components/module";
import RichText from "../../module/richText";
import { Image } from "@components/module";
import { BackgroundStyle } from "@utils/helpers/backgroundStyle";
import { Button } from "@components/module";

const ContentAndImageTwoColumn: React.FC<ContentAndImageTwoColumnProps> = ({
  leftColumn,
  rightColumn,
  reverse = false,
  backgroundColor,
  cta,
}) => {
  const { title = "", description = "" } = leftColumn || {};

  const { backgroundStyle } = BackgroundStyle({ backgroundColor }) || {};

  const hasCta = cta && cta.label && cta.type;

  return (
    <div className={`${styles.contentAndImageContainer} ${reverse ? styles.reversed : ""} ${backgroundStyle || ""}`}>
      <div className={styles.contentWrapper}>
        <div className={styles.leftContent}>
          {title && (
            <Typography variant="h2" className={styles.title}>
              {title}
            </Typography>
          )}
          {description && (
            <div className={styles.description}>
              <RichText text={description} className={styles.richTextStyle} />
            </div>
          )}
          {hasCta && (
            <div className={styles.ctaContainer}>
              <Button title={cta.label} type={cta.type} className={styles.ctaButton} />
            </div>
          )}
        </div>
        <div className={styles.rightContent}>
          {rightColumn?.image ? (
            <Image image={rightColumn?.image} imageAltText={""} />
          ) : (
            <div className={styles.noImage}>No Image Available</div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ContentAndImageTwoColumn;
