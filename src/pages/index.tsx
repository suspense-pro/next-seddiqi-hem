import Layout from "@components/layout";
import ContentBlock from "@components/module/contentBlock";
import compact from "lodash/compact";
import { GetServerSidePropsContext } from "next";
import fetchStandardPageData from "@utils/cms/page/fetchStandardPageData";
import { getHierarchyChildren } from "@utils/cms/amplience";

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const data = await fetchStandardPageData(
    {
      content: {
        page: { key: "homepage" },
      },
    },
    context
  );
  const header = (data?.hierarchies as any)?.pages?.find(
    (data: any) => data?.root?.key === "headerNavigation"
  );
  const cardsData = await getHierarchyChildren(
    header?.content?._meta?.deliveryId
  );

  return {
    props: {
      ...data,
      cardsData,
    },
  };
}

export default function Home({ contents }) {
  return (
    <div className="main-content">
      {compact(contents).map((content) => (
        <ContentBlock content={content} key={content?._meta.deliveryId} />
      ))}
    </div>
  );
}

Home.Layout = Layout;
