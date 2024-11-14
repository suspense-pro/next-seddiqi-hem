import React, { useState, useEffect, Component } from "react";
import styles from "./brandPopUp.module.scss";
import Typography from "../../typography";
import RichText from "../../richText";
import SideDrawer from "../../sideDrawer";
import { Button } from "@components/module";
import { BrandPopUpProps } from "@utils/models/storeLocatorDetails";

const BrandPopUp: React.FC<BrandPopUpProps> = ({ brands, isOpen, onClose }) => {
  return (
    <div className={styles.storeDetailsWrapper}>
      <SideDrawer
        isOpen={isOpen}
        showFooter={false}
        showBackButton={true}
        onClose={onClose}
        onSubmit={null}
        onClearAll={null}
        position={"right"}
        className={""}
      >
        <div className={styles.brandListWrapper}>
          <Typography variant="h5" className={styles.title}>
            Available Brands
          </Typography>
          <div className={styles.brandsWrapper}>
            {brands?.length > 0 &&
              brands.map((availableBrand, index) => {
                return (
                  <React.Fragment key={index}>
                    <p className={styles.brandsName}>{availableBrand}</p>
                    {index < brands.length - 1 && (
                      <div className={styles.brandSeparator} />
                    )}
                  </React.Fragment>
                );
              })}
          </div>
        </div>
      </SideDrawer>
    </div>
  );
};

export default BrandPopUp;
