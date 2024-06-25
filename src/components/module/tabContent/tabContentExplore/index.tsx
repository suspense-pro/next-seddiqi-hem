import { useContext } from "react";
import styles from "./../tabContent.module.scss";
import { HeaderContext } from "@contexts/headerContext";
import NavigationLink from "@components/module/navigationLink";
import StoryCard from "@components/module/cards/storyCard";
import DisplayCard from "@components/module/cards/displayCard";
import ArticleCard from "@components/module/cards/articleCard";
import MobileMenuLogobar from "@components/module/mobileMenuLogobar";
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
            <div className={`${styles.padZero} ${styles.subMenu}`}>
              {/* TEMP */}
              {headerData.sections[5].categories?.map((item) => (
                <NavigationLink
                  className={styles.menuLink}
                  key={item.name}
                  title={item.name}
                  arrow={item.expand}
                  url="/"
                />
              ))}
            </div>
            <div className={`${styles.padZero} ${styles.subMenu}`}>
              {headerData.sections[5].special_categories?.map((item) => (
                <NavigationLink
                  className={styles.menuLink}
                  key={item.name}
                  title={item.name}
                  arrow={item.expand}
                  url="/"
                />
              ))}
            </div>
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
