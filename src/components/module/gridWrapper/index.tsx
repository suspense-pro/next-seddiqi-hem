import { useDeviceWidth } from "@utils/useCustomHooks";
import React from "react";
import styles from "./gridWrapper.module.scss";

const GridWrapper = ({ cols, children }) => {
  const isDesktop = useDeviceWidth()[0];

  console.log("isMobile", isDesktop);

  return (
    <div
      className={styles.container}
      style={{
        display: "grid",
        gridTemplateColumns: `repeat(${cols}, minmax("348px", 1fr))`,
      }}
    >
      {children && children}
    </div>
  );
};

export default GridWrapper;
