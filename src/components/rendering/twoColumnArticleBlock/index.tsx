import React from "react";
import styles from "./twoColumnArticleBlock.module.scss";
// import Image from "next/image";
import Image from "@components/module/image";
import { Button, Typography } from "@components/module";
import RichText from "@components/module/richText";

const TwoColumnArticleBlock = ({ contentLeft, contentRight }) => {
  if (!contentLeft || !contentRight) return null;
  // console.log("content", contentLeft)
  const renderColumn = (content) => {
    return (
      <div className={styles.column}>
        <Image
          className={styles.image}
          image={content?.image?.image}
          imageAltText={content?.image?.altText}
          // query={"h=636"}
        />
        <div className={styles.articleInfo}>
          <Typography variant="h4" className={styles.headingPrimary}>
            {content?.heading}
          </Typography>
          <div className={styles.description}>
            <RichText
              align=""
              text={content?.description}
            />
          </div>
          <Button
            isLink={content?.cta?.isNewTab}
            link={content?.cta?.url}
            className={styles.btn}
            title={content?.cta?.label}
            color="dark_green"
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
