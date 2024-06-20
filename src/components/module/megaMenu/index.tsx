import React, { useContext } from "react";
import styles from "./megaMenu.module.scss";
import Link from "next/link";
import MenuLink from "./components/menuLink/menuLink";
import DisplayCard from "./components/displayCard/displayCard";
import ArticleCard from "./components/articleCard/articleCard";
import StoryCard from "./components/storyCard/storyCard";
import { HeaderContext } from "@contexts/headerContext";

const MegaMenu = () => {
  return (
    <section className={styles.megaMenuContainer}>
      <div className={styles.columns}>
        <MegaMenuLeft />
        <MegaMenuRight />
      </div>
    </section>
  );
};

export default MegaMenu;

// left
const MegaMenuLeft = () => {
  const headerContext = useContext(HeaderContext);

  if (!headerContext) {
    return null;
  }
  const { headerData } = headerContext;

  console.log(headerData);

  const current = headerData.sections[2];

  return (
    <div className={styles.menuLeft}>
      <div className={styles.columnCategories}>
        {current.categories?.map((item) => (
          <MenuLink key={item.name} title={item.name} expand={item.expand} />
        ))}
      </div>
      <div className={styles.columnFilters}>
        {current.special_categories?.map((item) => (
          <MenuLink key={item.name} title={item.name} expand={item.expand} />
        ))}
      </div>
    </div>
  );
};

// right
const MegaMenuRight = () => {
  const headerContext = useContext(HeaderContext);

  if (!headerContext) {
    return null;
  }
  const { headerData } = headerContext;
  const current = headerData.sections[2];

  return (
    <div className={styles.displayCardsContainer}>
      <div className={styles.displayCardsTitle}>THE LATEST</div>
      <div className={styles.displayCards}>
        {current.type === "Explore" && (
          <>
            <div className={styles.storyCards}>
              <StoryCard />
              <StoryCard />
              <StoryCard />
            </div>
            <DisplayCard />
            <DisplayCard />
          </>
        )}
        {current.the_latest?.map((item, ind) => (
          <DisplayCard key={ind} />
        ))}

        {/* <ArticleCard /> */}
      </div>
    </div>
  );
};
