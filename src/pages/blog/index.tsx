import Layout from '@components/layout';
import ContentBlock from '@components/module/contentBlock';
import compact from "lodash/compact";
import fetchStandardPageData from '@utils/cms/page/fetchStandardPageData';
import { isEmpty } from '@utils/helpers';
import { GetServerSidePropsContext, InferGetServerSidePropsType } from 'next';


export async function getServerSideProps(context: GetServerSidePropsContext) {

    const { vse } = context.query || {};

    const data = await fetchStandardPageData(
        {
          content: {
            page: { key: `blog` },
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
          vse: vse || "",
        },
      };
}
export default function Blog({ content }: InferGetServerSidePropsType<typeof getServerSideProps>) {
    return (
      <div className="blog-main-content">
        {compact(content?.page?.components).map((content) => (
          <ContentBlock content={content} key={content?._meta.deliveryId} />
        ))}
      </div>
    );
  }
  
  Blog.Layout = Layout;
