import React from "react";
import IntroComponentDesktop from "./introComponentDesktop";
import IntroComponentMobile from "./IntroComponentMobile";
import styles from "./introComponent.module.scss";

const IntroComponent = () => {
  
  return (
    <>
      <div className={styles.introContainerDesk}>
        <IntroComponentDesktop />
      </div>
      <div className={styles.introContainerMobile}>
        <IntroComponentMobile />
      </div>
    </>
  );
};

export default IntroComponent;
