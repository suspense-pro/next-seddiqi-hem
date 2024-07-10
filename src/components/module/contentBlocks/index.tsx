import { HeaderContext } from "@contexts/headerContext";
import { useContext } from "react";
import styles from "./contentBlocks.module.scss";
import StoryCard from "../cards/storyCard";
import DisplayCard from "../cards/displayCard";
import ArticleCard from "../cards/articleCard";
import CardSection from "../cardSection";

const ContentBlocks = () => {
  const headerContext = useContext(HeaderContext);
  const { current, headerData } = headerContext;

  if (current === null || !headerData) {
    return null;
  }

  const currentHeaderData = headerData?.children[current]?.content;
  const contentBlock = headerData.cardsData[current]?.contentBlock;

  if (!contentBlock) return null;

  const { displayCard: displayCards, storyCard: storyCards } = contentBlock;

  if (currentHeaderData?.type === "Explore") {
    return (
      <div className={styles.rightSideContainer}>
        {displayCards && (
          <CardSection
            title={"OTHER"}
            Component={StoryCard}
            cards={storyCards}
            containerStyle={styles.column1}
            cardStyle={styles.storyCardContainer}
            titleStyle={styles.displayCardsTitle}
          />
        )}

        {storyCards && (
          <CardSection
            title={"LATEST STORIES"}
            Component={DisplayCard}
            cards={displayCards}
            containerStyle={styles.column2}
            cardStyle={styles.displayCards}
            titleStyle={styles.displayCardsTitle}
          />
        )}
        {contentBlock && (
          <div className={styles.column2}>
            <div className={styles.displayCardsTitle}>LATEST ARTICLE</div>
            <ArticleCard key={contentBlock?.title} item={contentBlock} />
          </div>
        )}
      </div>
    );
  }

  if (!displayCards) return null;

  return (
    <CardSection
      title={"THE LATEST"}
      Component={DisplayCard}
      cards={displayCards}
      containerStyle={styles.displayCardsContainer}
      cardStyle={styles.displayCards}
      titleStyle={styles.displayCardsTitle}
    />
  );
};

export default ContentBlocks;
