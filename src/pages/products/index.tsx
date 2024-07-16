import Layout from "@components/layout";
import React from "react";
import styles from "./products.module.scss";
import fetchStandardPageData from "@utils/cms/page/fetchStandardPageData";
import { getHierarchyChildren } from "@utils/cms/amplience";
import GridWrapper from "@components/module/gridWrapper";
import FilterBar from "@components/module/filterBar";
import ProductCard from "@components/module/cards/productCard";

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const data = await fetchStandardPageData(
    {
      content: {
        page: { key: "homepage" },
      },
    },
    context
  );
  const header = (data?.hierarchies as any)?.pages?.find(
    (data: any) => data?.root?.key === "headerNavigation"
  );
  const cardsData = await getHierarchyChildren(
    header?.content?._meta?.deliveryId
  );

  return {
    props: {
      ...data,
      cardsData,
      header,
    },
  };
}

// TEMP
const PRODUCT_INFO_TEXT = "Showing 20 out of 210 products";
const LOAD_MORE_TEXT = "Load More";

const Products = (props) => {
  const products = props?.hierarchies?.pages[2]?.content?.productGridContent;
  const cols = products[0]?.cols?.length;

  return (
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
  );
};

export default Products;

Products.Layout = Layout;
