import Layout from "@components/layout";
import fetchStandardPageData from "@utils/cms/page/fetchStandardPageData";
import { getProductDetails } from "@utils/sfcc-connector/dataService";
import { GetServerSidePropsContext } from "next";

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const { slug = [] } = context.params || {};
  const plpKey = Array.isArray(slug) ? slug.join('/') : slug;
  const { vse } = context.query || {};

  
  const data = await fetchStandardPageData(
    {
      content: {
        page: { key: `product/${plpKey}` },
      },
    },
    context
  );

  const product = await getProductDetails({productId: plpKey, method: "GET"});

  return {
    props: {
      ...data,
      product,
      vse: vse || '',
    },
  };
}

export default function Product({ product }) {
  console.log('PRODUCT', product)
  return (
    <div></div>
  );
}

Product.Layout = Layout;
