import React, { useContext } from "react";
import styles from "./megaMenu.module.scss";
import Link from "next/link";
import MenuLink from "../cards/menuLink/menuLink";
import DisplayCard from "../cards/displayCard/displayCard";
import ArticleCard from "../cards/articleCard/articleCard";
import StoryCard from "../cards/storyCard/storyCard";
import { HeaderContext } from "@contexts/headerContext";
import MegaMenuLeft from "./megaMenuLeft";
import MegaMenuRight from "./megaMenuRight";

const MegaMenu = () => {
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
    <section className={styles.megaMenuContainer}>
      <div className={styles.columns}>
        <MegaMenuLeft />
        <MegaMenuRight />
      </div>
    </section>
  );
};

export default MegaMenu;
