import { useDeviceWidth } from "@utils/useCustomHooks";
import React from "react";
import styles from "./gridWrapper.module.scss";

const GridWrapper = ({ cols, children }) => {
  const isDesktop = useDeviceWidth()[0];
  return (
    <div
      className={styles.container}
      style={{
        display: "grid",
        gridTemplateColumns: isDesktop
          ? `repeat(${cols}, 1fr)`
          : "repeat(auto-fit, 1fr)",
      }}
    >
      {children && children}
    </div>
  );
};

export default GridWrapper;
