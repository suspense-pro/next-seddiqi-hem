import { InferGetServerSidePropsType, GetServerSidePropsContext } from "next";
import Layout from "@components/layout";
import ContentBlock from "@components/module/contentBlock";
import fetchStandardPageData from "@utils/cms/page/fetchStandardPageData";
import { CmsContent } from "@utils/cms/utils";
import { useContent } from "@contexts/withVisualizationContext";
import { isEmpty, notNull } from "@utils/helpers";

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const { slug = [] } = context.params || {};
  const blogKey = Array.isArray(slug) ? slug.join("/") : slug;
  const { vse } = context.query || {};

  const data = await fetchStandardPageData(
    {
      content: {
        page: { key: `blog/${blogKey}` },
      },
    },
    context
  );
  
  if (isEmpty(data.content.page)) {
    return {
      redirect: {
        destination: "/page-not-found",
      },
    };
  }

  return {
    props: {
      ...data,
      vse: vse || "",
    },
  };
}

export default function BlogDetail({
  content,
  vse,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  const [page] = useContent(content.page, vse as string);
  
  return (
    <div className="blog-main-content">
      {page?.contentComponents
        ?.filter(notNull)
        .map((content: CmsContent, index: number) => (
          <ContentBlock content={content} key={index} />
        ))}
    </div>
  );
}

BlogDetail.Layout = Layout;
