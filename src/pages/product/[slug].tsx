import Layout from "@components/layout";
import fetchStandardPageData from "@utils/cms/page/fetchStandardPageData";
import { getProductDetails } from "@utils/sfcc-connector/dataService";
import { GetServerSidePropsContext } from "next";
import compact from "lodash/compact";
import ContentBlock from "@components/module/contentBlock";

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

export default function Product({ content }) {
  return (
    <div className="main-content">
      {compact(content?.page?.components).map((content) => (
        <ContentBlock content={content} key={content?._meta.deliveryId} />
      ))}
    </div>
  );
}

Product.Layout = Layout;
