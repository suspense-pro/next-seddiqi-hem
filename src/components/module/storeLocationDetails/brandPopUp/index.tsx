import React, { useState, useEffect, Component } from "react";
import styles from "./brandPopUp.module.scss";
import Typography from "../../typography";
import RichText from "../../richText";
import SideDrawer from "../../sideDrawer";
import { Button } from "@components/module";
import { BrandPopUpProps } from "@utils/models/storeLocatorDetails"

const BrandPopUp: React.FC<BrandPopUpProps> = ({
  brands,
  isOpen,
  onClose,
}) => {

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
          {brands.length > 0 ? (
            <ul className={styles.brandList}>
              {brands.map((brand, index) => (
                <li key={index} className={styles.brandItem}>
                  <Typography variant="p">{brand}</Typography>
                </li>
              ))}
            </ul>
          ) : (
            <Typography variant="p">No brands available.</Typography>
          )}
        </div>
      </SideDrawer>
    </div>
  );
};

export default BrandPopUp;
