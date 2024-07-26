import FilterBar from "../filterBar";
import styles from "./productsContnet.module.scss";
import GridWrapper from "../gridWrapper";
import ProductCard from "../cards/productCard";
import { ComponentMapping } from "@utils/cms/config";
import { generateUniqueId } from "@utils/helpers/uniqueId";

// TEMP
const LOAD_MORE_TEXT = "Load More";

const PlpContent = ({ productGridContent, products }) => {
  if (!products) return null;

  const cols = productGridContent[0]?.position?.pop() || "auto-fit";
  const PRODUCT_INFO_TEXT = `Showing ${products?.hits?.length} out of ${products?.total} products`;

  return (
    <div>
      <div className={styles.container}>
        <FilterBar />
        <GridWrapper cols={cols}>
          {products?.hits?.map((item, ind) => <ProductCard key={generateUniqueId()} item={{...item, tempId: ind + 1}} />)}
          {productGridContent?.map(item => {
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
