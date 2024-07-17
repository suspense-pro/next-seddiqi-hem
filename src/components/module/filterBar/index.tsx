import React, { useState } from "react";
import styles from "./filterBar.module.scss";
import FilterBtn from "../filterBtn";
import SideDrawer from "../sideDrawer";
import PriceRangeFilter from "../priceRangeFilter";
import Accordion from "../accordion";

const FILTERS = [
  { icon: true, text: "All Filter & Sort by" },
  { icon: false, text: "New" },
  { icon: false, text: "Exclusive" },
  { icon: false, text: "Gifts" },
  { icon: false, text: "Messika" },
  { icon: false, text: "Bvlgari" },
];

const FilterBar = () => {
  const [isDrawerOpen, setDrawerOpen] = useState(false);
  const [subMenu, setSubMenu] = useState<string | null>(null);

  const toggleDrawer = () => {
    setDrawerOpen(!isDrawerOpen);
  };

  const accordionItem = {
    id: "priceRange",
    title: "Price",
  };
  return (
    <div className={styles.container}>
      <div className={styles.filterBtns}>
        {FILTERS?.map((item, index) => (
          <FilterBtn
            key={index}
            label={item.text}
            icon={item.icon}
            onClick={
              item.text === "All Filter & Sort by" ? toggleDrawer : undefined
            }
          />
        ))}
      </div>
      <div className={styles.productsLength}>328 Products</div>
      <SideDrawer isOpen={isDrawerOpen} onClose={() => setDrawerOpen(false)}>
        <Accordion
          item={accordionItem}
          setSubMenu={setSubMenu}
          subMenu={subMenu}
          showArrow={true}
        >
          <PriceRangeFilter />
        </Accordion>
      </SideDrawer>
    </div>
  );
};

export default FilterBar;
