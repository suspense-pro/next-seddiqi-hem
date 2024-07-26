import React, { useContext, useState, useMemo } from "react";
import styles from "./../tabContent.module.scss";
import { HeaderContext } from "@contexts/headerContext";
import DisplayCard from "@components/module/cards/displayCard";
import MobileMenuLogobar from "@components/module/mobileMenuLogobar";
import Accordion from "@components/module/accordion";
import SubMenu from "@components/module/tabContent/subMenu";
import { generateUniqueId } from "@utils/helpers/uniqueId";
import CardSection from "@components/module/cardSection";
import { ComponentMapping } from "@utils/cms/config";

const TabContentProducts = () => {
  const { headerData } = useContext(HeaderContext);
  const [subMenu, setSubMenu] = useState(false);

  const isDropdown = (ind) => headerData.children[ind].children.length > 0;
  
  let products = headerData?.children.filter(
    (item) => item?.content?.type !== "Explore"
  );

  if (!products) return null;

  const renderAccordionContent = (ind) => {

    const GetSubMenu = () => {
      const subMenuLinks = products[ind].children?.map(
        (item) => item
      );

      return subMenuLinks && subMenuLinks.length > 0 ? (
        <SubMenu links={subMenuLinks} />
      ) : null;
    };

    const contentBlock = headerData.children[ind]?.content?.contentBlock;

    return (
      <>
        <GetSubMenu />

        {contentBlock && contentBlock.map((card, i) => {

          const CardComponent = ComponentMapping[card._meta.schema];
          const title = card._meta.schema.includes("story") ? "Other" : card._meta.schema.includes("display") ? "The Latest" : "Latest Article";

          return <CardSection
            title={title}
            Component={CardComponent}
            cards={card._meta.schema.includes("article") ? card : Object.values(card)[1]}
            containerStyle={styles.column1}
            cardStyle={styles.subMenu}
            titleStyle={styles.displayCardsTitle}
          />

        })}

      </>
    );
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
                isDropdown(ind)
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
              {isDropdown(ind) && renderAccordionContent(ind)}
            </Accordion>
          </div>
        ))}
      </div>
      <MobileMenuLogobar />
    </div>
  );
};

export default TabContentProducts;
