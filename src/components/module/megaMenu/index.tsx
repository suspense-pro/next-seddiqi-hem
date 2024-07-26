import React, { useContext } from "react";
import styles from "./megaMenu.module.scss";
import { HeaderContext } from "@contexts/headerContext";
import { HeaderFooter, SubMenuLinks, NavCardBlocks } from "@components/module";

const MegaMenu = ({ headerHeightClass }) => {
  const headerContext = useContext(HeaderContext);
  const { current, headerData } = headerContext;
  if (current === null) return null;
  const currentHeaderData = headerData?.children[current];
  if (
    Array.isArray(currentHeaderData?.children) &&
    currentHeaderData?.children?.length === 0
  ) {
    return null;
  }

  return (
    <section className={`${headerHeightClass} ${styles.megaMenuContainer}`}>
      <div className={styles.columns}>
        <SubMenuLinks />
        <NavCardBlocks />
      </div>
      <HeaderFooter className={styles.headerFooter} />
    </section>
  );
};

export default MegaMenu;
