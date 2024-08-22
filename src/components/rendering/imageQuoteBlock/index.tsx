import React from "react";
import styles from "./imageQuoteBlock.module.scss";
import Typography from "../../module/typography";
import RichText from "../../module/richText";
import { Image } from "@components/module";
import { ImageQuoteBlockProps } from "@utils/models";

const ImageQuoteBlock: React.FC<ImageQuoteBlockProps> = ({
  image,
  logoIcon,
  nameDesignation,
  nameSource,
  richText,
}) => {
  return (
    <div className={styles.imageQuoteBlockContainer}>
      <div className={styles.imageContainer}>
        {image && <Image image={image.image} imageAltText={image.altText} />}
      </div>
      <div className={styles.quoteContentContainer}>
        <div className={styles.logo}>
          {logoIcon && logoIcon.image ? (
            <Image
              image={logoIcon.image.image}
              imageAltText={logoIcon.image.altText}
            />
          ) : (
            <div className={styles.logoPlaceholder}></div>
          )}
        </div>
        <div className={styles.richTextContainer}>
          <div className={styles.richText}>
            <RichText align="center" text={richText} />
          </div>
        </div>
        <Typography variant="h5" className={styles.nameSource}>
          {nameSource}
        </Typography>

        <Typography variant="p" className={styles.nameDesignation}>
          {nameDesignation}
        </Typography>
      </div>
    </div>
  );
};

export default ImageQuoteBlock;
