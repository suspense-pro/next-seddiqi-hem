import React, { useContext } from "react";
import styles from "./../tabContent.module.scss";
import { HeaderContext } from "@contexts/headerContext";
import StoryCard from "@components/module/cards/storyCard";
import DisplayCard from "@components/module/cards/displayCard";
import ArticleCard from "@components/module/cards/articleCard";
import MobileMenuLogobar from "@components/module/mobileMenuLogobar";
import SubMenu from "@components/module/tabContent/subMenu";
import { generateUniqueId } from "@utils/helpers/uniqueId";

const TabContentExplore = () => {
  const { headerData } = useContext(HeaderContext);

  let products = headerData?.children.filter(
    (item) => item?.content?.type !== "Products"
  )[0];

  if (!products) return null;

  const displayCards = headerData?.cardsData[5]?.contentBlock?.displayCard;
  const articleCard = headerData?.cardsData[5]?.contentBlock;
  const storyCards = headerData?.cardsData[5]?.contentBlock?.storyCard;

  const renderCards = (title, CardComponent, cards) => {
    return (
      cards &&
      cards.length > 0 && (
        <>
          <div className={styles.displayCardsTitle}>{title}</div>
          {cards.map((item, index) => (
            <CardComponent key={generateUniqueId()} item={item} />
          ))}
        </>
      )
    );
  };

  const getSubMenu = (position) => {
    const subMenuLinks = products.children?.filter(
      (item) => item.content.menuPosition === position
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
            {getSubMenu("Left")}
            {getSubMenu("Right")}

            <div className={`${styles.padZero} ${styles.subMenu}`}>
              {renderCards("THE LATEST", StoryCard, storyCards)}
              {renderCards("THE LATEST", DisplayCard, displayCards)}
              {articleCard && (
                <React.Fragment>
                  <div className={styles.displayCardsTitle}>THE LATEST</div>
                  <ArticleCard key={articleCard.title} item={articleCard} />
                </React.Fragment>
              )}
            </div>
          </div>
        </div>
      </div>
      <MobileMenuLogobar />
    </div>
  );
};

export default TabContentExplore;
