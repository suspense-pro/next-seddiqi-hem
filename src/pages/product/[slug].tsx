import Layout from "@components/layout";
import fetchStandardPageData from "@utils/cms/page/fetchStandardPageData";
import { getProductDetails } from "@utils/sfcc-connector/dataService";
import { GetServerSidePropsContext } from "next";
import compact from "lodash/compact";
import ContentBlock from "@components/module/contentBlock";
import { PdpTabs } from "@components/rendering";
import { ProductDetailInfo, ScrollToTop, StickyWhatsapp } from "@components/module";

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const { slug = [] } = context.params || {};
  const plpKey = Array.isArray(slug) ? slug.join("/") : slug;
  const { vse } = context.query || {};

  const data = await fetchStandardPageData(
    {
      content: {
        page: { key: `product/${plpKey}` },
      },
    },
    context
  );

  const product = await getProductDetails({ productId: "22416787M", method: "GET" });

  const shippingData = await fetchStandardPageData(
    {
      content: {
        page: {
          key: `shipping/${product?.response?.c_shippingContent ? product?.response?.brand.toLowerCase() : "global"}`,
        },
      },
    },
    context
  );

  const warrantyData = await fetchStandardPageData(
    {
      content: {
        page: {
          key: `warranty/${product?.response?.warrantyData ? product?.response?.brand.toLowerCase() : "global"}`,
        },
      },
    },
    context
  );

  return {
    props: {
      ...data,
      product,
      shippingData,
      warrantyData,
      vse: vse || "",
    },
  };
}

export default function Product({ content, product, shippingData, warrantyData }) {
  const productTechSpecs = product.techSpecs;

  return (
    <div className="main-content">
      <ProductDetailInfo
        shippingData={shippingData?.content?.page}
        warrantyData={warrantyData?.content?.page}
        product={product?.response}
        content={content}
      />
      <ScrollToTop />
      <StickyWhatsapp />
      {compact(content?.page?.components).map((content) => (
        <ContentBlock content={content} key={content?._meta.deliveryId} />
      ))}

      <PdpTabs productTechSpecs={productTechSpecs} amplienceData={""} />
    </div>
  );
}

Product.Layout = Layout;
