import React from "react";
import styles from "./filterBar.module.scss";
import FilterBtn from "../filterBtn";

const FILTERS = [
  { icon: true, text: "All Filter & Sort by" },
  { icon: false, text: "New" },
  { icon: false, text: "Exclusive" },
  { icon: false, text: "Gifts" },
  { icon: false, text: "Messika" },
  { icon: false, text: "Bvlgari" },
];

const FilterBar = () => {
  return (
    <div className={styles.container}>
      <div className={styles.filterBtns}>
        {FILTERS?.map((item, index) => (
          <FilterBtn key={index} label={item.text} icon={item.icon} />
        ))}
      </div>
      <div className={styles.productsLength}>328 Products</div>
    </div>
  );
};

export default FilterBar;
