import Image from "next/image";
import { getProducts } from "@utils/sfcc-connector";
import Layout from "@components/layout";
import { GetServerSidePropsContext, InferGetServerSidePropsType } from "next";
import { useContent } from "@contexts/withVisualizationContext";
import fetchStandardPageData from "@utils/cms/page/fetchStandardPageData";
import fetchPageData from "@utils/cms/page/fetchPageData";
import { isEmpty, mapToID } from "@utils/helpers";

export async function getServerSideProps(context: GetServerSidePropsContext) {
  let { slug } = context.params || {};
  const { vse } = context.query || {};
  const data = await fetchStandardPageData(
    {
      content: {
        page: { key: `category/${slug}` },
      },
    },
    context
  );

  if (isEmpty(data.page) || !slug) {
    return {
      redirect: {
        destination: "/page-not-found",
      },
    };
  }

  if (data.content.page && !data.content.page.active) {
    data.content.page = null;
  }

  slug = Array.isArray(slug) ? slug.join("/") : slug;
  const props = await fetchPageData(
    {
      content: {
        slots: (data.content.page?.slots || []).map(mapToID),
      },
    },
    context
  );

  let category;

  if (!category) {
    return {
      redirect: {
        destination: "/page-not-found",
      },
    };
  }

  const products = null;
  category.products = products;

  return {
    props: {
      ...data,
      vse: vse || "",
      category: category,
      slots: props.content.slots,
    },
  };
}

const CategoryPage = (
  props: InferGetServerSidePropsType<typeof getServerSideProps>
) => {
  const { vse, content, category, slots } = props;
//   const [config] = useContent(content.configComponents, vse);

  // let components: CmsContent[] = props.content?.page?.components || [];
  // let pageSlots: CmsContent[] = slots;
  // let products: Product[] = category?.products;

  return <></>;
};

CategoryPage.Layout = Layout;
