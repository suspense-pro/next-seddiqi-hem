import { ContentHeader, Image, Video } from "@components/module";
import React from "react";
import styles from "./contentAndSingleImageColumn.module.scss";

const ContentAndSingleImageColumn = ({ ...content }) => {
  return (
    <div className={styles.container}>
      <ContentHeader
        mainTitle={content?.mainTitle}
        richText={content?.richText}
        hideUnderline={content?.hideUnderline}
      />
      {content?.media?.image ? (
        <Image height={styles.image} className={styles.image} image={content?.media?.image} />
      ) : (
        <Video className={styles.image} video={content?.media?.video} />
      )}
    </div>
  );
};

export default ContentAndSingleImageColumn;
