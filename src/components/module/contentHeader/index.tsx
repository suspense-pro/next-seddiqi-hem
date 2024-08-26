import React from "react";
import styles from "./contentHeader.module.scss";

import Typography from "../typography";
import RichText from "../richText";
import { ContentHeaderProps } from "@utils/models";

const ContentHeader: React.FC<ContentHeaderProps> = ({
  titleColor = "",
  subTitleColor = "",
  barColor = "",
  mainTitle = "",
  hideUnderline = true,
  richText = "",
}) => {
  return (
    <div className={styles.containerHeader}>
      {mainTitle && (
        <Typography variant="h2" className={`${titleColor} ${styles.headingPrimary}`}>
          {mainTitle}
        </Typography>
      )}
      {!hideUnderline && (
        <div className={`${barColor} ${styles.bar}`}>&nbsp;</div>
      )}
      {richText && (
        <div className={`${subTitleColor} ${styles.headingSecondary}`}>
          <RichText align="" className={`${subTitleColor} ${styles.headingSecondary}`} text={richText} />
        </div>
      )}
    </div>
  );
};

export default ContentHeader;
