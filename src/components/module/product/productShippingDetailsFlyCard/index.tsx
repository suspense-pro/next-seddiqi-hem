import SideDrawer from "@components/module/sideDrawer";
import React, { useState } from "react";
import styles from "./productShippingDetailsFlyCard.module.scss";
import Button from "@components/module/button";
import { MailIcon, PhoneIcon } from "@assets/images/svg";

const ProductShippingDetailsFlyCard = () => {
  return (
    <SideDrawer
      isOpen={true}
      onClose={() => console.log("Closed")}
      showFooter={false}
      showBackButton={false}
      title={"Shipping Details"}
    >
      <ul className={styles.accordianDesc}>
        <li className={styles.descItem}>
          <span className={styles.bullet}>&nbsp;</span>
          <span>Free delivery and returns</span>
        </li>
        <li className={styles.descItem}>
          <span className={styles.bullet}>&nbsp;</span>
          <span>Delivery within 48 hours</span>
        </li>
        <li className={styles.descItem}>
          <span className={styles.bullet}>&nbsp;</span>
          <span>Secure delivery</span>
        </li>
      </ul>

      <div className={styles.title}>Get help with your online purchase</div>
      <div className={styles.desc}>
        For any questions, including technical help, feel free to contact us on our Customer service support enter from
        Monday to Saturday 9:00 am - 6:00 pm
      </div>
      <div className={styles.icons}>
      <MailIcon />
      <PhoneIcon />
      </div>
    </SideDrawer>
  );
};

export default ProductShippingDetailsFlyCard;
