import React from "react";
import styles from "./popularProducts.module.scss";
import Typography from "../../typography";
import ProductCard from "../../cards/productCard";

const PopularProducts = ({
  popularBrands,
  popularSearches,
  productSuggestions,
}) => {
  return (
    <div className={styles.tabContainer}>
      <div className={styles.listsContainer}>
        <Typography variant="p" className={styles.popularSearch}>
          Popular Searches
        </Typography>
        <ul className={styles.popularSearchListStyle}>
          {popularSearches.map((search, index) => (
            <li key={index}>{search}</li>
          ))}
        </ul>
        <Typography variant="p" className={styles.popularBrands}>
          Popular Brands
        </Typography>
        <ul className={styles.popularBrandListStyle}>
          {popularBrands.map((brand, index) => (
            <li key={index}>{brand}</li>
          ))}
        </ul>
      </div>
      <div className={styles.productContainer}>
        <Typography variant="p" className={styles.popularProducts}>
          Popular Products
        </Typography>
        <div className={styles.productList}>
          {productSuggestions.slice(0, 3).map((product, index) => (
            <ProductCard
              key={index}
              item={{
                ...product,
                image: { absUrl: product.image?.link },
              }}
              isCarousel={false}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default PopularProducts;
