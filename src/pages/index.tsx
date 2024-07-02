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
  
  const footerData: any = await getContentItemByKey("footerNavigation"); 
  const footerDataContents = await getHierarchyChildren(footerData._meta.deliveryId);
 
  const mainLinks = await Promise.all(
    footerDataContents.map(async (item) => {
      const linkData = await getHierarchyChildren(item._meta.deliveryId);
      return {
        ...item,
        links: linkData
      };
    })
  );

  return {
    props: {
      ...data,
      contents: contents,
      footerData: {
        footerData,
        mainLinks,
      },
    },
  };
}

export default function Home({ contents }) {
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
