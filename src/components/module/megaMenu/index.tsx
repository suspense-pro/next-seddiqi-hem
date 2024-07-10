import React, { useContext } from "react";
import styles from "./megaMenu.module.scss";
import { HeaderContext } from "@contexts/headerContext";
import { HeaderFooter, SubMenuLinks, ContentBlocks } from "@components/module";

const MegaMenu = ({ headerHeightClass }) => {
  const headerContext = useContext(HeaderContext);
  const { current, headerData } = headerContext;
  const currentHeaderData = headerData?.children[current];

  if (
    current === null ||
    currentHeaderData?.content?.commonProps?.item_title === "Brands"
  ) {
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
