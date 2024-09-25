import React, { useState, useRef, useEffect } from "react";
import { useRouter } from "next/router";
import FilterBar from "../filterBar";
import styles from "./productsContnet.module.scss";
import GridWrapper from "../gridWrapper";
import ProductCard from "../cards/productCard";
import { ComponentMapping } from "@utils/cms/config";
import { generateUniqueId } from "@utils/helpers/uniqueId";
import Button from "../button";
import { setFilters } from "@utils/sfcc-connector/dataService";
import Typography from "../typography";
import Loader from "../loader";

const LOAD_MORE_TEXT = "Load More";

const PlpContent = ({ productGridContent, products }) => {
  // console.log("products", products);

  if (!products) return null;

  const router = useRouter();

  const categoryId =
    products?.query?.TermQuery?.values?.[0] || "mens-clothing-suits";

  const allHits = products?.hits || [];

  const [filters, setFiltersState] = useState(null);
  const [displayedProducts, setDisplayedProducts] = useState(
    allHits.slice(0, 24)
  );
  const [currentIndex, setCurrentIndex] = useState(24);
  const [isAllLoaded, setIsAllLoaded] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const productsRef = useRef(null);
  const isButtonDisabled = displayedProducts.length <= 24 || isAllLoaded;

  const [hasInitializedFilters, setHasInitializedFilters] = useState(false);

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

  useEffect(() => {
    if (!router.isReady || hasInitializedFilters) return;

    const initializeFiltersFromUrl = () => {
      const urlFilters = {};

      Object.keys(router.query).forEach((key) => {
        if (key.startsWith("filter_")) {
          const filterKey = key.replace("filter_", "");
          const value = router.query[key];

          if (Array.isArray(value)) {
            urlFilters[filterKey] = value;
          } else {
            urlFilters[filterKey] = [value];
          }
        }

        if (key === "sort") {
          urlFilters["sortOption"] = router.query[key];
        }
      });

      setFiltersState(urlFilters);
      setHasInitializedFilters(true);
    };

    initializeFiltersFromUrl();
  }, [router.isReady, hasInitializedFilters]);

  useEffect(() => {
    if (filters === null) return;

    const updateUrlWithFilters = () => {
      const newQuery = { ...router.query };

      Object.keys(newQuery).forEach((key) => {
        if (key.startsWith("filter_") || key === "sort") {
          delete newQuery[key];
        }
      });

      Object.keys(filters).forEach((filterKey) => {
        if (filterKey === "sortOption") {
          newQuery["sort"] = filters[filterKey];
        } else {
          const filterValues = filters[filterKey];
          if (Array.isArray(filterValues)) {
            newQuery[`filter_${filterKey}`] = filterValues;
          } else if (filterValues) {
            newQuery[`filter_${filterKey}`] = [filterValues];
          }
        }
      });

      const isSameQuery =
        JSON.stringify(newQuery) === JSON.stringify(router.query);
      if (!isSameQuery) {
        router.replace(
          {
            pathname: router.pathname,
            query: newQuery,
          },
          undefined,
          { shallow: true }
        );
      }
    };

    updateUrlWithFilters();
  }, [filters, router]);

  useEffect(() => {
    if (filters === null) return;

    const fetchFilteredProducts = async () => {
      setIsLoading(true);
      try {
        if (Object.keys(filters).length === 0) {
          setDisplayedProducts(allHits.slice(0, 24));
          setCurrentIndex(24);
          setIsAllLoaded(allHits.length <= 24);
        } else {
          const { sortOption, ...otherFilters } = filters;
          const res = await setFilters({
            method: "GET",
            categoryId: categoryId,
            filters: otherFilters,
            sortOption: sortOption,
          });

          if (res && res.hits) {
            setDisplayedProducts(res.hits.slice(0, 24));
            setCurrentIndex(24);
            setIsAllLoaded(res.hits.length <= 24);
          } else {
            setDisplayedProducts([]);
            setIsAllLoaded(true);
          }
        }
      } catch (error) {
        console.error("Error fetching products:", error);
        setDisplayedProducts([]);
        setIsAllLoaded(true);
      } finally {
        setIsLoading(false);
      }
    };

    fetchFilteredProducts();
  }, [filters, categoryId]);

  const totalProducts = products?.total || allHits.length;
  const PRODUCT_INFO_TEXT = `Showing ${displayedProducts.length} out of ${totalProducts} products`;

  return (
    <div ref={productsRef}>
      <div className={styles.container}>
        <FilterBar
          filters={filters || {}}
          onFilterChange={setFiltersState}
          totalProducts={totalProducts}
          categoryId={categoryId}
        />

        {displayedProducts.length > 0 ? (
          <>
            <GridWrapper>
              {displayedProducts.map((item, ind) => (
                <ProductCard
                  key={generateUniqueId()}
                  item={{ ...item, tempId: ind + 1 }}
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
                <div>
                  <Button
                    title={LOAD_MORE_TEXT}
                    type="solid green_dark"
                    disabled={isButtonDisabled}
                    clickHandler={loadMoreProducts}
                  />
                </div>
              )}
            </div>
          </>
        ) : (
          <Typography align="center" variant="h4" className={styles.noProducts}>
            No products found!!
          </Typography>
        )}

        {isLoading && <Loader />}
      </div>
    </div>
  );
};

export default PlpContent;
