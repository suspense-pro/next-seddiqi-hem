import React from "react";
import styles from "./recommendedSearches.module.scss";
import Typography from "../../typography";
import ProductCard from "../../cards/productCard";
import { Button } from "@components/module";
import Image from "@components/module/image";

const RecommendedSearches = ({ categoryDetails, productRecommendation }) => {
  return (
    <div className={styles.tabContainer}>
      <div className={styles.listsContainer}>
        <Typography variant="p" className={styles.popularSearch}>
          In Categories
        </Typography>
        <ul className={styles.popularSearchListStyle}>
          {categoryDetails.map((search, index) => (
            <li key={index}>{search}</li>
          ))}
        </ul>
      </div>
      <div className={styles.productContainer}>
        <Typography variant="p" className={styles.popularProducts}>
          Recommended Collection
        </Typography>

        <div className={styles.productList}>
          {Array.isArray(productRecommendation) &&
          productRecommendation.length > 0 ? (
            productRecommendation.map((product, index) => (
              <div key={index} className={styles.productCardContainer}>
                <Image
                  className={styles.image}
                  image={product.image}
                  imageAltText={product.imageAltText}
                />
                <div className={styles.content}>
                  <Typography
                    align="left"
                    variant="span"
                    className={styles.title}
                  >
                    {product.productName}
                  </Typography>
                  <div className={styles.subtitle}>{product.price}</div>
                </div>
              </div>
            ))
          ) : (
            <Typography variant="p" className={styles.noProducts}>
              No recommended products available.
            </Typography>
          )}
        </div>
        <div className={styles.viewAllBtnContainer}>
          <Button
            isLink={false}
            link={"/view-all-products"}
            className={styles.viewAllBtn}
            title={"View All"}
            color="green_dark"
            type={"Plain"}
            clickHandler={null}
          />
        </div>
      </div>
    </div>
  );
};

export default RecommendedSearches;
