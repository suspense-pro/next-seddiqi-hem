import { ArrowUp } from "@assets/images/svg";
import RolexIcon from "@assets/images/svg/RolexIcon";
import React from "react";
import styles from "./footerBackToTop.module.scss";

const FooterBackToTop = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className={styles.footerBackToTopContainer}>
      <RolexIcon className={styles.rolexIcon} />

      <div className={styles.backToTop}>
        <button className={styles.backToTopButton} onClick={scrollToTop}>
          <div className={styles.arrowIcon}>
            <ArrowUp fill={"white"} />
          </div>
          Back to top
        </button>
      </div>
    </div>
  );
};

export default FooterBackToTop;