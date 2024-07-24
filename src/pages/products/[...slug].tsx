import Layout from "@components/layout";
import React from "react";
import fetchStandardPageData from "@utils/cms/page/fetchStandardPageData";
import { getHierarchyChildren } from "@utils/cms/amplience";
import { GetServerSidePropsContext } from "next";
import { PlpContent } from "@components/module";
import { getProductListing } from "@utils/sfcc-connector/dataService";

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const { slug = [] } = context.params || {};
  const plpKey = Array.isArray(slug) ? slug.join('/') : slug;
  const { vse } = context.query || {};
  
  const data = await fetchStandardPageData(
    {
      content: {
        page: { key: `products/${plpKey}` },
      },
    },
    context
  );

  const prods = await getProductListing({categoryId: "mens-clothing-suits", method: "POST"});
  console.log({prods});
  

  return {
    props: {
      ...data,
    },
  };
}

const Products = (props) => {
  const products = props?.hierarchies?.pages[2]?.content?.productGridContent;
  return <PlpContent products={products} />;
};

export default Products;

Products.Layout = Layout;
