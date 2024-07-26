import fetchStandardPageData from "@utils/cms/page/fetchStandardPageData";
import { InferGetServerSidePropsType, GetServerSidePropsContext } from "next";
import fetchPageData from "@utils/cms/page/fetchPageData";
import { isEmpty, mapToID, notNull } from "@utils/helpers";
import { CmsContent } from "@utils/cms/utils";
import ContentBlock from "@components/module/contentBlock";
import Layout from "@components/layout";

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const { slug } = context.params || {};
  const deliveryKey = Array.isArray(slug) ? slug.join("/") : (slug as string);

  const data = await fetchStandardPageData(
    {
      content: {
        page: { key: `page/${deliveryKey}` },
      },
    },
    context
  );

  if (isEmpty(data.page)) {
    return {
      redirect: {
        destination: "/page-not-found",
      },
    };
  }

  return {
    props: {
      ...data,
    },
  };
}

export default function LandingPage({
  content,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  return (
    <div className="main-content">
      {/* {slots.filter(notNull).map((slot: CmsContent, index: number) => (
        <ContentBlock content={slot} type="SLOT" key={index} />
      ))} */}
      {content?.page?.components
        ?.filter(notNull)
        .map((content: CmsContent, index: number) => (
          <ContentBlock content={content} key={index} />
        ))}
    </div>
  );
}

LandingPage.Layout = Layout;
