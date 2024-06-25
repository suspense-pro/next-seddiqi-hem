import { useContext } from "react";
import styles from "./../tabContent.module.scss";
import { HeaderContext } from "@contexts/headerContext";
import StoryCard from "@components/module/cards/storyCard";
import DisplayCard from "@components/module/cards/displayCard";
import ArticleCard from "@components/module/cards/articleCard";
import MobileMenuLogobar from "@components/module/mobileMenuLogobar";
import SubMenu from "@components/module/tabContent/subMenu";

const TabContentExplore = () => {
  const headerContext = useContext(HeaderContext);
  const { headerData } = headerContext;

  return (
    <div className={styles.tabContent}>
      <div className={styles.mobileMenuLinks}>
        <div className={styles.mobileMenuNavigationContainer}>
          <div
            className={`${styles.customContainer} ${styles.subMenuContainer}`}
          >
            <SubMenu
              links={headerData.sections[5].categories}
              className={styles.padZero}
            />
            <SubMenu
              links={headerData.sections[5].special_categories}
              className={styles.padZero}
            />

            <div className={`${styles.padZero} ${styles.subMenu}`}>
              <div className={styles.displayCardsTitle}>THE LATEST</div>
              <StoryCard />
              <StoryCard />
              <StoryCard />
              <div className={styles.displayCardsTitle}>LATEST STORIES</div>
              <DisplayCard />
              <DisplayCard />
              <div className={styles.displayCardsTitle}>LATEST ARTICLE</div>
              <ArticleCard />
            </div>
          </div>
        </div>
      </div>
      <MobileMenuLogobar />
    </div>
  );
};

export default TabContentExplore;
