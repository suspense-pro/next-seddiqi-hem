import React from "react";
import styles from "./sectionHeader.module.scss";

import Typography from "../typography";
import RichText from "../richText";

const SectionHeader = ({ titleColor, subTitleColor, barColor, mainTitle, hideUnderline, richText }) => {
  return (
    <div className={styles.containerHeader}>
      <Typography variant="h2" className={`${titleColor} ${styles.headingPrimary}`}>
        {mainTitle}
      </Typography>
      {!hideUnderline && <div className={`${barColor} ${styles.bar}`}>&nbsp;</div>}
      <div className={`${subTitleColor} ${styles.headingSecondary}`}>
        <RichText align="" className={`${subTitleColor} ${styles.headingSecondary}`} text={richText} />
      </div>
    </div>
  );
};

export default SectionHeader;
