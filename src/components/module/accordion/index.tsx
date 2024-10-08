import React, { useEffect, useRef, useState } from "react";
import styles from "./accordion.module.scss";
import NavigationLink from "../navigationLink";
import { ArrowDown } from "@assets/images/svg";
import { AccordionProps } from "@utils/models";

const Accordion: React.FC<AccordionProps> = ({
  item,
  children,
  setSubMenu,
  subMenu,
  showArrow = false,
}) => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [height, setHeight] = useState<number | undefined>(undefined);
  const contentRef = useRef<HTMLDivElement>(null);

  const activeSubMenu = subMenu === item.id && isCollapsed;

  useEffect(() => {
    if (contentRef.current && isCollapsed) {
      setHeight(contentRef.current.scrollHeight);
    } else {
      setHeight(undefined);
    }
  }, [isCollapsed]);

  const handleClick = () => {
    if (showArrow && setSubMenu) {
      setSubMenu(item.id);
      setIsCollapsed(!isCollapsed);
    }
  };

  return (
    <div className={styles.accordion}>
      <div className={styles.accordionLink} onClick={handleClick}>
        <NavigationLink
          hover={false}
          className={styles.headerLink}
          title={item?.title}
        />
        {showArrow && (
          <ArrowDown
            className={activeSubMenu ? styles.activeArrow : undefined}
          />
        )}
      </div>
      <div
        ref={contentRef}
        style={{ height: activeSubMenu ? height : 0 }}
        className={styles.accordionContainer}
      >
        {children}
      </div>
    </div>
  );
};

export default Accordion;
