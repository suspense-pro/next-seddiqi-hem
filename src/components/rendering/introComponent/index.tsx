import React from "react";
import IntroComponentDesktop from "./introComponentDesktop";
import IntroComponentMobile from "./IntroComponentMobile";
import styles from "./introComponent.module.scss";

const IntroComponent = ({...content}) => {
  console.log("INTRO COMPONENT", content)
  return (
    <>
      <div className={styles.introContainerDesk}>
        <IntroComponentDesktop content={content} />
      </div>
      <div className={styles.introContainerMobile}>
        <IntroComponentMobile content={content} />
      </div>
    </>
  );
};

export default IntroComponent;
