import React from "react";
import styles from "./rolexTextBlock.module.scss";
import RichText from "@components/module/richText";
import { Typography } from "@components/module";

const RolexTextBlock = ({ ...content }) => {
  console.log("content", content);
  if(!content) return null;
  return (
    <div className={styles.banner}>
      <div className={styles.leftText}>
        <Typography variant="h1" className={styles.title}>
          {content?.title}
        </Typography>
      </div>
      <div className={styles.rightText}>
        <RichText align="" className={`${styles.headingSecondary}`} text={content?.description} />
      </div>
    </div>
  );
};

export default RolexTextBlock;
