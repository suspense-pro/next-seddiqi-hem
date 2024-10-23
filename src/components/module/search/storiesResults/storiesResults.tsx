import React from "react";
import styles from "./storiesResults.module.scss";
import Typography from "../../typography";
import StoryCard from "../../cards/storyCard";
import { Button } from "@components/module";
import { useRouter } from "next/router";

const StoriesResults = ({ storiesResults }) => {
  const router = useRouter();

  const viewAllStoriesHandler = () => {
    router.push("/view-all-stories");
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
            link={"/view-all-stories"}
            className={styles.viewAllBtn}
            title={"View All"}
            color="green_dark"
            type={"Plain"}
            clickHandler={viewAllStoriesHandler}
          />
        </div>
      )}
    </div>
  );
};

export default StoriesResults;