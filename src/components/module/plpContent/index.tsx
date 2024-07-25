import FilterBar from "../filterBar";
import styles from "./productsContnet.module.scss";
import GridWrapper from "../gridWrapper";
import ProductCard from "../cards/productCard";
import { ComponentMapping } from "@utils/cms/config";
import { generateUniqueId } from "@utils/helpers/uniqueId";

// TEMP
const PRODUCT_INFO_TEXT = "Showing 20 out of 210 products";
const LOAD_MORE_TEXT = "Load More";

const PlpContent = ({ twoColumnImageCopy, products }) => {
  if (!products || products.length === 0) return null;
  const cols = twoColumnImageCopy[0]?.position?.pop() || "auto-fit";
  return (
    <div>
      <div className={styles.container}>
        <FilterBar />
        <GridWrapper cols={cols}>
          {products?.map((item, ind) => <ProductCard key={generateUniqueId()} item={{...item, tempId: ind + 1}} />)}
          {twoColumnImageCopy?.map(item => {
            const Component = ComponentMapping[item?.component?._meta?.schema]
            return <Component key={generateUniqueId()} item={item} />
          })}
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
