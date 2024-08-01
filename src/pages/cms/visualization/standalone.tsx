import { InferGetServerSidePropsType, GetServerSidePropsContext } from 'next';
import fetchStandardPageData from '@utils/cms/page/fetchStandardPageData';
import ContentBlock from '@components/module/contentBlock';
import StandaloneLayout from '@components/layout/standalone';


export async function getServerSideProps(context: GetServerSidePropsContext) {
    const { content: contentId } = context.query;
    const data = await fetchStandardPageData(
        {
            content: {
                content: { id: contentId as string },
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

export default function Home({ content }: InferGetServerSidePropsType<typeof getServerSideProps>) {
    return <ContentBlock content={content.content} />;
}

Home.Layout = StandaloneLayout;
