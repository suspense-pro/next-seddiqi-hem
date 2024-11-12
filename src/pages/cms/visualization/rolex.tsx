import Layout from '@components/layout';
import { createCmsContext } from '@contexts/cmsContext';
import fetchContent from '@utils/cms/fetchContent';
import { InferGetServerSidePropsType, GetServerSidePropsContext } from 'next';


export async function getServerSideProps(context: GetServerSidePropsContext) {
    const { content: contentId } = context.query;
    const cmsContext = await createCmsContext(context.req);
    const [content] = await fetchContent([{ id: contentId as string }], cmsContext);
    const { res } = context;

    if (res && (content as any)?._meta?.deliveryKey) {
        res.setHeader('Cache-Control', 'no-cache ');
        res.writeHead(301, {
            Location: `/rolex/${(content as any)._meta?.deliveryKey}?vse=${cmsContext.stagingApi}`,
        });
        res.end();
    }

    return {
        props: {},
    };
}

export default function Rolex({}: InferGetServerSidePropsType<typeof getServerSideProps>) {
    return null;
}

Rolex.Layout = Layout;
