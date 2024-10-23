import React from "react";
import fetchStandardPageData from "@utils/cms/page/fetchStandardPageData";
import { GetServerSidePropsContext, InferGetServerSidePropsType } from "next";
import { Search } from "@components/module";
import Layout from "@components/layout";
import { PlpContent } from "@components/module";
import { getProductListing } from "@utils/sfcc-connector/dataService";
import { isEmpty } from "@utils/helpers";
import { useContent } from "@contexts/withVisualizationContext";

export async function getServerSideProps(context: GetServerSidePropsContext) {
    const { slug = [] } = context.params || {};
    const plpKey = Array.isArray(slug) ? slug.join('/') : slug;
    const { vse } = context.query || {};
  
  const data = await fetchStandardPageData(
    {
      content: {
        page: { key: "/view-all-products" },
      },
    },
    context
  );


  const products = await getProductListing({categoryId: "mens-clothing-suits", method: "POST"});
  
  console.log({products});

  return {
    props: {
      ...data,
      products,
      vse: vse || '',
    },
  };
}




const RecommendedProductsPage = (props)=>{
    const { vse, products, content } = props;
    
    const [productGridContent] = useContent(content?.page?.productGridContent, vse);
    const productResults = products?.productResults;
  
    return <PlpContent products={productResults} productGridContent={productGridContent} />;

};

export default RecommendedProductsPage;
