import React, { useContext, useState } from "react";
import styles from "./tabbedNavigation.module.scss";
import ArrowRight from "@assets/images/svg/ArrowRight";
import { ArrowDown } from "@assets/images/svg";
import Image from "next/image";
import NavigationLink from "@components/module/navigationLink";
import DisplayCard from "../cards/displayCard/displayCard";
import { headerDummyData } from "./../desktopHeader/headerDummyData";
import { HeaderContext } from "@contexts/headerContext";
import StoryCard from "../cards/storyCard/storyCard";
import ArticleCard from "../cards/articleCard/articleCard";

export const MobileMenuLogobar = () => {
  return (
    <div className={styles.bottom}>
      <div className={styles.appointmentBtn}>BOOK APPOINTMENT</div>
      <div className={styles.recommendContainer}>
        <div className={styles.recommendText}>Recommended for you</div>
        <div className={styles.logos}>
          <Image
            key={"i"}
            src={"/images/png/PatekLogo.png"}
            width={82}
            height={48}
            alt={"/"}
            className={styles.image}
          />
          <Image
            key={"i"}
            src={"/images/png/RolexLogo.png"}
            width={104}
            height={48}
            alt={"/"}
            className={styles.image}
          />
        </div>
      </div>
    </div>
  );
};

export const TabContentProducts = () => {
  const headerContext = useContext(HeaderContext);
  const { current, updateCurrent, headerData } = headerContext;
  const currentHeaderData = headerData.sections[current];

  // if (current === null) {
  //   return null;
  // }

  return (
    <div className={styles.tabContent}>
      <div className={styles.mobileMenuLinks}>
        {headerDummyData.navigation?.map((link, ind) => (
          <div className={styles.mobileMenuNavigationContainer}>
            <div className={styles.mobileMenuNavigation}>
              <NavigationLink
                className={styles.headerLink}
                key={link.title}
                title={link.title}
              />
              <ArrowDown />
            </div>

            <div className={styles.subMenuContainer}>
              <div className={styles.subMenu}>
                {headerData.sections[ind].categories?.map((item) => (
                  <NavigationLink
                    className={styles.menuLink}
                    key={item.name}
                    title={item.name}
                    arrow={item.expand}
                    url="/"
                  />
                ))}
              </div>
              <div className={styles.subMenu}>
                {headerData.sections[ind].special_categories?.map((item) => (
                  <NavigationLink
                    className={styles.menuLink}
                    key={item.name}
                    title={item.name}
                    arrow={item.expand}
                    url="/"
                  />
                ))}
              </div>
              <div className={styles.subMenu}>
                <div className={styles.displayCardsTitle}>THE LATEST</div>
                <DisplayCard />
                <DisplayCard />
              </div>
            </div>
          </div>
        ))}
      </div>
      <MobileMenuLogobar />
    </div>
  );
};
export const TabContentExplore = () => {
  const headerContext = useContext(HeaderContext);
  const { current, updateCurrent, headerData } = headerContext;
  const currentHeaderData = headerData.sections[current];

  // if (current === null) {
  //   return null;
  // }

  // const subMenuStyle = {
  //   padding,
  // };

  return (
    <div className={styles.tabContent}>
      <div className={styles.mobileMenuLinks}>
        <div className={styles.mobileMenuNavigationContainer}>
          <div style={{ height: "100%" }} className={styles.subMenuContainer}>
            <div className={styles.subMenu}>
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
            <div className={styles.subMenu}>
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
            <div className={styles.subMenu}>
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

const tabs = [
  {
    id: 1,
    label: "PRODUCTS",
    content: <TabContentProducts />,
  },
  {
    id: 2,
    label: "EXPLORE",
    content: <TabContentExplore />,
  },
];
const TabbedNavigation = () => {
  const [activeTab, setActiveTab] = useState(1);

  const handleTabClick = (id) => {
    setActiveTab(id);
  };

  return (
    <div className={styles.tabsContainer}>
      <div className={styles.tabs}>
        {tabs.map((tab) => (
          <div
            key={tab.id}
            className={`${styles.tab} ${
              tab.id === activeTab ? styles.activeTab : ""
            }`}
            onClick={() => handleTabClick(tab.id)}
          >
            {tab.label}
          </div>
        ))}
      </div>
      <>
        {tabs.map((tab) =>
          activeTab === tab.id ? <div key={tab.id}>{tab.content}</div> : null
        )}
      </>
    </div>
  );
};

export default TabbedNavigation;
