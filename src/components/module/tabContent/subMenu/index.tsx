import NavigationLink from "@components/module/navigationLink";
import React from "react";
import styles from "./../tabContent.module.scss";
import { generateUniqueId } from "@utils/helpers/uniqueId";

const SubMenu = ({ links, className = "" }) => {
  if (links?.length <= 0) {
    return null;
  }
  return (
    <div className={`${className} ${styles.subMenu}`}>
      {links?.map((item) => (
        <NavigationLink
          className={styles.menuLink}
          key={generateUniqueId()}
          title={item?.content?.commonProps?.item_title}
          arrow={item?.content?.commonProps?.isVisible}
          url="/"
        />
      ))}
    </div>
  );
};

export default SubMenu;
