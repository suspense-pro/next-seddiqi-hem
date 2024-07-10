import { HeaderContext } from "@contexts/headerContext";
import { useContext } from "react";
import styles from "./subMenuLinks.module.scss";
import NavigationLink from "../navigationLink";
import { generateUniqueId } from "@utils/helpers/uniqueId";

const SubMenuLinks = () => {
  const headerContext = useContext(HeaderContext);
  const { current, headerData } = headerContext;
  const currentHeaderData = headerData?.children[current]?.children;

  if (current === null || !currentHeaderData) {
    return null;
  }

  const renderLinks = (position) => {
    return currentHeaderData
      ?.filter((item) => item?.content?.menuPosition === position)
      ?.map(({ content }) => {
        const { item_title, isVisible } = content?.commonProps || {};
        return (
          <NavigationLink
            className={styles.menuLink}
            key={generateUniqueId()}
            title={item_title}
            arrow={isVisible}
            url="/"
          />
        );
      });
  };

  return (
    <div className={styles.menuLeft}>
      <div className={styles.columnCategories}>{renderLinks("Left")}</div>
      <div className={styles.columnFilters}>{renderLinks("Right")}</div>
    </div>
  );
};

export default SubMenuLinks;
