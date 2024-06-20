import { useContext } from "react";
import MenuLink from "../cards/menuLink/menuLink";
import styles from "./megaMenu.module.scss";
import { HeaderContext } from "@contexts/headerContext";

const MegaMenuLeft = () => {
  const headerContext = useContext(HeaderContext);
  const { current, updateCurrent, headerData } = headerContext;
  const currentHeaderData = headerData.sections[current];

  if (current === null) {
    return null;
  }

  return (
    <div className={styles.menuLeft}>
      <div className={styles.columnCategories}>
        {currentHeaderData.categories?.map((item) => (
          <MenuLink key={item.name} title={item.name} expand={item.expand} />
        ))}
      </div>
      <div className={styles.columnFilters}>
        {currentHeaderData.special_categories?.map((item) => (
          <MenuLink key={item.name} title={item.name} expand={item.expand} />
        ))}
      </div>
    </div>
  );
};

export default MegaMenuLeft;
