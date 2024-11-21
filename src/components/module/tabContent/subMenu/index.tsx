import NavigationLink from "@components/module/navigationLink";
import React, { useContext } from "react";
import styles from "./../tabContent.module.scss";
import { generateUniqueId } from "@utils/helpers/uniqueId";
import { HeaderContext } from "@contexts/headerContext";

const SubMenu = ({ links, className = "" }) => {
  if (links?.length <= 0) {
    return null;
  }
  const { setMenuOpen } = useContext(HeaderContext);

  return (
    <div className={`${className} ${styles.subMenu}`}>
      {links?.map((item) => (
        <div onClick={() => setMenuOpen(false)}>
          <NavigationLink
            className={styles.menuLink}
            key={generateUniqueId()}
            title={item?.content?.commonProps?.item_title}
            arrow={item?.content?.commonProps?.isVisible}
            url={item?.content?.commonProps?.url}
          />
        </div>
      ))}
    </div>
  );
};

export default SubMenu;
