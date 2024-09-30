import SideDrawer from "@components/module/sideDrawer";
import Typography from "@components/module/typography";
import React, { useState } from "react";
import styles from "./productDescriptionFlyoutCard.module.scss";
import Accordion from "@components/module/accordion";

const ProductDescriptionFlyoutCard = ({ isDescriptionCardOpen, setDescriptionCardOpen, editorsView }) => {
  const [subMenu, setSubMenu] = useState(false);
  return (
    <SideDrawer
      isOpen={isDescriptionCardOpen}
      onClose={() => setDescriptionCardOpen(false)}
      showFooter={false}
      showBackButton={false}
      title={"Product Description"}
      position="right"
    >
      <Typography variant="p" className={styles.description}>
        With the Big Bang Unico Ice Bang, Hublot has taken a radical stance while remaining faithful to the powerful
        aesthetic of the original model released in 2006, creating a sophisticated watch with a stunning array of
        high-tech materials and features which make it a must-have piece... Limited to 100 pieces, this model will be
        available exclusively on hublot.com e-commerce boutique.
      </Typography>
      <div className={styles.bar}>&nbsp;</div>
      {editorsView?.listItems?.map((item) => {
        return (
          <div className={styles.accordianContainer}>
            <Accordion
              showArrow={true}
              subMenu={subMenu}
              setSubMenu={setSubMenu}
              item={{
                id: 1,
                title: `${item?.title}`,
              }}
              key={1}
            >
              <div className={styles.accordianDesc}>
                {item?.description}
              </div>
              <div className={styles.bar}>&nbsp;</div>
            </Accordion>
          </div>
        );
      })}
    </SideDrawer>
  );
};

export default ProductDescriptionFlyoutCard;
