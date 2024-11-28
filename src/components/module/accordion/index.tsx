import React, { useContext, useEffect, useRef, useState } from "react";
import styles from "./accordion.module.scss";
import NavigationLink from "../navigationLink";
import { ArrowDown } from "@assets/images/svg";
import { AccordionProps } from "@utils/models";
import { HeaderContext } from "@contexts/headerContext";

const Accordion: React.FC<AccordionProps> = ({
  item,
  children,
  setSubMenu,
  subMenu,
  showArrow = false,
  isOpen = false,
  url,
  isCollapse = false
}) => {
  const [isCollapsed, setIsCollapsed] = useState(isCollapse);
  const [height, setHeight] = useState<number | undefined>(undefined);
  const contentRef = useRef<HTMLDivElement>(null);
  const { menuOpen, setMenuOpen } = useContext(HeaderContext);

  const activeSubMenu = subMenu === item.id && isCollapsed;

  const handleClick = () => {
    if (showArrow && setSubMenu) {
      setSubMenu(item.id);
      setIsCollapsed((prev) => !prev);
    }
  };

  useEffect(() => {
    if (contentRef.current && isCollapsed) {
      setHeight(contentRef?.current?.scrollHeight);
    } else {
      setHeight(undefined);
    }
  }, [isCollapsed, contentRef]);

  useEffect(() => {
    if (isOpen) {
      handleClick();
    }
  }, [isOpen, handleClick]);

  return (
    <div className={styles.accordion}>
      <div className={styles.accordionLink}>
        <span
          onClick={() => {
            if (item?.url) {
              setMenuOpen(false);
            }
          }}
          className={styles.headerLink}
        >
          <NavigationLink
            url={item?.url}
            isNewTab={item?.isNewTab}
            hover={false}
            title={item?.title}
          />
        </span>

        {showArrow && (
          <div onClick={handleClick}>
            <ArrowDown
              className={activeSubMenu ? styles.activeArrow : undefined}
            />
          </div>
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
