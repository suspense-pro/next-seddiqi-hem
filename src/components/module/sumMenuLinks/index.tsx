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

  const renderLinks = (links) => {
    return links?.map(({ content }) => {
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

  const columnOne = currentHeaderData[0]?.content?.commonProps?.item_title;
  const columnTwo = currentHeaderData[1]?.content?.commonProps?.item_title;

  return (
    <div className={styles.menuLeft}>
      <div className={styles.columnCategories}>
        <div className={styles.label}>{columnOne}</div>
        {renderLinks(currentHeaderData[0]?.children)}
      </div>
      <div className={styles.columnFilters}>
        <div className={styles.label}>{columnTwo}</div>
        {renderLinks(currentHeaderData[1]?.children)}
      </div>
    </div>
  );
};

export default SubMenuLinks;
