import FilterBar from "../filterBar";
import styles from "./productsContnet.module.scss";
import GridWrapper from "../gridWrapper";
import ProductCard from "../cards/productCard";

// TEMP
const PRODUCT_INFO_TEXT = "Showing 20 out of 210 products";
const LOAD_MORE_TEXT = "Load More";

const PlpContent = ({ products }) => {
  if (!products || products.length === 0) return null;
  const cols = products[0]?.cols?.length;

  return (
    <div>
      <div className={styles.container}>
        <FilterBar />
        <GridWrapper cols={cols}>
          {products?.map((item) => (
            <ProductCard key={item?.tempId} item={item} />
          ))}
        </GridWrapper>
        <div className={styles.bottom}>
          <div className={styles.productInfo}>{PRODUCT_INFO_TEXT}</div>
          <div className={`${styles.loadMore} button`}>{LOAD_MORE_TEXT}</div>
        </div>
      </div>
    </div>
  );
};

export default PlpContent;
