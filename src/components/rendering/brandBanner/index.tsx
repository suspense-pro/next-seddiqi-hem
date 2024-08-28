import React from "react";
import styles from "./brandBanner.module.scss";
import Typography from "../../module/typography";
import RichText from "../../module/richText";
import { Image } from "@components/module";
import { BrandBannerProps } from "@utils/models";
import BrandBannerIcon from "@assets/images/svg/BrandBannerIcon";

const BrandBanner: React.FC<BrandBannerProps> = ({
  mainTitle,
  media,
  richText,
}) => {
  return (
    <div className={styles.brandBannerContainer}>
      <div className={styles.brandBannerIcon}>
        <BrandBannerIcon />
      </div>
      <div className={styles.textContainer}>
        <div className={styles.innerContent}>
          <Typography variant="p" className={styles.title}>
            {mainTitle?.toUpperCase()}
          </Typography>
          <div className={styles.richTextContainer}>
            <RichText align="" text={richText} />
          </div>
        </div>
      </div>
      <div className={styles.imageContainer}>
        <Image image={media.image} imageAltText={media.altText} />
      </div>
    </div>
  );
};

export default BrandBanner;
