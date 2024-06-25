import React, { useEffect, useLayoutEffect, useRef, useState } from "react";
import styles from "./accordion.module.scss";
import NavigationLink from "../navigationLink";
import { ArrowDown } from "@assets/images/svg";

interface AccordionProps {
  item: any;
  children?: React.ReactNode;
  setSubMenu?: (id) => void;
  subMenu?: boolean;
  showArrow?: boolean;
}

const Accordion = ({
  item,
  children,
  setSubMenu,
  subMenu,
  showArrow,
}: AccordionProps) => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [height, setHeight] = useState(0);
  const contentRef = useRef<HTMLDivElement | null>(null);

  // DYNAMIC HEIGHT
  useLayoutEffect(() => {
    if (typeof window !== "undefined" && contentRef.current && isCollapsed) {
      setHeight(contentRef.current.scrollHeight);
    }
  }, [isCollapsed]);

  // ACTIVE SUBMENU
  const activeSubMenu = subMenu === item.id && isCollapsed;

  const handleClick = () => {
    if (showArrow) {
      setSubMenu(item.id);
      setIsCollapsed(!isCollapsed);
    }
  };

  return (
    <div className={styles.accordian}>
      <div className={styles.accordianLink} onClick={handleClick}>
        <NavigationLink
          hover={false}
          className={styles.headerLink}
          key={item.title}
          title={item.title}
        />

        {showArrow && (
          <ArrowDown className={activeSubMenu && styles.activeArrow} />
        )}
      </div>
      <div
        ref={contentRef}
        style={{
          height: activeSubMenu && height,
        }}
        className={`${styles.accordianContainer}`}
      >
        {children}
      </div>
    </div>
  );
};

export default Accordion;
