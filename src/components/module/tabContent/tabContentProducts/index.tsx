import { useContext, useState, useMemo } from "react";
import styles from "./../tabContent.module.scss";
import { HeaderContext } from "@contexts/headerContext";
import { headerDummyData } from "@components/module/desktopHeader/headerDummyData";
import DisplayCard from "@components/module/cards/displayCard";
import MobileMenuLogobar from "@components/module/mobileMenuLogobar";
import Accordion from "@components/module/accordion";
import SubMenu from "@components/module/tabContent/subMenu";

const TabContentProducts = () => {
  const { headerData } = useContext(HeaderContext);
  const [subMenu, setSubMenu] = useState(false);

  const isDropdown = (ind) =>
    !headerData.sections[ind].categories &&
    !headerData.sections[ind].special_categories;

  const products = useMemo(
    () =>
      headerDummyData.navigation?.filter((item) => item.title !== "EXPLORE"),
    [headerDummyData.navigation]
  );

  const renderAccordionContent = (ind) => (
    <>
      <SubMenu links={headerData.sections[ind].categories} />
      <SubMenu links={headerData.sections[ind].special_categories} />
      <div className={styles.subMenu}>
        <div className={styles.displayCardsTitle}>THE LATEST</div>
        <DisplayCard />
        <DisplayCard />
      </div>
    </>
  );

  return (
    <div className={styles.tabContent}>
      <div className={styles.mobileMenuLinks}>
        {products?.map((link, ind) => (
          <div key={link.id} className={styles.mobileMenuNavigationContainer}>
            <Accordion
              showArrow={!isDropdown(ind)}
              subMenu={subMenu}
              setSubMenu={setSubMenu}
              item={link}
            >
              {!isDropdown(ind) && renderAccordionContent(ind)}
            </Accordion>
          </div>
        ))}
      </div>
      <MobileMenuLogobar />
    </div>
  );
};

export default TabContentProducts;
