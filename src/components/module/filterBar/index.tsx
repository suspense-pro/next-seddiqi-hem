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
import Loader from "../loader";

const FilterBar = ({
  filters: initialFilters,
  onFilterChange,
  totalProducts,
  categoryId,
  setFilterOptions,
  filterOptions = [],
}) => {
  const [isDrawerOpen, setDrawerOpen] = useState(false);
  const [openAccordionId, setOpenAccordionId] = useState(null);
  const [filters, setFiltersState] = useState(initialFilters || {});
  const [sortingOptions, setSortingOptions] = useState([]);
  const [quickFilters, setQuickFilters] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchCategoryFilters = async () => {
      try {
        const response = await getCategoryFilters({
          method: "GET",
          cgid: categoryId,
        });

        // console.log("response-------", response);

        if (response && response.refinements) {
          setFilterOptions(response.refinements);
        }

        // if (response && response.sortingOptions) {
        //   setSortingOptions(response.sortingOptions);
        // }
        setIsLoading(false);
        // if (response && response.quickFilters) {
        //   setQuickFilters(response.quickFilters);
        // }
      } catch (error) {
        console.error("error-", error);
      }
    };

    fetchCategoryFilters();
  }, [categoryId]);

  // useEffect(() => {
  //   setFiltersState(initialFilters || {});
  // }, [initialFilters]);

  // useEffect(() => {
  //   if (!isDrawerOpen) {
  //     setFiltersState(initialFilters || {});
  //   }
  // }, [initialFilters, isDrawerOpen]);

  const toggleDrawer = () => {
    setDrawerOpen(!isDrawerOpen);
  };

  const handleOptionChange = (filterKey, option) => {
    setFiltersState((prevFilters) => {
      const prevSelectedOptions = prevFilters[filterKey] || [];
      const newSelectedOptions = prevSelectedOptions.includes(option)
        ? prevSelectedOptions.filter((selected) => selected !== option)
        : [...prevSelectedOptions, option];

        console.log({prevSelectedOptions});
        console.log({newSelectedOptions});
        console.log({prevFilters});
        
        
      const updatedData = { ...prevFilters , [filterKey]: newSelectedOptions };

      console.log({updatedData});
      onFilterChange(updatedData);
      return updatedData;
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
      const newSelectedOptions = prevSelectedOptions.filter(
        (selected) => selected !== option
      );

      const updatedData = { ...prevFilters, [filterKey]: newSelectedOptions};
      onFilterChange(updatedData);
      return updatedData;
    });
  };

  const handleSubmit = () => {
    const filteredFilters = Object.keys(initialFilters).reduce((acc, key) => {
      if (
        (Array.isArray(initialFilters[key]) &&
          initialFilters[key].length > 0) ||
        (typeof initialFilters[key] === "string" &&
          initialFilters[key].length > 0) ||
        key === "sortOption"
      ) {
        acc[key] = initialFilters[key];
      }
      return acc;
    }, {});

    if (onFilterChange) {
      onFilterChange(filteredFilters);
    }
  };

  const handleClearAll = () => {
    setFiltersState(null);
    onFilterChange([]);
  };

  const handleClearCheckboxes = (filterKey) => {
    if (filterKey === "sortOption") {
      setFiltersState((prevFilters) => ({
        ...prevFilters,
        sortOption: undefined,
      }));
    } else {
      setFiltersState((prevFilters) => {
        const updatedData = { ...prevFilters, [filterKey]: null };
        onFilterChange(updatedData);
        return updatedData;
      });
    }
  };

  const totalSelectedCount = initialFilters
    ? Object.values(initialFilters).reduce((acc: number, curr: unknown) => {
        return acc + (Array.isArray(curr) ? curr.length : 0);
      }, 0)
    : 0;

  const toggleAccordion = (key) => {
    setOpenAccordionId((prev) => (prev === key ? null : key));
  };

  return (
    <div className={styles.container}>
      <div className={styles.filterBtns}>
        <FilterBtn label={"All Filter"} icon={true} onClick={toggleDrawer} />
        {/* {quickFilters &&
          quickFilters.length > 0 &&
          quickFilters.map((item, index) => (
            <FilterBtn
              key={index}
              label={item.label}
              icon={false}
              onClick={undefined}
            />
          ))} */}
      </div>
      <div className={styles.sortSection}>
        {/* {sortingOptions && sortingOptions.length > 0 && (
          <SortFilter
            sortingOptions={sortingOptions}
            selectedSortOption={filters.sortOption}
            onSortChange={handleSortChange}
          />
        )} */}

        <div className={styles.productsLength}>{`${totalProducts} ${
          totalProducts === 1 ? "Product" : "Products"
        }`}</div>
      </div>

      <SideDrawer
        isOpen={isDrawerOpen}
        onClose={() => setDrawerOpen(false)}
        onSubmit={null}
        onClearAll={handleClearAll}
        showFooter={true}
        showBackButton={false}
        position={""}
        className={""}
        button2Color={"green_dark"}
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
        </div>

        {isLoading ? (
          <Loader />
        ) : (
          <FilterAccordian>
            {filterOptions.map((filterItem) => (
              <FilterAccordionItem
                key={filterItem.attributeId}
                title={filterItem.label}
                isOpen={openAccordionId === filterItem.attributeId}
                onToggle={() => toggleAccordion(filterItem.attributeId)}
                onClear={() => handleClearCheckboxes(filterItem.attributeId)}
                selectedCount={filters[filterItem.attributeId]?.length || 0}
              >
                {filterItem.values &&
                  !filterItem.attributeId.includes("color") &&
                  !filterItem.attributeId.includes("price") && (
                    <CheckboxFilter
                      title={filterItem.label}
                      options={filterItem.values
                        .filter((val) => val.hitCount > 0)
                        .map((val) => val.label)}
                      filterKey={filterItem.attributeId}
                      onOptionChange={handleOptionChange}
                      selectedOptions={filters[filterItem.attributeId] || []}
                      hasSearch={filterItem.attributeId.includes("brand")}
                    />
                  )}

                {/* {filterItem.attributeId.includes("price") && (
                <PriceRangeFilter priceData={filterItem.values} />
              )} */}
                {filterItem.attributeId.includes("color") && <ColorFilter />}
              </FilterAccordionItem>
            ))}
          </FilterAccordian>
        )}
      </SideDrawer>
    </div>
  );
};

export default FilterBar;
