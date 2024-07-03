import NavigationLink from "@components/module/navigationLink";
import React from "react";
import styles from "./../tabContent.module.scss";

const SubMenu = ({ links, className = "" }) => {
  return (
    <div className={`${className} ${styles.subMenu}`}>
      {links?.map((item) => (
        <NavigationLink
          className={styles.menuLink}
          key={item.name}
          title={item.name}
          arrow={item.expand}
          url="/"
        />
      ))}
    </div>
  );
};

export default SubMenu;
