import React from "react";
import styles from "./storiesResults.module.scss";
import Typography from "../../typography";
import StoryCard from "../../cards/storyCard";
import { Button } from "@components/module";
import { useRouter } from "next/router";

const StoriesResults = ({ storiesResults }) => {
  const router = useRouter();

  const handleViewAllClick = () => {
    router.push({
      pathname: '/search',
      query: { stories: JSON.stringify(storiesResults) },
    });
  };

  return (
    <div className={styles.storiesContainer}>
      <Typography variant="p" className={styles.searchStoryTitle}>
        Recommmended Stories
      </Typography>
      <div className={styles.storyCards}>
        {storiesResults.slice(0, 6).map((story, index) => (
          <div className={styles.storyCard} key={index}>
            <StoryCard item={story} />
          </div>
        ))}
      </div>
      {storiesResults.length > 2 && (
        <div className={styles.viewAllBtnContainer}>
          <Button
            isLink={false}
            link={""}
            className={styles.viewAllBtn}
            title={"View All"}
            color="green_dark"
            type={"Plain"}
            clickHandler={handleViewAllClick}
          />
        </div>
      )}
    </div>
  );
};

export default StoriesResults;