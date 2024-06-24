import { useContext, useState } from "react";
import styles from "./../tabContent.module.scss";
import { HeaderContext } from "@contexts/headerContext";
import { headerDummyData } from "@components/module/desktopHeader/headerDummyData";
import NavigationLink from "@components/module/navigationLink";
import { ArrowDown } from "@assets/images/svg";
import DisplayCard from "@components/module/cards/displayCard";
import MobileMenuLogobar from "@components/module/mobileMenuLogobar";
import Accordion from "@components/module/accordion";

const TabContentProducts = () => {
  const headerContext = useContext(HeaderContext);
  const { headerData } = headerContext;
  const [subMenu, setSubMenu] = useState(false);

  return (
    <div className={styles.tabContent}>
      <div className={styles.mobileMenuLinks}>
        {headerDummyData.navigation
          ?.filter((item) => item.title !== "EXPLORE")
          .map((link, ind) => (
            <div className={styles.mobileMenuNavigationContainer}>
              <Accordion subMenu={subMenu} setSubMenu={setSubMenu} item={link}>
                <div className={styles.subMenu}>
                  {headerData.sections[ind].categories?.map((item) => (
                    <NavigationLink
                      className={styles.menuLink}
                      key={item.name}
                      title={item.name}
                      arrow={item.expand}
                      url="/"
                    />
                  ))}
                </div>
                <div className={styles.subMenu}>
                  {headerData.sections[ind].special_categories?.map((item) => (
                    <NavigationLink
                      className={styles.menuLink}
                      key={item.name}
                      title={item.name}
                      arrow={item.expand}
                      url="/"
                    />
                  ))}
                </div>
                <div className={styles.subMenu}>
                  <div className={styles.displayCardsTitle}>THE LATEST</div>
                  <DisplayCard />
                  <DisplayCard />
                </div>
              </Accordion>
            </div>
          ))}
      </div>
      <MobileMenuLogobar />
    </div>
  );
};

export default TabContentProducts;
