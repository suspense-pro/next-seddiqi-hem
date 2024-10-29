import React from "react";
import styles from "./recommendedSearches.module.scss";
import Typography from "../../typography";
import ProductCard from "../../cards/productCard";
import { Button } from "@components/module";
import Image from "@components/module/image";
import { useRouter } from 'next/router';

const RecommendedSearches = ({ categoryDetails, productRecommendation, searchTerm  }) => {
  const router = useRouter();
  const allProductRecommendations = productRecommendation.map((product: { id: string }) => product.id);

 const highlightMatch = (text, searchTerm) => {
    if (!searchTerm) return text;

    //regex to match the whole word
    const regex = new RegExp(`\\b(${searchTerm})\\b`, 'gi');
    const parts = text.split(regex);

    return parts.map((part, index) =>
      part.toLowerCase() === searchTerm.toLowerCase() ? (
        <span key={index} className={styles.highlighted}>{part}</span>
      ) : (
        part
      )
    );
  };

  const handleViewAllClick = () => {
    const allProductRecommendations = productRecommendation.map((product) => product.id);
    router.push({
      pathname: '/search',
      query: { recommendations: JSON.stringify(allProductRecommendations) },
    });
  };
  
  return (
    <div className={styles.tabContainer}>
      <div className={styles.listsContainer}>
        <Typography variant="p" className={styles.popularSearch}>
          In Categories
        </Typography>
        <ul className={styles.popularSearchListStyle}>
          {categoryDetails.map((search, index) => (
           <li key={index}>{highlightMatch(search, searchTerm)}</li> 
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
                  image={product?.imageGroups?.images?.link}
                  imageAltText={product?.imageGroups?.images?.alt}
                />
                <div className={styles.content}>
                  <Typography
                    align="left"
                    variant="span"
                    className={styles.title}
                  >
                    {product.name}
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
