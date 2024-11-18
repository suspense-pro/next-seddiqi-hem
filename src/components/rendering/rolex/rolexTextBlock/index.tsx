import React from "react";
import styles from "./rolexTextBlock.module.scss";
import RichText from "@components/module/richText";
import { Typography } from "@components/module";

const RolexTextBlock = ({ ...content }) => {
  if (!content) return null;

  if (content?.type?.toLowerCase() === "rolex") {
    return (
      <div className={styles.banner}>
        <div className={styles.bannerContainer}>
          {content?.title && (
            <div className={styles.leftText}>
              <Typography variant="h1" className={styles.title}>
                {content?.title}
              </Typography>
            </div>
          )}
          {content?.description && (
            <div className={styles.rightText}>
              <RichText align="" className={`${styles.headingSecondary}`} text={content?.description} />
            </div>
          )}
        </div>
      </div>
    );
  } else {
    return (
      <div className={styles.bannerCpo}>
        <div className={styles.bannerContainerCpo}>
          {content?.label && <div className={styles.label}>{content?.label}</div>}
          {content?.title && (
            <div className={styles.leftText}>
              <Typography variant="h1" className={styles.title}>
                {content?.title}
              </Typography>
            </div>
          )}

          {content?.description && (
            <div className={styles.rightText}>
              <RichText align="" className={`${styles.headingSecondary}`} text={content?.description} />
            </div>
          )}
        </div>
      </div>
    );
  }
};

export default RolexTextBlock;
