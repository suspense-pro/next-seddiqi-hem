import { CmsContext } from '@contexts/cmsContext';
import { withRetry } from '@utils/helpers/withRetry';
import { JsonTree } from './JsonTree';


type ResolverSpec = {
    filter: (data: any) => boolean;
    apply: (data: any, cmsContext: CmsContext) => Promise<any>;
};

function byContentType(schema: string) {
    return (data: any) => {
        return data && data._meta && data._meta.schema && data._meta.schema === schema;
    };
}

const resolvers: ResolverSpec[] = [];

/**
 * Middleware for injecting extra data into content such as product data
 */
export async function enrichPageContent<T>(content: T, cmsContext: CmsContext): Promise<T> {
    return await withRetry(async () => {
        if (content) {
            const visitor = async (node: any) => {
                for (let { filter, apply } of resolvers) {
                    if (filter(node)) {
                        await apply(node, cmsContext);
                    }
                }
            };
            await visitor(content);
            await JsonTree.asyncVisit(content, visitor);
        }
        return content;
    });
}
