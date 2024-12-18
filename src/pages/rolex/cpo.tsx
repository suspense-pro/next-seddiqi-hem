import React, { useContext } from "react";
import Image from "next/image";
import { getProducts } from "@utils/sfcc-connector";
import Layout from "@components/layout";
import { GetServerSidePropsContext, InferGetServerSidePropsType } from "next";
import { useContent } from "@contexts/withVisualizationContext";
import fetchStandardPageData from "@utils/cms/page/fetchStandardPageData";
import fetchPageData from "@utils/cms/page/fetchPageData";
import { isEmpty, mapToID, notNull } from "@utils/helpers";
import { CmsContent } from "@utils/cms/utils";
import ContentBlock from "@components/module/contentBlock";
import { RolexComponentMapping } from "@utils/cms/config";
import { RolexContext } from "@contexts/rolexContext";
import ContactForm from "@components/module/contactForm";
import RolexContactForm from "@components/rendering/rolex/rolexContactForm/rolexContactForm";
import NeedMoreHelp from "@components/rendering/needMoreHelp";

export async function getServerSideProps(context: GetServerSidePropsContext) {
  let { slug } = context.params || {};
  const { vse } = context.query || {};
  const deliveryKey = Array.isArray(slug) ? slug.join("/") : (slug as string);

  const data = await fetchStandardPageData(
    {
      content: {
        page: { key: `rolex/cpo` },
      },
    },
    context
  );

  const needMoreHelp = await fetchStandardPageData(
    {
      content: {
        page: {
          key: "need-more-help",
        },
      },
    },
    context
  );

  // if (isEmpty(data.content.pagee)) {
  //   return {
  //     redirect: {
  //       destination: "/page-not-found",
  //     },
  //   };
  // }

  return {
    props: {
      ...data,
      needMoreHelp,
      vse: vse || "",
    },
  };
}

const CPOPage = (props: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  const { vse, content, needMoreHelp } = props;
  const [page] = useContent(content.page, vse as string);
  const { rolexContact, setRolexContact } = useContext(RolexContext);

  return (
    <div className="blog-content rolex">
      {rolexContact ? (
        <>
          {page?.components
            ?.filter(notNull)
            .slice(0, 1)
            ?.map((cont: CmsContent, index: number) => (
              <ContentBlock components={RolexComponentMapping} content={cont} key={index} />
            ))}
          <RolexContactForm />
          {needMoreHelp?.content?.page && <NeedMoreHelp {...needMoreHelp?.content?.page} />}
        </>
      ) : (
        <>
          {page?.components?.filter(notNull).map((cont: CmsContent, index: number) => (
            <ContentBlock components={RolexComponentMapping} content={cont} key={index} />
          ))}
        </>
      )}
    </div>
  );
};

export default CPOPage;

CPOPage.Layout = Layout;
