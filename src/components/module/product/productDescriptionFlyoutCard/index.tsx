import SideDrawer from "@components/module/sideDrawer";
import Typography from "@components/module/typography";
import React, { useState } from "react";
import styles from "./productDescriptionFlyoutCard.module.scss";
import Accordion from "@components/module/accordion";

const ProductDescriptionFlyoutCard = () => {
  const [subMenu, setSubMenu] = useState(false);

  return (
    <SideDrawer
      isOpen={true}
      onClose={() => console.log("Closed")}
      showFooter={false}
      showBackButton={false}
      title={"Product Description"}
    >
      <Typography variant="p" className={styles.description}>
        With the Big Bang Unico Ice Bang, Hublot has taken a radical stance while remaining faithful to the powerful
        aesthetic of the original model released in 2006, creating a sophisticated watch with a stunning array of
        high-tech materials and features which make it a must-have piece... Limited to 100 pieces, this model will be
        available exclusively on hublot.com e-commerce boutique.
      </Typography>
      <div className={styles.bar}>&nbsp;</div>
      <div className={styles.accordianContainer}>
        <Accordion
          showArrow={true}
          subMenu={subMenu}
          setSubMenu={setSubMenu}
          item={{
            id: 1,
            title: "BIG BANG UNICO",
          }}
          key={1}
        >
          <div className={styles.accordianDesc}>
            Long-standing fans will love the strong lines of this Big Bang Unico Ice Bang 2024 version, which are so
            reminiscent of the original model. But it is on closer inspection that the difference can be fully
            appreciated: this is truly a new vintage
          </div>
      <div className={styles.bar}>&nbsp;</div>
        </Accordion>
      </div>
    </SideDrawer>
  );
};

export default ProductDescriptionFlyoutCard;
