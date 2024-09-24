import React from "react";
import styles from "./twoColumnArticleBlock.module.scss";
import Image from "@components/module/image";
import { Button, GradientOverlay, Typography } from "@components/module";
import RichText from "@components/module/richText";

const TwoColumnArticleBlock = ({ contentLeft, contentRight }) => {
  if (!contentLeft || !contentRight) return null;
  const renderColumn = (content) => {
    const opacity = content?.opacity?.opacity
    return (
      <div className={styles.column}>
        <GradientOverlay opacity={opacity}>
          <Image className={styles.image} image={content?.image?.image} imageAltText={content?.image?.altText} />
        </GradientOverlay>
        <div className={styles.articleInfo}>
          <Typography variant="h4" className={styles.headingPrimary}>
            {content?.heading}
          </Typography>
          <div className={styles.description}>
            <RichText align="" text={content?.description} />
          </div>
          <Button
            isLink={content?.cta?.isNewTab}
            link={content?.cta?.url}
            className={styles.btn}
            title={content?.cta?.label}
            color={content?.cta?.color}
            type={content?.cta?.type}
          />
        </div>
      </div>
    );
  };

  return (
    <div className={styles.container}>
      <div className={styles.containerColumns}>
        {renderColumn(contentLeft)}
        {renderColumn(contentRight)}
      </div>
    </div>
  );
};

export default TwoColumnArticleBlock;
