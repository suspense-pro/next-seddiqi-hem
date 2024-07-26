import { InferGetServerSidePropsType, GetServerSidePropsContext } from "next";
import Layout from "@components/layout";
import ContentBlock from "@components/module/contentBlock";
import fetchStandardPageData from "@utils/cms/page/fetchStandardPageData";
import { CmsContent } from "@utils/cms/utils";

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const { slug = [] } = context.params || {};
  const blogKey = Array.isArray(slug) ? slug.join("/") : slug;
  const data = await fetchStandardPageData(
    {
      content: {
        slots: [{ key: blogKey }],
      },
    },
    context
  );

  return {
    props: {
      ...data,
    },
  };
}

export default function BlogDetail({
  content,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  return (
    <div className="af-main-content">
      {content.slots
        .filter((slot) => slot != null)
        .map((slot, index: number) => {
          return (
            <ContentBlock
              key={index}
              content={slot as CmsContent}
              type="SLOT"
            />
          );
        })}
    </div>
  );
}

BlogDetail.Layout = Layout;
