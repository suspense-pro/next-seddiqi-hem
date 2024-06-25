import React, { useLayoutEffect, useRef, useState } from "react";
import styles from "./accordion.module.scss";
import NavigationLink from "../navigationLink";
import { ArrowDown } from "@assets/images/svg";

const Accordion = ({ item, children, setSubMenu, subMenu }) => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  // const [height, setHeight] = useState(0);
  // const contentRef = useRef<HTMLDivElement | null>(null);

  // useLayoutEffect(() => {
  //   typeof window !== "undefined" && contentRef.current
  //     ? setHeight(contentRef.current.clientHeight + 5)
  //     : setHeight(0);
  // }, [isCollapsed]);

  // console.log("height", height);

  if (item.title === "BRANDS") {
    return (
      <div className={styles.accordian}>
        <div
          className={styles.accordianLink}
          onClick={() => {
            setSubMenu(item.id);
            setIsCollapsed(!isCollapsed);
          }}
        >
          <NavigationLink
            className={styles.headerLink}
            key={item.title}
            title={item.title}
            hover={false}
          />
        </div>
      </div>
    );
  } else {
    return (
      <div className={styles.accordian}>
        <div
          className={styles.accordianLink}
          onClick={() => {
            setSubMenu(item.id);
            setIsCollapsed(!isCollapsed);
          }}
        >
          <NavigationLink
            hover={false}
            className={styles.headerLink}
            key={item.title}
            title={item.title}
          />
          <ArrowDown
            className={subMenu === item.id && isCollapsed && styles.activeArrow}
          />
        </div>

        <div
          className={`${
            subMenu === item.id && isCollapsed && styles.activeAccordian
          } ${styles.accordianContainer}`}
          style={{
            height:
              subMenu === item.id && isCollapsed && item.height && item.height,
          }}
        >
          {children}
        </div>
      </div>
    );
  }
};

export default Accordion;
