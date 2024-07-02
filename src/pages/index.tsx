
import Layout from "@components/layout";
import ContentBlock from "@components/module/contentBlock";
import compact from "lodash/compact";
import { GetServerSidePropsContext } from "next";
import fetchStandardPageData from "@utils/cms/page/fetchStandardPageData";

export async function getServerSideProps(context: GetServerSidePropsContext) {

  const data = await fetchStandardPageData(
    {
      content: {
        page: { key: "homepage" },
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

export default function Home({ contents }) {
  return (
    <div className="main-content">
      {compact(contents).map((content) => (
        <ContentBlock
          content={content}
          key={content?._meta.deliveryId}
        />
      ))}
    </div>
  );
}

Home.Layout = Layout;
