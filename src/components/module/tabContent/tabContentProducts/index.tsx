import { useContext, useState } from "react";
import styles from "./../tabContent.module.scss";
import { HeaderContext } from "@contexts/headerContext";
import { headerDummyData } from "@components/module/desktopHeader/headerDummyData";
import DisplayCard from "@components/module/cards/displayCard";
import MobileMenuLogobar from "@components/module/mobileMenuLogobar";
import Accordion from "@components/module/accordion";
import SubMenu from "@components/module/tabContent/subMenu";

const TabContentProducts = () => {
  const headerContext = useContext(HeaderContext);
  const { headerData } = headerContext;
  const [subMenu, setSubMenu] = useState(false);

  // CHECK FOR SUBMENU DROPDOWN
  const isDropdown = (ind) => {
    return (
      headerData.sections[ind].categories === undefined &&
      headerData.sections[ind].special_categories === undefined
    );
  };

  // REMOVE EXPLORE
  const products = headerDummyData.navigation?.filter(
    (item) => item.title !== "EXPLORE"
  );

  return (
    <div className={styles.tabContent}>
      <div className={styles.mobileMenuLinks}>
        {products?.map((link, ind) => (
          <div key={link.id} className={styles.mobileMenuNavigationContainer}>
            {!isDropdown(ind) ? (
              <Accordion
                showArrow={!isDropdown(ind)}
                subMenu={subMenu}
                setSubMenu={setSubMenu}
                item={link}
              >
                <SubMenu links={headerData.sections[ind].categories} />
                <SubMenu links={headerData.sections[ind].special_categories} />

                <div className={styles.subMenu}>
                  <div className={styles.displayCardsTitle}>THE LATEST</div>
                  <DisplayCard />
                  <DisplayCard />
                </div>
              </Accordion>
            ) : (
              <Accordion item={link} />
            )}
          </div>
        ))}
      </div>
      <MobileMenuLogobar />
    </div>
  );
};

export default TabContentProducts;
