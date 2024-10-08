import Layout from '@components/layout';
import { useAcceleratedMedia } from '@contexts/acceleratedMediaContext';
import { useAppContext } from '@contexts/appContext';
import { useCmsContext } from '@contexts/cmsContext';
import { NavigationItem } from '@contexts/withNavigationContext';
import { ImageFormat } from '@utils/cms/helpers/getImageUrl';
import fetchStandardPageData from '@utils/cms/page/fetchStandardPageData';
import { GetServerSidePropsContext } from 'next';


export async function getServerSideProps(context: GetServerSidePropsContext) {
    const data = await fetchStandardPageData(
        {
            content: {},
        },
        context,
    );

    return {
        props: {
            ...data,
        },
    };
}

export default function BlogPage() {
    const navigationItem: NavigationItem = {
        type: 'page',
        href: '/blog',
        title: 'Blog',
        children: [],
        parents: [],
    };
    let { algolia, cms } = useAppContext();
    const { stagingApi } = useCmsContext() || {};
    const { acceleratedMedia } = useAcceleratedMedia();
    let format = 'auto';
    if (acceleratedMedia) {
        format = ImageFormat.AVIF;
    }

    if (!algolia) {
        return;
    }
    // const searchClient = algoliasearch(algolia.appId, algolia.apiKey);
    let hub = cms.hub;
    let indexName = stagingApi ? `${hub}.blog-staging` : `${hub}.blog-production`;

    // const StyledPagination = styled('div')({
    //     marginTop: 20,
    //     marginBottom: 10,
    //     '& .ais-Pagination-item': {
    //         marginLeft: 3,
    //         margingRight: 3,
    //     },
    //     '& .ais-Pagination-item--page ': {
    //         color: 'black',
    //         border: '1px solid black',
    //         width: 25,
    //         height: 25,
    //         backgroundColor: 'white',
    //         '& .ais-Pagination-link': {
    //             textAlign: 'center',
    //             width: '100%',
    //             display: 'inline-block',
    //         },
    //     },
    //     '& .ais-Pagination-item--selected': {
    //         color: 'white',
    //         backgroundColor: 'black',
    //     },
    //     '& .ais-Pagination-item--disabled': {
    //         display: 'none',
    //     },
    // });

    // function Hit(props: any) {
    //     return (
    //         <Grid
    //             item
    //             key={props.hit._meta?.deliveryId}
    //             xs={12}
    //             sm={12}
    //             md={6}
    //             lg={4}
    //             height={{ xs: 550, sm: 550, md: 500, lg: 450 }}
    //             style={{
    //                 float: 'inline-start',
    //                 paddingLeft: 5,
    //                 paddingRight: 5,
    //                 paddingBottom: 10,
    //             }}
    //         >
    //             <DynamicBlogListCard key={props.hit._meta?.deliveryId} data={props.hit} />
    //         </Grid>
    //     );
    // }

    return <div></div>;
}

BlogPage.Layout = Layout;
