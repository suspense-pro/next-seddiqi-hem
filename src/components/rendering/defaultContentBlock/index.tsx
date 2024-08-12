import React from "react";
import styles from "./defaultContentBlock.module.scss";
import { Button, Typography } from "@components/module";
import RichText from "@components/module/richText";


const DefaultContentBlock = ({ ...content }) => {
  if(!content) return null
  const { cta } = content;
  return (
    <div className={styles.container}>
      <div className={styles.containerHeader}>
        {content?.mainTitle && (
          <>
            <Typography variant="h2" className={styles.headingPrimary}>
              {content?.mainTitle}
            </Typography>
            {!content?.hideUnderline && <div className={styles.bar}>&nbsp;</div>}
          </>
        )}
        <div className={`${!content?.mainTitle && styles.highlightedText} ${styles.headingSecondary}`}>
          <RichText align="" className={styles.desc} text={content?.richText} />
        </div>
      </div>
      <Button
        isLink={true}
        link={cta?.url}
        className={styles.aboutBtn}
        title={cta?.label}
        color={cta?.color}
        type={cta?.type}
      />
    </div>
  );
};

export default DefaultContentBlock;
