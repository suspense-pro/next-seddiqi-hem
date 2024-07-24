import React, { useState } from "react";
import styles from "./filterBar.module.scss";
import FilterBtn from "../filterBtn";
import SideDrawer from "../sideDrawer";
import PriceRangeFilter from "../allFilters/priceRangeFilter";
import SortFilter from "../allFilters/sortFilter";
import { FilterAccordian, FilterAccordionItem } from "../filterAccordian";
import CheckboxFilter from "../checkboxFilter";
import ColorFilter from "../allFilters/colorFilter";
import Typography from "../typography";
import { CloseIcon } from "@assets/images/svg";

const FILTERS = [
  { icon: true, text: "All Filter & Sort by" },
  { icon: false, text: "New" },
  { icon: false, text: "Exclusive" },
  { icon: false, text: "Gifts" },
  { icon: false, text: "Messika" },
  { icon: false, text: "Bvlgari" },
];

const brandOptions = [
  "Rolex",
  "Patek Philippe",
  "Akrivia",
  "Audemars Piguet",
  "Bell & Ross",
  "Bovet",
  "Breitling",
  "Bvlgari",
  "Brand I",
  "Brand J",
  "Brand K",
  "Brand L",
];

const sizeOptions = ["Small (<31mm)", "Medium (31mm - 39mm)", "Large (>39mm)"];

const movementOptions = [
  "Automatic Movement",
  "Quartz Movement",
  "Manual Movement",
  "Mechanical Movement",
  "Hybrid Movement",
];

const strapOptions = [
  "Alligator",
  "Beef",
  "Ceramic",
  "Fabric",
  "Gold/Steel",
  "Kevlar",
];

const faceShapeOptions = [
  "Oval",
  "Cushion",
  "Octagonal",
  "Rectangular",
  "Round",
  "Square",
];

const FilterBar = () => {
  const [isDrawerOpen, setDrawerOpen] = useState(false);
  const [selectedOptions, setSelectedOptions] = useState<string[]>([]);

  const toggleDrawer = () => {
    setDrawerOpen(!isDrawerOpen);
  };

  const handleOptionChange = (option: string) => {
    setSelectedOptions((prevSelected) =>
      prevSelected.includes(option)
        ? prevSelected.filter((selected) => selected !== option)
        : [...prevSelected, option]
    );
  };

  const handleDelete = (option: string) => {
    setSelectedOptions((prevSelected) =>
      prevSelected.filter((selected) => selected !== option)
    );
  };

  return (
    <div className={styles.container}>
      <div className={styles.filterBtns}>
        {FILTERS.map((item, index) => (
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
        {selectedOptions && selectedOptions.length > 0 && (
          <div className={styles.selectedOptions}>
            {selectedOptions.map((option, index) => (
              <div key={index} className={styles.selectedOption}>
                <Typography align="left" variant="p" className={styles.option}>
                  {option}
                </Typography>{" "}
                <div
                  className={styles.deleteOption}
                  onClick={() => handleDelete(option)}
                >
                  <CloseIcon />
                </div>
              </div>
            ))}
          </div>
        )}
        <FilterAccordian>
          <FilterAccordionItem title="Sort">
            <SortFilter />
          </FilterAccordionItem>
          <FilterAccordionItem title="Brand">
            <CheckboxFilter
              title="Brand"
              options={brandOptions}
              hasSearch={true}
              onOptionChange={handleOptionChange}
              selectedOptions={selectedOptions}
            />
          </FilterAccordionItem>
          <FilterAccordionItem title="Size">
            <CheckboxFilter
              title="Size"
              options={sizeOptions}
              onOptionChange={handleOptionChange}
              selectedOptions={selectedOptions}
            />
          </FilterAccordionItem>
          <FilterAccordionItem title="Movement">
            <CheckboxFilter
              title="Movement"
              options={movementOptions}
              onOptionChange={handleOptionChange}
              selectedOptions={selectedOptions}
            />
          </FilterAccordionItem>
          <FilterAccordionItem title="Strap Material">
            <CheckboxFilter
              title="Strap Material"
              options={strapOptions}
              onOptionChange={handleOptionChange}
              selectedOptions={selectedOptions}
            />
          </FilterAccordionItem>
          <FilterAccordionItem title="Face Shape">
            <CheckboxFilter
              title="Face Shape"
              options={faceShapeOptions}
              onOptionChange={handleOptionChange}
              selectedOptions={selectedOptions}
            />
          </FilterAccordionItem>
          <FilterAccordionItem title="Color">
            <ColorFilter />
          </FilterAccordionItem>
          <FilterAccordionItem title="Price">
            <PriceRangeFilter />
          </FilterAccordionItem>
        </FilterAccordian>
      </SideDrawer>
    </div>
  );
};

export default FilterBar;
