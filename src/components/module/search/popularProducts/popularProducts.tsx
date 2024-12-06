import React, { useState } from "react";
import styles from "./popularProducts.module.scss";
import Typography from "../../typography";
import ProductCard from "../../cards/productCard";
import { generateUniqueId } from "@utils/helpers/uniqueId";
import { useRouter } from "next/router";
import Image from "next/image";
import Link from "next/link";
const noProductImage = "/images/jpg/noProductImage.jpg";

function cn(...classes) {
  return classes.filter(Boolean).join(" ");
}

const PopularProducts = ({
  popularBrands,
  popularSearches,
  productSuggestions,
}) => {
  const [isLoading, setLoading] = useState(true);
  console.log("productSuggestions", productSuggestions);
  const router = useRouter();

  const handleNavigation = (type, value) => {
    if (type === "search") {
      router.push(`/${value.toLowerCase()}`);
    } else if (type === "brand") {
      router.push(`/${value.toLowerCase()}`);
    }
  };
  return (
    <div className={styles.tabContainer}>
      <div className={styles.listsContainer}>
        <Typography variant="p" className={styles.popularSearch}>
          Popular Searches
        </Typography>
        <ul className={styles.popularSearchListStyle}>
          {popularSearches.map((search, index) => (
            <li key={index}>
              <a
                href={`/${search.toLowerCase()}`}
                target="_blank"
                rel="noopener noreferrer"
              >
                {search}
              </a>
            </li>
          ))}
        </ul>
        <Typography variant="p" className={styles.popularBrands}>
          Popular Brands
        </Typography>
        <ul className={styles.popularBrandListStyle}>
          {popularBrands.map((brand, index) => (
            <li key={index}>
              <a
                href={`/${brand.toLowerCase()}`}
                target="_blank"
                rel="noopener noreferrer"
              >
                {brand}
              </a>
            </li>
          ))}
        </ul>
      </div>
      <div className={styles.productContainer}>
        <Typography variant="p" className={styles.popularProducts}>
          Popular Products
        </Typography>
        <div className={styles.productList}>
          {Array.isArray(productSuggestions?.data) &&
            productSuggestions?.data?.length > 0 &&
            productSuggestions?.data.map((product, index) => (
              //   <ProductCard
              //   key={generateUniqueId()}
              //   item={{ ...product, tempId: index}}
              //   hasCarousel
              // />
              <Link href={`/products/${product.id}`} className="group">
                <div className={styles.popularProductCard}>
                  <Link href={`/products/${product.id}`} className="group">
                    <div className={styles.productImageContainer}>
                      {product?.imageGroups?.images?.length > 0 ? (
                        <Image
                          alt="product image"
                          src={product.imageGroups[0]?.images[0].link}
                          fill
                          className={cn(
                            "object-cover duration-700 ease-in-out group-hover:opacity-75",
                            isLoading
                              ? "scale-110 blur-2xl grayscale"
                              : "scale-100 blur-0 grayscale-0"
                          )}
                          onLoad={() => setLoading(false)}
                        />
                      ) : (
                        <img
                          src={noProductImage}
                          alt="noProductImage"
                          className={cn(
                            "object-cover duration-700 ease-in-out group-hover:opacity-75",
                            isLoading
                              ? "scale-110 blur-2xl grayscale"
                              : "scale-100 blur-0 grayscale-0"
                          )}
                          onLoad={() => setLoading(false)}
                        />
                      )}
                    </div>

                    <div className={styles.productInfo}>
                    {product?.c_brandName && (
                      <p>{product.c_brandName}</p>
                    )}
                    {product?.c_model && (
                      <p>{product.c_model}</p>
                    )}
                    </div>
                  </Link>
                </div>
              </Link>
            ))}
        </div>
      </div>
    </div>
  );
};

export default PopularProducts;
