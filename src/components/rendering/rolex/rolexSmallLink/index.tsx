import GreenArrowSmall from "@assets/images/svg/GreenArrowSmall";
import React from "react";
import styles from "./rolexSmallLink.module.scss";

const RolexSmallLink = ({href, className, linkText}) => {
  return (
    <a href={href} className={`${styles.rolexLink} ${className}`}>
      <span>{linkText}</span> <GreenArrowSmall />
    </a>
  );
};

export default RolexSmallLink;
