import { useRef } from "react";
import { ProductCard } from "@components/module/";
import getProducts from "@utils/sfcc-connector";
import Layout from "@components/layout";
import ContentBlock from "@components/module/contentBlock";
import compact from "lodash/compact";
import { GetServerSidePropsContext } from "next";
import {
  getContentItemByKey,
  getHierarchyChildren,
} from "@utils/cms/amplience";
import { mapToID } from "@utils/helpers";

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const data: any = await getContentItemByKey("homepage");
  const contents = await getHierarchyChildren(data._meta.deliveryId);

  const headerData: any = await getContentItemByKey("header");
  const headerDataContents = await getHierarchyChildren(
    headerData._meta.deliveryId
  );

  const headerMainLinks = await Promise.all(
    headerDataContents.map(async (item) => {
      const links = await getHierarchyChildren(item._meta.deliveryId);
      return links;
    })
  );

  return {
    props: {
      ...data,
      contents: contents,
      header: {
        headerData,
        headerDataContents,
        headerMainLinks,
      },
    },
  };
}

export default function Home({ contents, header }) {
  return (
    <div className="main-content">
      {compact(contents).map((content) => (
        <ContentBlock
          content={content}
          type="CONTENT"
          key={content?._meta.deliveryId}
        />
      ))}
    </div>
  );
}

Home.Layout = Layout;
