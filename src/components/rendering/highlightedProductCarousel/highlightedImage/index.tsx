import { Image } from "@components/module";
import React from "react";

import styles from "./highlightedImage.module.scss";

const HighlightedImage = ({ media }) => {
  return <Image className={styles.leftImage} image={media?.image} imageAltText={media?.altText} />;
};

export default HighlightedImage;
