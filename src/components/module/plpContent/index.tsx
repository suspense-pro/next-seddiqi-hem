import React, { useState, useRef } from "react";
import FilterBar from "../filterBar";
import styles from "./productsContnet.module.scss";
import GridWrapper from "../gridWrapper";
import ProductCard from "../cards/productCard";
import { ComponentMapping } from "@utils/cms/config";
import { generateUniqueId } from "@utils/helpers/uniqueId";
import { dummyProducts } from "./dummyProducts";
import Button from "../button";

// TEMP
const LOAD_MORE_TEXT = "Load More";

const PlpContent = ({ productGridContent, products }) => {
  if (!products) return null;

  const allProducts = dummyProducts();
  const allHits = products?.hits; //allProducts for dummy

  // console.log(
  //   "products------",
  //   products,
  //   "allProducts------------------",
  //   allProducts
  // );

  const [displayedProducts, setDisplayedProducts] = useState(
    allHits.slice(0, 24)
  );
  const [currentIndex, setCurrentIndex] = useState(24);
  const [isAllLoaded, setIsAllLoaded] = useState(false);
  const productsRef = useRef(null);
  const isButtonDisabled = allHits.length <= 24 || isAllLoaded;
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

  const PRODUCT_INFO_TEXT = `Showing ${displayedProducts.length} out of ${allHits.length} products`;

  return (
    <div ref={productsRef}>
      <div className={styles.container}>
        <FilterBar />
        <GridWrapper>
          {displayedProducts.map((item, ind) => (
            <ProductCard
              key={generateUniqueId()}
              item={{ ...item, tempId: ind + 1 }}
            />
          ))}
          {productGridContent.length > 0 &&
            productGridContent.map((item) => {
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
      </div>
    </div>
  );
};

export default PlpContent;
