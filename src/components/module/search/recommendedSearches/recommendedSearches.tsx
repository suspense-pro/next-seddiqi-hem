import React from "react";
import styles from "./recommendedSearches.module.scss";
import Typography from "../../typography";
import ProductCard from "../../cards/productCard";
import { Button } from "@components/module";
import Image from "@components/module/image";
import { useRouter } from 'next/router';

const noProductImage = "/images/jpg/noProductImage.jpg";

const RecommendedSearches = ({ categoryDetails, productRecommendation, searchTerm  }) => {
  const router = useRouter();
  const allProductRecommendations = productRecommendation?.map((product: { id: string }) => product.id);

  const highlightMatch = (text, searchTerm) => {
    if (!searchTerm) return text;
    // Creating a dynamic regex pattern to match case-insensitive search term anywhere in the text
    const regex = new RegExp(`(${searchTerm})`, 'gi');
    // Replacing the matched text with a span wrapped around it with the "highlighted" class
    return text.split(regex).map((part, index) =>
      part.toLowerCase() === searchTerm.toLowerCase() ? (
        <span key={index} className={styles.highlighted}>{part}</span>
      ) : (
        part
      )
    );
  };
  
  const handleCategoryClick = (category) => {
    router.push(`/${category.toLowerCase()}`);
  };

  // const handleViewAllClick = () => {
  //   console.log("productRecommendation",productRecommendation)

  //   const allProductRecommendations = productRecommendation.map((product) => (product.id));
    
  //   console.log("allProductRecommendations",allProductRecommendations)
  //   router.push({
  //     pathname: '/search',
  //     query: { recommendations: JSON.stringify(allProductRecommendations) },
  //   });
  // };


  const handleViewAllClick = () => {
    if (typeof window !== "undefined") {
      // Store the recommendations in sessionStorage
      sessionStorage.setItem("allProductRecommendations", JSON.stringify(allProductRecommendations));
      window.open("/search", "_blank");
    }
  };
  
  return (
    <div className={styles.tabContainer}>
      <div className={styles.listsContainer}>
        <Typography variant="p" className={styles.popularSearch}>
          In Categories
        </Typography>
        <ul className={styles.popularBrandListStyle}>
        {categoryDetails.map((category, index) => (
            <li key={index}>
              <a
                href={`/${category.toLowerCase()}`}
                target="_blank"
                rel="noopener noreferrer"
              >
                {highlightMatch(category, searchTerm)}
              </a>
            </li>
          ))}
        </ul>
      </div>
      <div className={styles.productContainer}>
        <div className={styles.recommendedLabel}>
        <Typography variant="p" className={styles.popularProducts}>
          Recommended Collection
        </Typography>
        </div>

        <div className={styles.productList}>
          {Array.isArray(productRecommendation) &&
          productRecommendation.length > 0 && (
            productRecommendation.map((product, index) => (             
              <div key={index} className={styles.productCardContainer}>
                {/* Conditional rendering of image */}
                {product?.imageGroups?.images?.length > 0 ? (
                  <img
                    className={styles.image}
                    src={product?.imageGroups?.images?.[0]?.link}
                    alt={product?.imageGroups?.images?.[0]?.alt || 'Product Image'}
                  />
                ) : (
                  <img
                    className={styles.image}
                    src={noProductImage}
                    alt="noProductImage"
                  />
                )}
                <div className={styles.content}>
                  <Typography
                    align="left"
                    variant="span"
                    className={styles.brandName}
                  >
                    {product.c_brandName}
                  </Typography>
                  <Typography
                    align="left"
                    variant="span"
                    className={styles.modelName}
                  >
                    {product.c_model}
                  </Typography>
                  {product?.price && (
                  <div className={styles.priceWrapper}>
                    <span className={styles.currency}>{product.currency}</span>
                    <span  className={styles.price}>{product.price}</span></div>
                  )}
                </div>
            
              </div>
            ))
          )}
        </div>
        <div className={styles.viewAllBtnContainer}>
          <Button
            isLink={false}
            link={""}
            className={styles.viewAllBtn}
            title={"View All"}
            color="green_dark"
            type={"Plain"}
            clickHandler={handleViewAllClick}
          />
        </div>
      </div>
    </div>
  );
};

export default RecommendedSearches;
