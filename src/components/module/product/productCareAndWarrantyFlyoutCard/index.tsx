import SideDrawer from "@components/module/sideDrawer";
import Typography from "@components/module/typography";
import React, { useState } from "react";
import styles from "./productCareAndWarrantyFlyoutCard.module.scss";
import Accordion from "@components/module/accordion";
import Button from "@components/module/button";

const ProductCareAndWarrantyFlyoutCard = ({
  isCareAndWarrantyCardOpen,
  setCareAndWarrantyCardOpen,
  warrantyAndCare,
}) => {
  const [subMenu, setSubMenu] = useState(false);

  if (!warrantyAndCare) {
    return null;
  }

  return (
    <SideDrawer
      isOpen={isCareAndWarrantyCardOpen}
      onClose={() => {
        setCareAndWarrantyCardOpen(false);
      }}
      showFooter={false}
      showBackButton={false}
      title={warrantyAndCare?.primaryTitle}
      position="right"
    >
      {warrantyAndCare?.listItems?.map((item) => {
        return (
          <>
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
              </Accordion>
            </div>
            <div className={styles.bar}>&nbsp;</div>
          </>
        );
      })}

      <div className={styles.btns}>
        <Button
          isLink={true}
          link={warrantyAndCare?.servicesCta?.url}
          className={styles.serviceBtn}
          title={warrantyAndCare?.servicesCta?.label}
          color={warrantyAndCare?.servicesCta?.color}
          type={warrantyAndCare?.servicesCta?.type}
          new_tab={warrantyAndCare?.servicesCta?.isNewTab}
        />
        <Button
          isLink={true}
          link={warrantyAndCare?.downloadCta?.url}
          className={styles.serviceBtn}
          title={warrantyAndCare?.downloadCta?.label}
          color={warrantyAndCare?.downloadCta?.color}
          type={warrantyAndCare?.downloadCta?.type}
          new_tab={warrantyAndCare?.downloadCta?.isNewTab}
        />
      </div>
    </SideDrawer>
  );
};

export default ProductCareAndWarrantyFlyoutCard;
