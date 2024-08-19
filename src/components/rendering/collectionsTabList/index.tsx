import { CollectionsTabDesktop, CollectionsTabMobile, ContentHeader, TabbedNavigation } from "@components/module";
import React from "react";
import styles from "./collectionsTabList.module.scss";

import "swiper/css";
import "swiper/css/effect-coverflow";
import "swiper/css/pagination";
import { useDeviceWidth } from "@utils/useCustomHooks";

const CollectionsTabList = ({ ...content }) => {
  const isMobile = !useDeviceWidth()[0];

  let tabs = content?.tabItem?.map((item, index) => {
    return {
      id: index + 1,
      title: item?.tabLabel,
      content: isMobile ? (
        <CollectionsTabMobile ind={index} cta={content?.cta} content={content} />
      ) : (
        <CollectionsTabDesktop ind={index} cta={content?.cta} content={content} />
      ),
    };
  });

  return (
    <div className={styles.container}>
      <ContentHeader
        barColor={styles.barColor}
        subTitleColor={styles.subTitleColor}
        titleColor={styles.titleColor}
        hideUnderline={content?.hideUnderline}
        mainTitle={content?.mainTitle}
        richText={content?.richText}
      />
      <TabbedNavigation gap={isMobile ? 10 : 60} className={styles.tabNavigation} tabs={tabs} />
    </div>
  );
};

export default CollectionsTabList;
