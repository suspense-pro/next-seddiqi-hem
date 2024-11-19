import TabbedNavigation from "@components/module/tabbedNavigation";
import React from "react";
import styles from "./viewAllBrandsCategory.module.scss";
import BrandListing from "@components/module/brandListing";

const ViewAllBrandsCategory = ({ ...content }) => {
  // console.log("ViewAllBrandsCategory", content);
  return (

      <TabbedNavigation
        tabs={[
          { id: 1, title: "All brands" },
          // { id: 2, title: "watches" },
          // { id: 3, title: "Jewellery" },
          // { id: 4, title: "accessories" },
        ]}
        className={styles.tabContainer}
      />
  );
};

export default ViewAllBrandsCategory;
