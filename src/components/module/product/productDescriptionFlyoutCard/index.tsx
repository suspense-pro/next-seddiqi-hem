import SideDrawer from "@components/module/sideDrawer";
import Typography from "@components/module/typography";
import React, { useState } from "react";
import styles from "./productDescriptionFlyoutCard.module.scss";
import Accordion from "@components/module/accordion";

const ProductDescriptionFlyoutCard = ({ isDescriptionCardOpen, setDescriptionCardOpen, editorsView, product }) => {
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
      <div onMouseDown={(e) => e.stopPropagation()}>
        <Typography variant="p" className={styles.description}>
          {product?.longDescription}
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
                <div className={styles.accordianDesc}>{item?.description}</div>
                <div className={styles.bar}>&nbsp;</div>
              </Accordion>
            </div>
          );
        })}
      </div>
    </SideDrawer>
  );
};

export default ProductDescriptionFlyoutCard;
