import Layout from "@components/layout";
import fetchStandardPageData from "@utils/cms/page/fetchStandardPageData";
import { getProductDetails } from "@utils/sfcc-connector/dataService";
import { GetServerSidePropsContext } from "next";
import compact from "lodash/compact";
import ProductDetailInfo from "@components/module/product/productDetailInfo";
import ContentBlock from "@components/module/contentBlock";
import { PdpTabs } from "@components/rendering";
import { isEmpty } from "@utils/helpers";
import { ScrollToTop, StickyWhatsapp } from "@components/module";

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

  const product = await getProductDetails({ productId: plpKey, method: "GET" });

  if (isEmpty(product.response)) {
    return {
      redirect: {
        destination: "/page-not-found",
      },
    };
  }

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
  const editorsView = await fetchStandardPageData(
    {
      content: {
        page: {
          key: `product/editors-view`,
        },
      },
    },
    context
  );

  const sizeGuideDataKeyGender = product?.response?.c_gender?.toLowerCase();
  const sizeGuideDataKeyCategory = product?.response?.c_categoryName?.toLowerCase();
  const sizeGuidePlpKey = `${sizeGuideDataKeyGender}-${sizeGuideDataKeyCategory}`;

  const sizeGuideData = await fetchStandardPageData(
    {
      content: {
        page: { key: `product-size-guide/${sizeGuidePlpKey}` },
      },
    },
    context
  );

  const productTechSpecs = product?.techSpecs || {};
  productTechSpecs.category = productTechSpecs?.category || null;

  return {
    props: {
      ...data,
      sizeGuideData,
      product: {
        ...product,
        techSpecs: productTechSpecs, // Ensure techSpecs have default values
      },
      shippingData,
      warrantyData,
      editorsView,
      vse: vse || "",
    },
  };
}

export default function ProductPage({
  content,
  product,
  sizeGuideDataWomenWatches,
  sizeGuideDataMenWatches,
  shippingData,
  warrantyData,
  editorsView,
  sizeGuideData,
}) {
  const productTechSpecs = product?.techSpecs;

  return (
    <div className="main-content">
      <ProductDetailInfo
        product={product?.response}
        content={content}
        shippingData={shippingData?.content?.page}
        warrantyData={warrantyData?.content?.page}
        editorsView={editorsView?.content?.page}
        sizeGuideDataMenWatches={sizeGuideDataMenWatches}
        sizeGuideDataWomenWatches={sizeGuideDataWomenWatches}
        sizeGuideData={sizeGuideData}
      />
      <PdpTabs productTechSpecs={productTechSpecs} amplienceData={""} />
      {/* Other components like ScrollToTop and StickyWhatsapp */}
      {/*<StickyWhatsapp />*/}
      <ScrollToTop />
      {compact(content?.page?.components).map((content) => (
        <ContentBlock content={content} key={content?._meta.deliveryId} />
      ))}
    </div>
  );
}

ProductPage.Layout = Layout;
