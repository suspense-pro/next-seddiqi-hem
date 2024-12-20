import React, { useState, useRef, useEffect } from "react";
// import { useRouter } from "next/router";
import FilterBar from "../filterBar";
import styles from "./productsContent.module.scss";
import GridWrapper from "../gridWrapper";
import ProductCard from "../cards/productCard";
import { ComponentMapping } from "@utils/cms/config";
import { generateUniqueId } from "@utils/helpers/uniqueId";
import Button from "../button";
import {
  getCategoryFilters,
  getProductListing,
  setFilters,
} from "@utils/sfcc-connector/dataService";
import Typography from "../typography";
import Loader from "../loader";
import ScrollToTop from "../scrollToTop";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { filterObjectRemoveEmptyKey, removeEmptyObjectsByKeys } from "@utils/helpers/removeEmptyObject";

const LOAD_MORE_TEXT = "Load More";

const PlpContent = ({ productGridContent, products }) => {
  const [getProducts, setProducts] = useState(products);

  const categoryId = getProducts?.query?.TermQuery?.values?.[0] || "";
  const [allHits, setAllHits] = useState(
    Array.isArray(getProducts) ? getProducts : getProducts?.hits || []
  );

  const [filters, setFiltersState] = useState(null);
  const [displayedProducts, setDisplayedProducts] = useState(
    (Array.isArray(getProducts) ? getProducts : getProducts?.hits)?.slice(0, 24)
  );
  const [currentIndex, setCurrentIndex] = useState(24);
  const [isAllLoaded, setIsAllLoaded] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [hasInitializedFilters, setHasInitializedFilters] = useState(false);
  const [filterOptions, setFilterOptions] = useState([]);

  const productsRef = useRef(null);
  const [isButtonDisabled, setIsButtonDisabled] = useState(
    getProducts?.total <= 24 || isAllLoaded
  );

  const loadMoreProducts = () => {
    const currentScrollPos = window.scrollY;

    const nextIndex = currentIndex + 24;
    const newProducts = allHits.slice(currentIndex, nextIndex);

    setDisplayedProducts((prevProducts) => [...prevProducts, ...newProducts]);
    setCurrentIndex(nextIndex);

    if (nextIndex >= allHits.length) {
      setIsAllLoaded(true);
    }

    window.scrollTo({
      top: currentScrollPos,
      behavior: "smooth",
    });
  };

  const searchParams = useSearchParams();

  // useEffect(() => {
  // if (!router.isReady || hasInitializedFilters) return;

  // const initializeFiltersFromUrl = () => {
  //   const urlFilters = {};

  //   Object.keys(router.query).forEach((key) => {
  //     if (key !== "sort") {
  //       const filterKey = key;
  //       const value = router.query[key];

  //       if (Array.isArray(value)) {
  //         urlFilters[filterKey] = value;
  //       } else {
  //         urlFilters[filterKey] = [value];
  //       }
  //     }

  //     if (key === "sort") {
  //       urlFilters["sortOption"] = router.query[key];
  //     }
  //   });

  //   setFiltersState(urlFilters);
  //   setHasInitializedFilters(true);
  // };

  // initializeFiltersFromUrl();
  // }, [router.isReady, hasInitializedFilters]);

  // useEffect(() => {
  // if (filters === null) return;

  // const updateUrlWithFilters = () => {
  //   const newQuery = { ...router.query };

  //   Object.keys(newQuery).forEach((key) => {
  //     if (key === "sort") {
  //       delete newQuery[key];
  //     }
  //   });

  //   Object.keys(filters).forEach((filterKey) => {
  //     if (filterKey === "sortOption") {
  //       newQuery["sort"] = filters[filterKey];
  //     } else {
  //       const filterValues = filters[filterKey];

  //       if (Array.isArray(filterValues)) {
  //         newQuery[`${filterKey}`] = filterValues;
  //       } else if (filterValues) {
  //         newQuery[`${filterKey}`] = [filterValues];
  //       }
  //     }
  //   });

  //   const isSameQuery =
  //     JSON.stringify(newQuery) === JSON.stringify(router.query);

  //   console.log(JSON.stringify(newQuery));
  //   console.log(JSON.stringify(router.query));

  //   // if (!isSameQuery) {
  //   //   router.replace(
  //   //     {
  //   //       pathname: router.pathname,
  //   //       query: newQuery,
  //   //     },
  //   //     undefined,
  //   //     { shallow: true }
  //   //   );
  //   // } else {
  //   // }
  // };

  // updateUrlWithFilters();
  // }, []);
  const fetchAllProductsByCategoryId = async () => {
    setIsLoading(true);

    const products = await getProductListing({
      categoryId: categoryId,
      method: "POST",
    });

    if (!products.productResults) {
      return null;
    }

    setProducts(products?.productResults);

    setAllHits(
      Array.isArray(getProducts) ? getProducts : getProducts?.hits || []
    );
    setDisplayedProducts(
      (Array.isArray(getProducts) ? getProducts : getProducts?.hits).slice(
        0,
        24
      )
    );
    setFiltersState(null);
    setCurrentIndex(24);
    setIsAllLoaded(false);
    setIsButtonDisabled(products?.productResults.total <= 24);
    setIsLoading(false);
  };

  const fetchFilteredProducts = async (selectedFilters) => {
    setIsLoading(true);

    // console.log({ selectedFilters });

    let updatedselectedFilters = filterObjectRemoveEmptyKey(selectedFilters);
    //console.log("updated filter:", updatedselectedFilters);


    setFiltersState(updatedselectedFilters);

    try {
      if (Object.keys(updatedselectedFilters).length === 0) {
        //setDisplayedProducts(allHits.slice(0, 24));
        //setCurrentIndex(24);
        //setIsAllLoaded(allHits.length < 24);
        fetchAllProductsByCategoryId();

      } else {
        const { sortOption, ...otherFilters } = updatedselectedFilters;

        //console.log({ otherFilters });

        const res = await setFilters({
          method: "GET",
          categoryId: categoryId,
          filters: otherFilters,
          // sortOption: sortOption,
        });

        //console.log("res: ", res);
        //console.log("res.hits: ", res.hits);

        if (res && res.hits) {
          
          setDisplayedProducts(res.hits.slice(0, 24));
          setCurrentIndex(24);
          setIsAllLoaded(res.hits.length <= 24);
          setAllHits(res.hits);
          setIsButtonDisabled(res.hits.length <= 24);
          setFilterOptions(res.refinements);
          setIsLoading(false);
          
        } else {
          setDisplayedProducts([]);
          setIsAllLoaded(false);
          setAllHits(Array.isArray(products) ? products : products?.hits || []);
          setIsLoading(false);
        }
      }
    } catch (error) {
      console.error("Error fetching products:", error);
      setDisplayedProducts([]);
      setIsAllLoaded(true);
      setIsLoading(false);
    } 
  };

  
/*
  useEffect(() => {
    const params = Object.fromEntries(searchParams.entries());

    console.log({params});
    

    if(Object.keys(params).length < 1) return () => {};

    fetchFilteredProducts(params);
    
  }, [searchParams]);
  */


  // useEffect(() => {
  //   if (filters === null) return;

  //   fetchFilteredProducts();
  // }, []);

  const PRODUCT_INFO_TEXT = `Showing ${displayedProducts?.length} out of ${
    allHits.length
  } ${allHits.length === 1 ? "product" : "products"}`;

  return (
    <div ref={productsRef}>
      <div className={styles.container}>
        <FilterBar
          filters={filters || {}}
          onFilterChange={fetchFilteredProducts}
          totalProducts={allHits.length}
          categoryId={categoryId}
          setFilterOptions={setFilterOptions}
          filterOptions={filterOptions}
          resetProducts={fetchAllProductsByCategoryId}
        />

        {displayedProducts?.length > 0 ? (
          <>
            <GridWrapper>
              {displayedProducts.map((item, ind) => (
                <ProductCard
                  key={generateUniqueId()}
                  item={{ ...item, tempId: ind + 1 }}
                  hasCarousel
                />
              ))}
              {productGridContent?.length > 0 &&
                productGridContent?.map((item) => {
                  const Component =
                    ComponentMapping[item?.component?._meta?.schema];
                  return (
                    <div
                      className={styles.contentComponent}
                      style={{ order: item?.position?.slice(-1) }}
                      key={generateUniqueId()}
                    >
                      <Component {...item.component} />
                    </div>
                  );
                })}
            </GridWrapper>
            <div className={styles.bottom}>
              <div className={styles.productInfo}>{PRODUCT_INFO_TEXT}</div>
              {!isAllLoaded && (
                // <div>
                <Button
                  title={LOAD_MORE_TEXT}
                  type="solid metallic"
                  disabled={isButtonDisabled}
                  clickHandler={loadMoreProducts}
                />
                // </div>
              )}
            </div>
          </>
        ) : (
          <Typography align="center" variant="h4" className={styles.noProducts}>
            No products found.
          </Typography>
        )}

        {isLoading && <Loader />}
      </div>
      <ScrollToTop />
    </div>
  );
};

export default PlpContent;
