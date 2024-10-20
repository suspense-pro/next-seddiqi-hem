import React, { CSSProperties } from "react";
import styles from "./spacing.module.scss";
import PropTypes from "prop-types";

const Spacing = ({ desktopHeight, mobileHeight }) => {
  const spacerStyle: CSSProperties & { [key: string]: string } = {
    "--desktop-height": `${desktopHeight}px`,
    "--mobile-height": `${mobileHeight}px`,
  };

  return <div className={styles.spacing} style={spacerStyle}></div>;
};

Spacing.propTypes = {
  desktopHeight: PropTypes.number.isRequired,
  mobileHeight: PropTypes.number.isRequired,
};

export default Spacing;
