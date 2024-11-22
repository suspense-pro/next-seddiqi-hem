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
import { usePathname, useRouter } from "next/navigation";
import { filterObjectRemoveEmptyKey, removeEmptyObjectsByKeys } from "@utils/helpers/removeEmptyObject";
import { useDeviceWidth } from "@utils/useCustomHooks";

const FilterBar = ({
  filters: initialFilters,
  onFilterChange,
  totalProducts,
  categoryId,
  setFilterOptions,
  filterOptions = [],
  resetProducts,
}) => {
  const [isDrawerOpen, setDrawerOpen] = useState(false);
  const [openAccordionId, setOpenAccordionId] = useState(null);
  const [filters, setFiltersState] = useState(initialFilters || {});
  const [sortingOptions, setSortingOptions] = useState([]);
  const [quickFilters, setQuickFilters] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const isDesktop = useDeviceWidth();
  const pathname = usePathname();
  const { replace } = useRouter();

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

  const toggleDrawer = () => {
    setDrawerOpen(!isDrawerOpen);
  };

  const handleOptionChange = (filterKey, option) => {
    setFiltersState((prevFilters) => {
      const prevSelectedOptions = prevFilters[filterKey] || [];
      const newSelectedOptions = prevSelectedOptions.includes(option)
        ? prevSelectedOptions.filter((selected) => selected !== option)
        : [...prevSelectedOptions, option];

      const updatedData = { ...prevFilters, [filterKey]: newSelectedOptions };
      //const queryString = new URLSearchParams(updatedData).toString();

      //replace(`${pathname}?${queryString}`);

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

      const updatedData = { ...prevFilters, [filterKey]: newSelectedOptions };
      //const queryString = new URLSearchParams(updatedData).toString();

      //replace(`${pathname}?${queryString}`);
      onFilterChange(updatedData);
      return updatedData;
    });
  };

  const handleClearAll = () => {
    //replace(pathname);
    setFiltersState({});
    resetProducts();
    setDrawerOpen(false);
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

        //const queryString = new URLSearchParams(filterObjectRemoveEmptyKey(updatedData)).toString();

        //replace(`${pathname}?${queryString}`);
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
        <FilterBtn label={`All Filter`} icon={true} onClick={toggleDrawer} />
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
        button2Color={"metallic"}
      >
        {Object && Object.keys(filters) && Object.keys(filters).length > 0 && (
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
        )}
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
