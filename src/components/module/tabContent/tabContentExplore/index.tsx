import React, { useContext } from "react";
import styles from "./../tabContent.module.scss";
import { HeaderContext } from "@contexts/headerContext";
import StoryCard from "@components/module/cards/storyCard";
import DisplayCard from "@components/module/cards/displayCard";
import ArticleCard from "@components/module/cards/articleCard";
import MobileMenuLogobar from "@components/module/mobileMenuLogobar";
import SubMenu from "@components/module/tabContent/subMenu";
import { generateUniqueId } from "@utils/helpers/uniqueId";
import { ComponentMapping } from "@utils/cms/config";
import CardSection from "@components/module/cardSection";

const TabContentExplore = () => {
  const { headerData } = useContext(HeaderContext);

  let explore = headerData?.children.filter(
    (item) => item?.content?.type !== "Products"
  )[0];

  if (!explore) return null;

  const contentBlock = explore.content.contentBlock;

  const GetSubMenu = () => {
    const subMenuLinks = explore.children?.map(
      (item) => item
    );

    return subMenuLinks && subMenuLinks.length > 0 ? (
      <SubMenu links={subMenuLinks} className={styles.padZero} />
    ) : null;
  };

  return (
    <div className={styles.tabContent}>
      <div className={styles.mobileMenuLinks}>
        <div className={styles.mobileMenuNavigationContainer}>
          <div
            className={`${styles.customContainer} ${styles.subMenuContainer}`}
          >
            <GetSubMenu />

            <div className={`${styles.padZero} ${styles.subMenu}`}>

              {contentBlock && contentBlock.map((card, i) => {

                const CardComponent = ComponentMapping[card._meta.schema];
                const title = card._meta.schema.includes("story") ? "Other" : card._meta.schema.includes("display") ? "The Latest" : "Latest Article";
    
                return <CardSection
                    title={title}
                    Component={CardComponent}
                    cards={card._meta.schema.includes("article") ? card : Object.values(card)[1]}
                    containerStyle={styles.column1}
                    cardStyle={styles.cardStyle}
                    titleStyle={styles.displayCardsTitle}
                    key={generateUniqueId()}
                  />

              })}
            </div>
          </div>
        </div>
      </div>
      <MobileMenuLogobar />
    </div>
  );
};

export default TabContentExplore;
