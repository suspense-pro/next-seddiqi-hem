import React, { useContext, useState, useMemo } from "react";
import styles from "./../tabContent.module.scss";
import { HeaderContext } from "@contexts/headerContext";
import DisplayCard from "@components/module/cards/displayCard";
import MobileMenuLogobar from "@components/module/mobileMenuLogobar";
import Accordion from "@components/module/accordion";
import SubMenu from "@components/module/tabContent/subMenu";
import { generateUniqueId } from "@utils/helpers/uniqueId";

const TabContentProducts = () => {
  const { headerData } = useContext(HeaderContext);
  const [subMenu, setSubMenu] = useState(false);

  const isDropdown = (ind) => !headerData.children[ind];
  let products = headerData?.children.filter(
    (item) => item?.content?.type !== "Explore"
  );

  if (!products) return null;

  const renderAccordionContent = (ind) => {
    const getSubMenu = (position) => {
      const subMenuLinks = products[ind].children?.filter(
        (item) => item.content.menuPosition === position
      );

      return subMenuLinks && subMenuLinks.length > 0 ? (
        <SubMenu links={subMenuLinks} />
      ) : null;
    };

    const displayCards = headerData?.cardsData[ind]?.contentBlock?.displayCard;

    return (
      <React.Fragment>
        {getSubMenu("Left")}
        {getSubMenu("Right")}

        {displayCards && (
          <div className={styles.subMenu}>
            <div className={styles.displayCardsTitle}>THE LATEST</div>
            {displayCards?.map((item, ind) => (
              <DisplayCard item={item} key={generateUniqueId()} />
            ))}
          </div>
        )}
      </React.Fragment>
    );
  };

  const toLowerCase = (str) => {
    return str.toLowerCase();
  };

  return (
    <div className={styles.tabContent}>
      <div className={styles.mobileMenuLinks}>
        {products?.map((item, ind) => (
          <div
            key={generateUniqueId()}
            className={styles.mobileMenuNavigationContainer}
          >
            <Accordion
              showArrow={
                toLowerCase(item?.content?.commonProps?.item_title) !==
                  toLowerCase("Brands") && !isDropdown(ind)
              }
              subMenu={subMenu}
              setSubMenu={setSubMenu}
              item={{
                ...item,
                id: ind + 1,
                title: item?.content?.commonProps?.item_title,
              }}
              key={item?.id}
            >
              {!isDropdown(ind) && renderAccordionContent(ind)}
            </Accordion>
          </div>
        ))}
      </div>
      <MobileMenuLogobar />
    </div>
  );
};

export default TabContentProducts;
