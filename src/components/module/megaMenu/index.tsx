import React, { useContext } from "react";
import styles from "./megaMenu.module.scss";
import { HeaderContext } from "@contexts/headerContext";
import NavigationLink from "../navigationLink";

import {
  StoryCard,
  ArticleCard,
  DisplayCard,
  HeaderFooter,
} from "@components/module";

export const SubMenuLinks = () => {
  const headerContext = useContext(HeaderContext);
  const { current, updateCurrent, headerData } = headerContext;
  const currentHeaderData = headerData.sections[current];

  if (current === null) {
    return null;
  }

  return (
    <div className={styles.menuLeft}>
      <div className={styles.columnCategories}>
        {currentHeaderData.categories?.map((item) => (
          <NavigationLink
            className={styles.menuLink}
            key={item.name}
            title={item.name}
            arrow={item.expand}
            url="/"
          />
        ))}
      </div>
      <div className={styles.columnFilters}>
        {currentHeaderData.special_categories?.map((item) => (
          <NavigationLink
            className={styles.menuLink}
            key={item.name}
            title={item.name}
            arrow={item.expand}
            url="/"
          />
        ))}
      </div>
    </div>
  );
};

const ContentBlocks = () => {
  const headerContext = useContext(HeaderContext);
  const { current, headerData } = headerContext;
  const currentHeaderData = headerData.sections[current];

  if (current === null) {
    return null;
  }

  if (currentHeaderData.type === "Explore") {
    return (
      <div className={styles.rightSideContainer}>
        <div className={styles.column1}>
          <div className={styles.displayCardsTitle}>OTHERS</div>

          <div className={styles.storyCardContainer}>
            {currentHeaderData.the_latest.map((item) => (
              <StoryCard key={item.title} item={item} />
            ))}
          </div>
        </div>
        <div className={styles.column2}>
          <div className={styles.displayCardsTitle}>THE LATEST</div>
          <div className={styles.displayCards}>
            {/* temp */}
            <DisplayCard item={currentHeaderData.the_latest[0]} />
            <DisplayCard item={currentHeaderData.the_latest[1]} />
          </div>
        </div>
        {/* temp */}
        {/* <div className={styles.column2}>
          <div className={styles.displayCardsTitle}>LATEST ARTICLE</div>
          <ArticleCard item={currentHeaderData.the_latest[0]} />
        </div> */}
      </div>
    );
  }

  return (
    <div className={styles.displayCardsContainer}>
      <div className={styles.displayCardsTitle}>THE LATEST</div>
      <div className={styles.displayCards}>
        {currentHeaderData.the_latest?.map((item, ind) => (
          <DisplayCard item={item} key={ind} />
        ))}
      </div>
    </div>
  );
};

const MegaMenu = ({ headerHeightClass }) => {
  const headerContext = useContext(HeaderContext);
  const { current, headerData } = headerContext;

  if (current === null) {
    return null;
  }

  const currentHeaderData = headerData.sections[current];
  if (currentHeaderData?.type === "Brands") {
    return null;
  }
  return (
    <section className={`${headerHeightClass} ${styles.megaMenuContainer}`}>
      <div className={styles.columns}>
        <SubMenuLinks />
        <ContentBlocks />
      </div>
      <HeaderFooter className={styles.headerFooter} />
    </section>
  );
};

export default MegaMenu;
