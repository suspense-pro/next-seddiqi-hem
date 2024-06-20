import { useContext } from "react";
import MenuLink from "../cards/menuLink/menuLink";
import styles from "./megaMenu.module.scss";
import { HeaderContext } from "@contexts/headerContext";
import DisplayCard from "../cards/displayCard/displayCard";
import StoryCard from "../cards/storyCard/storyCard";
import ArticleCard from "../cards/articleCard/articleCard";

const MegaMenuRight = () => {
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
            <DisplayCard />
            <DisplayCard />
          </div>
        </div>
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

export default MegaMenuRight;
