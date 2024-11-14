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

// const FILTERS = [
//   { icon: true, text: "All Filter & Sort by" },
//   { icon: false, text: "New" },
//   { icon: false, text: "Exclusive" },
//   { icon: false, text: "Gifts" },
//   { icon: false, text: "Messika" },
//   { icon: false, text: "Bvlgari" },
// ];

const FilterBar = ({
  filters: initialFilters,
  onFilterChange,
  totalProducts,
  filterOptions,
  sortingOptions,
  quickFilters
}) => {

  console.log({initialFilters});
  
  const [isDrawerOpen, setDrawerOpen] = useState(false);
  const [filters, setFiltersState] = useState(initialFilters || {});
  const [openAccordionId, setOpenAccordionId] = useState(null); // Track the currently open accordion
  // const [filterOptions, setFilterOptions] = useState(filterOptions || []);
  // const [sortingOptions, setSortingOptions] = useState(sortingOptions || []);
  // const [quickFilters, setQuickFilters] = useState(quickFilters || []);

  // useEffect(() => {
    
  //   const fetchCategoryFilters = async () => {
  //     try {
  //       const response = await getCategoryFilters({
  //         method: "GET",
  //         cgid: categoryId,
  //       });
  //       console.log("response-------", response);
  //       if (response && response.refinements) {
  //         setFilterOptions(response.refinements);
  //       }

  //       if (response && response.sortingOptions) {
  //         setSortingOptions(response.sortingOptions);
  //       }

  //       if (response && response.quickFilters) {
  //         setQuickFilters(response.quickFilters);
  //       }
  //     } catch (error) {
  //       console.error("error-", error);
  //     }
  //   };

  //   fetchCategoryFilters();
  // }, [categoryId]);

  // useEffect(() => {
  //   setFiltersState(initialFilters || {});
  // }, [initialFilters]);

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

    onFilterChange(filters);
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
      const newSelectedOptions = prevSelectedOptions.filter(
        (selected) => selected !== option
      );

      return { ...prevFilters, [filterKey]: newSelectedOptions };
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

  };

  const handleClearAll = () => {
    setFiltersState({});
  };

  const handleClearCheckboxes = (filterKey) => {
    if (filterKey === "sortOption") {
      setFiltersState((prevFilters) => ({
        ...prevFilters,
        sortOption: undefined,
      }));
    } else {
      setFiltersState((prevFilters) => ({
        ...prevFilters,
        [filterKey]: [],
      }));
    }
  };

  const totalSelectedCount = filters 
  ? Object.values(filters).reduce((acc: number, curr: unknown) => {
      return acc + (Array.isArray(curr) ? curr.length : 0);
    }, 0)
  : 0;

  const toggleAccordion = (key) => {
    setOpenAccordionId(prev => (prev === key ? null : key));
  };

  return (
    <div className={styles.container}>
      <div className={styles.filterBtns}>
          {/* <FilterBtn
            label={"All Filter"}
            icon={true}
            onClick={toggleDrawer}
          />
          {quickFilters.map((item, index) => (
            <FilterBtn
              key={index}
              label={item.label}
              icon={false}
              onClick={undefined}
            />
          ))} */}
      </div>
      <div className={styles.productsLength}>{totalProducts} Products</div>
      <SideDrawer
        isOpen={isDrawerOpen}
        onClose={() => setDrawerOpen(false)}
        onSubmit={null}
        onClearAll={handleClearAll}
        showFooter={true}
        showBackButton={false}
        position={""}
        className={""}
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
          {/* <FilterAccordionItem 
            title="Sort"
            isOpen={openAccordionId === "sort"}
            onToggle={() => toggleAccordion("sort")}
            onClear={() => handleClearCheckboxes("sortOption")}
            selectedCount={filters.sortOption ? 1 : 0}
          >
            <SortFilter
              sortingOptions={sortingOptions}
              selectedSortOption={filters.sortOption}
              onSortChange={handleSortChange}
            />
          </FilterAccordionItem> */}
          {filterOptions.map((filterItem) => (
            <FilterAccordionItem
              key={filterItem.attributeId}
              title={filterItem.label}
              isOpen={openAccordionId === filterItem.attributeId}
              onToggle={() => toggleAccordion(filterItem.attributeId)}
              onClear={() => handleClearCheckboxes(filterItem.attributeId)}
              selectedCount={filters[filterItem.attributeId]?.length || 0}
            >
              {filterItem.values &&  (!filterItem.attributeId.includes('color') && !filterItem.attributeId.includes('price')) && (
                <CheckboxFilter
                  title={filterItem.label}
                  options={filterItem.values.map((val) => val.label)}
                  filterKey={filterItem.attributeId}
                  onOptionChange={handleOptionChange}
                  selectedOptions={filters[filterItem.attributeId] || []}
                  hasSearch={filterItem.attributeId.includes('brand')}
                />
              )}

              {filterItem.attributeId.includes('price') && <PriceRangeFilter priceData={filterItem.values} />}
              {filterItem.attributeId.includes('color') &&   <ColorFilter />}

            </FilterAccordionItem>
          ))}
          {/* <FilterAccordionItem 
            title="Price"
            isOpen={openAccordionId === "price"}
            onToggle={() => toggleAccordion("price")}
            onClear={() => handleClearCheckboxes("price")}
            selectedCount={filters.price ? 1 : 0}
          >
            <PriceRangeFilter />
          </FilterAccordionItem>
          <FilterAccordionItem 
            title="Color"
            isOpen={openAccordionId === "color"}
            onToggle={() => toggleAccordion("color")}
            onClear={() => handleClearCheckboxes("color")}
            selectedCount={filters.color ? 1 : 0}
          >
            <ColorFilter />
          </FilterAccordionItem> */}
        </FilterAccordian>
      </SideDrawer>
    </div>
  );
};

export default FilterBar;
