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
  let exploreItem = explore.children;

  if (!explore) return null;

  const contentBlock = explore.content.contentBlock;

  // const GetSubMenu = () => {
  //   const subMenuLinks = explore.children?.map(
  //     (item) => item
  //   );

  //   return subMenuLinks && subMenuLinks.length > 0 ? (
  //     <SubMenu links={subMenuLinks} className={styles.padZero} />
  //   ) : null;
  // };

  const GetSubMenu = () => {
    const subMenuLinks = explore.children;
    const subMenuLinksItem1 = subMenuLinks[0].content?.commonProps?.item_title;
    const subMenuLinksItem2 = subMenuLinks[1].content?.commonProps?.item_title;
    const subMenuLinksChildrenColumn1 = subMenuLinks[0].children;
    const subMenuLinksChildrenColumn2 = subMenuLinks[1].children;

    return subMenuLinks && subMenuLinks.length > 0 ? (
      <div style={{ marginBottom: "48px" }}>
        <div className={styles.label}>{subMenuLinksItem1}</div>
        <SubMenu links={subMenuLinksChildrenColumn1} />
        <div className={styles.label}>{subMenuLinksItem2}</div>
        <SubMenu links={subMenuLinksChildrenColumn2} />
      </div>
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
              {contentBlock &&
                contentBlock.map((card, i) => {
                  const CardComponent = ComponentMapping[card._meta.schema];
                  const title = card._meta.schema.includes("story")
                    ? "Other"
                    : card._meta.schema.includes("display")
                    ? "The Latest"
                    : "Latest Article";

                  return (
                    <CardSection
                      title={title}
                      Component={CardComponent}
                      cards={
                        card._meta.schema.includes("article")
                          ? card
                          : Object.values(card)[1]
                      }
                      containerStyle={styles.column1}
                      cardStyle={styles.cardStyle}
                      titleStyle={styles.displayCardsTitle}
                      key={generateUniqueId()}
                    />
                  );
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
