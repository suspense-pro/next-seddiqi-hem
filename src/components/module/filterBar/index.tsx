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
import { getCategoryFilters } from "@utils/sfcc-connector/dataService";

const FILTERS = [
  { icon: true, text: "All Filter & Sort by" },
  { icon: false, text: "New" },
  { icon: false, text: "Exclusive" },
  { icon: false, text: "Gifts" },
  { icon: false, text: "Messika" },
  { icon: false, text: "Bvlgari" },
];

const FilterBar = ({
  filters: initialFilters,
  onFilterChange,
  totalProducts,
  categoryId,
}) => {
  const [isDrawerOpen, setDrawerOpen] = useState(false);
  const [filters, setFiltersState] = useState(initialFilters || {});
  const [filterOptions, setFilterOptions] = useState([]);
  const [sortingOptions, setSortingOptions] = useState([]);

  useEffect(() => {
    const fetchCategoryFilters = async () => {
      try {
        const response = await getCategoryFilters({
          method: "GET",
          cgid: categoryId,
        });
        console.log("response-------", response);
        if (response && response.refinements) {
          setFilterOptions(response.refinements);
        }

        if (response && response.sortingOptions) {
          setSortingOptions(response.sortingOptions);
        }
      } catch (error) {
        console.error("error-", error);
      }
    };

    fetchCategoryFilters();
  }, [categoryId]);

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

  const handleSortChange = (selectedSortOption) => {
    setFiltersState((prevFilters) => ({
      ...prevFilters,
      sortOption: selectedSortOption,
    }));
  };

  const handleDelete = (filterKey, option) => {
    setFiltersState((prevFilters) => {
      if (filterKey === "sortOption") {
        return { ...prevFilters, sortOption: undefined };
      }

      const prevSelectedOptions = prevFilters[filterKey] || [];

      if (Array.isArray(prevSelectedOptions)) {
        const newSelectedOptions = prevSelectedOptions.filter(
          (selected) => selected !== option
        );

        return { ...prevFilters, [filterKey]: newSelectedOptions };
      }

      return prevFilters;
    });
  };

  const handleSubmit = () => {
    const filteredFilters = Object.keys(filters).reduce((acc, key) => {
      if (
        (Array.isArray(filters[key]) && filters[key].length > 0) ||
        (typeof filters[key] === "string" && filters[key].length > 0) ||
        key === "sortOption"
      ) {
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
      <div className={styles.productsLength}>{totalProducts} Products</div>
      <SideDrawer
        isOpen={isDrawerOpen}
        onClose={() => setDrawerOpen(false)}
        onSubmit={handleSubmit}
        onClearAll={handleClearAll}
        showFooter={true}
        showBackButton={false}
        position={""}
      >
        <div className={styles.selectedOptions}>
          {Object.keys(filters).map((filterKey) =>
            Array.isArray(filters[filterKey])
              ? filters[filterKey].map((option, index) => (
                  <div key={index} className={styles.selectedOption}>
                    <Typography
                      align="left"
                      variant="p"
                      className={styles.option}
                    >
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
              : null
          )}
          {filters.sortOption && (
            <div className={styles.selectedOption}>
              <Typography align="left" variant="p" className={styles.option}>
                {sortingOptions.find(
                  (option) => option.id === filters.sortOption
                )?.label || filters.sortOption}
              </Typography>
              <div
                className={styles.deleteOption}
                onClick={() => handleDelete("sortOption", filters.sortOption)}
              >
                <CloseIcon />
              </div>
            </div>
          )}
        </div>

        <FilterAccordian>
          <FilterAccordionItem title="Sort">
            <SortFilter
              sortingOptions={sortingOptions}
              selectedSortOption={filters.sortOption}
              onSortChange={handleSortChange}
            />
          </FilterAccordionItem>
          {filterOptions.map((filterItem) => (
            <FilterAccordionItem
              key={filterItem.attributeId}
              title={filterItem.label}
            >
              {filterItem.values && (
                <CheckboxFilter
                  title={filterItem.label}
                  options={filterItem.values.map((val) => val.label)}
                  filterKey={filterItem.attributeId}
                  onOptionChange={handleOptionChange}
                  selectedOptions={filters[filterItem.attributeId] || []}
                />
              )}
            </FilterAccordionItem>
          ))}
          <FilterAccordionItem title="Price">
            <PriceRangeFilter />
          </FilterAccordionItem>
          <FilterAccordionItem title="Color">
            <ColorFilter />
          </FilterAccordionItem>
        </FilterAccordian>
      </SideDrawer>
    </div>
  );
};

export default FilterBar;
