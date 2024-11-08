import React, { Component, useCallback, useRef, useState } from "react";
import styles from "./contentAndImageTwoColumn.module.scss";
import { ContentAndImageTwoColumnProps } from "@utils/models/contentAndImageTwoColumn";
import { Typography } from "@components/module";
import RichText from "../../module/richText";
import { Image } from "@components/module";
import { BackgroundStyle } from "@utils/helpers/backgroundStyle";
import { Button } from "@components/module";

const ContentAndImageTwoColumn: React.FC<ContentAndImageTwoColumnProps> = (
  content
) => {
  const { leftColumn, rightColumn, reverse, backgroundColor, cta } = content;
  const { title, description } = leftColumn;
  const image = rightColumn.image;
  const { backgroundStyle } = BackgroundStyle({ backgroundColor });

  return (
    <div
      className={`${styles.contentAndImageContainer} ${
        reverse ? styles.reversed : ""
      } ${backgroundStyle}`}
    >
      <div className={styles.contentWrapper}>
        <div className={styles.leftContent}>
          <Typography variant="h2" className={styles.title}>
            {title}
          </Typography>
          <div className={styles.description}>
            <RichText text={description}  className={styles.richTextStyle}/>
          </div>
          {cta && (
            <div className={styles.ctaContainer}>
              <Button
                title={cta?.label}
                type={cta?.type}
                className={styles.ctaButton}
              />
            </div>
          )}
        </div>
        <div className={styles.rightContent}>
          <Image image={image} imageAltText={""} />
        </div>
      </div>
    </div>
  );
};

export default ContentAndImageTwoColumn;
