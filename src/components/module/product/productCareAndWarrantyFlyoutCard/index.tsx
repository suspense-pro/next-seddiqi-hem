import SideDrawer from "@components/module/sideDrawer";
import Typography from "@components/module/typography";
import React, { useState } from "react";
import styles from "./productCareAndWarrantyFlyoutCard.module.scss";
import Accordion from "@components/module/accordion";
import Button from "@components/module/button";

const ProductCareAndWarrantyFlyoutCard = () => {
  const [subMenu, setSubMenu] = useState(false);

  return (
    <SideDrawer
      isOpen={true}
      onClose={() => console.log("Closed")}
      showFooter={false}
      showBackButton={false}
      title={"Care & Warranty"}
    >
      <div className={styles.accordianContainer}>
        <Accordion
          showArrow={true}
          subMenu={subMenu}
          setSubMenu={setSubMenu}
          item={{
            id: 1,
            title: "Care",
          }}
          key={1}
        >
          <div className={styles.accordianDesc}>
            Long-standing fans will love the strong lines of this Big Bang Unico Ice Bang 2024 version, which are so
            reminiscent of the original model. But it is on closer inspection that the difference can be fully
            appreciated: this is truly a new vintage
          </div>
        </Accordion>
        <div className={styles.bar}>&nbsp;</div>
      </div>
      <div className={styles.accordianContainer}>
        <Accordion
          showArrow={true}
          subMenu={subMenu}
          setSubMenu={setSubMenu}
          item={{
            id: 1,
            title: "Warranty",
          }}
          key={1}
        >
          <div className={styles.accordianDesc}>
            Long-standing fans will love the strong lines of this Big Bang Unico Ice Bang 2024 version, which are so
            reminiscent of the original model. But it is on closer inspection that the difference can be fully
            appreciated: this is truly a new vintage
          </div>
        </Accordion>
        <div className={styles.bar}>&nbsp;</div>
      </div>
      <div className={styles.btns}>
        <Button
          isLink={true}
          link={"/"}
          className={styles.serviceBtn}
          title={"Services at Seddiqi"}
          color="green_dark"
          type={"Plain"}
        />
        <Button
          isLink={true}
          link={"/"}
          className={styles.downloadBtn}
          title={"Download Care instructions"}
          color="green_dark"
          type={"Plain"}
        />
      </div>
    </SideDrawer>
  );
};

export default ProductCareAndWarrantyFlyoutCard;
