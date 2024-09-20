import React, { useState, useEffect } from "react";
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
  "VAN CLEEF & ARPELS",
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

const goldOptions = ["18", "22", "24"];
const availabilityOptions = ["true", "false"];
const productMetalOptions = ["YELLOW GOLD", "SILVER", "BRONZE"];

const FilterBar = ({ filters: initialFilters, onFilterChange }) => {
  const [isDrawerOpen, setDrawerOpen] = useState(false);
  const [filters, setFiltersState] = useState(initialFilters || {});

  useEffect(() => {
    setFiltersState(initialFilters || {});
  }, [initialFilters]);

  useEffect(() => {
    if (!isDrawerOpen) {
      setFiltersState(initialFilters || {});
    }
  }, [initialFilters, isDrawerOpen]);

  const toggleDrawer = () => {
    setDrawerOpen(!isDrawerOpen);
  };

  const handleOptionChange = (filterKey, option) => {
    setFiltersState((prevFilters) => {
      const prevSelectedOptions = prevFilters[filterKey] || [];
      const newSelectedOptions = prevSelectedOptions.includes(option)
        ? prevSelectedOptions.filter((selected) => selected !== option)
        : [...prevSelectedOptions, option];

      return { ...prevFilters, [filterKey]: newSelectedOptions };
    });
  };

  const handleDelete = (filterKey, option) => {
    setFiltersState((prevFilters) => {
      const prevSelectedOptions = prevFilters[filterKey] || [];
      const newSelectedOptions = prevSelectedOptions.filter(
        (selected) => selected !== option
      );

      return { ...prevFilters, [filterKey]: newSelectedOptions };
    });
  };

  const handleSubmit = () => {
    const filteredFilters = Object.keys(filters).reduce((acc, key) => {
      if (filters[key].length > 0) {
        acc[key] = filters[key];
      }
      return acc;
    }, {});

    if (onFilterChange) {
      onFilterChange(filteredFilters);
    }
    setDrawerOpen(false);
  };

  const handleClearAll = () => {
    setFiltersState({});
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
      <SideDrawer
        isOpen={isDrawerOpen}
        onClose={() => setDrawerOpen(false)}
        onSubmit={handleSubmit}
        onClearAll={handleClearAll}
      >
        <div className={styles.selectedOptions}>
          {Object.keys(filters).map((filterKey) =>
            filters[filterKey].map((option, index) => (
              <div key={index} className={styles.selectedOption}>
                <Typography align="left" variant="p" className={styles.option}>
                  {option}
                </Typography>
                <div
                  className={styles.deleteOption}
                  onClick={() => handleDelete(filterKey, option)}
                >
                  <CloseIcon />
                </div>
              </div>
            ))
          )}
        </div>
        <FilterAccordian>
          <FilterAccordionItem title="Sort">
            <SortFilter />
          </FilterAccordionItem>
          <FilterAccordionItem title="Brand">
            <CheckboxFilter
              title="Brand"
              options={brandOptions}
              hasSearch={true}
              filterKey="brand"
              onOptionChange={handleOptionChange}
              selectedOptions={filters["brand"] || []}
            />
          </FilterAccordionItem>
          <FilterAccordionItem title="Size">
            <CheckboxFilter
              title="Size"
              options={sizeOptions}
              filterKey="size"
              onOptionChange={handleOptionChange}
              selectedOptions={filters["size"] || []}
            />
          </FilterAccordionItem>
          <FilterAccordionItem title="Movement">
            <CheckboxFilter
              title="Movement"
              options={movementOptions}
              filterKey="movement"
              onOptionChange={handleOptionChange}
              selectedOptions={filters["movement"] || []}
            />
          </FilterAccordionItem>
          <FilterAccordionItem title="Strap Material">
            <CheckboxFilter
              title="Strap Material"
              options={strapOptions}
              filterKey="strapMaterial"
              onOptionChange={handleOptionChange}
              selectedOptions={filters["strapMaterial"] || []}
            />
          </FilterAccordionItem>
          <FilterAccordionItem title="Face Shape">
            <CheckboxFilter
              title="Face Shape"
              options={faceShapeOptions}
              filterKey="faceShape"
              onOptionChange={handleOptionChange}
              selectedOptions={filters["faceShape"] || []}
            />
          </FilterAccordionItem>
          <FilterAccordionItem title="Karat">
            <CheckboxFilter
              title="Karat"
              options={goldOptions}
              filterKey="c_karat"
              onOptionChange={handleOptionChange}
              selectedOptions={filters["c_karat"] || []}
            />
          </FilterAccordionItem>
          <FilterAccordionItem title="Availability">
            <CheckboxFilter
              title="Availability"
              options={availabilityOptions}
              filterKey="availability"
              onOptionChange={handleOptionChange}
              selectedOptions={filters["availability"] || []}
            />
          </FilterAccordionItem>
          <FilterAccordionItem title="Product Metal">
            <CheckboxFilter
              title="Product Metal"
              options={productMetalOptions}
              filterKey="c_productMetal"
              onOptionChange={handleOptionChange}
              selectedOptions={filters["c_productMetal"] || []}
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
