import { useContext } from "react";
import styles from "./../tabContent.module.scss";
import { HeaderContext } from "@contexts/headerContext";
import StoryCard from "@components/module/cards/storyCard";
import DisplayCard from "@components/module/cards/displayCard";
import ArticleCard from "@components/module/cards/articleCard";
import MobileMenuLogobar from "@components/module/mobileMenuLogobar";
import SubMenu from "@components/module/tabContent/subMenu";

const TabContentExplore = () => {
  const { headerData } = useContext(HeaderContext);
  const { categories, special_categories } = headerData.sections[5];

  return (
    <div className={styles.tabContent}>
      <div className={styles.mobileMenuLinks}>
        <div className={styles.mobileMenuNavigationContainer}>
          <div
            className={`${styles.customContainer} ${styles.subMenuContainer}`}
          >
            <SubMenu links={categories} className={styles.padZero} />
            <SubMenu links={special_categories} className={styles.padZero} />

            <div className={`${styles.padZero} ${styles.subMenu}`}>
              {renderSection("THE LATEST", StoryCard, 3)}
              {renderSection("LATEST STORIES", DisplayCard, 2)}
              {renderSection("LATEST ARTICLE", ArticleCard, 1)}
            </div>
          </div>
        </div>
      </div>
      <MobileMenuLogobar />
    </div>
  );
};

const renderSection = (title, Component, count) => (
  <>
    <div className={styles.displayCardsTitle}>{title}</div>
    {[...Array(count)].map((_, index) => (
      <Component key={index} />
    ))}
  </>
);

export default TabContentExplore;
