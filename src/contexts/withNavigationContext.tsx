import { createContext, useMemo, useContext, PropsWithChildren } from 'react';
// import {CmsHierarchyNode} from '@lib/cms/fetchHierarchy';
import { CmsContent } from '@utils/cms/utils';
// import walkNavigation, { enrichCmsEntries, getTypeFromSchema } from './walkNavigation';
// import { useUserContext } from '@lib/user/UserContext';

export type NavigationItem = {
    type: 'page' | 'external-page' | 'category' | 'group';
    title: string;
    href?: string;
    children: NavigationItem[];
    parents: NavigationItem[];

    content?: CmsContent;
    category?: any;

    nodeContentItem?: CmsContent;
};

export type NavigationState = {
    rootItems: NavigationItem[];
    findByHref: (href: string) => NavigationItem | undefined;
};

const NavigationContext = createContext<NavigationState | null>(null);

interface WithNavigationContextProps extends PropsWithChildren {
    pages: "{CmsHierarchyNode}";
    categories: any;
}

export const WithNavigationContext = ({ pages, categories, children }: WithNavigationContextProps) => {
    const { language } = {language: null};//useUserContext();
    // const flattenCategories = (categories: any[]) => {
    //     const allCategories: any[] = [];
    //     const bulldozeCategories = (cat: any) => {
    //         allCategories.push(cat);
    //         cat.children && cat.children.forEach(bulldozeCategories);
    //     };
    //     categories.forEach(bulldozeCategories);
    //     return allCategories;
    // };
    // const categoriesById = useMemo(() => {
    //     const result: any = {};
    //     for (let item of flattenCategories(categories)) {
    //         result[item.id] = item;
    //     }
    //     return result;
    // }, [categories]);

    // const rootItems = useMemo(() => {
    //     const buildCategoryItem = (
    //         cmsCategory: "{CmsHierarchyNode}" | undefined,
    //         ecommerceCategory: any | undefined,
    //     ): NavigationItem | null => {
    //         if (!cmsCategory && !ecommerceCategory) {
    //             return null;
    //         }
    //         const children: NavigationItem[] = [];
    //         const result = {
    //             type: 'category',
    //             title: ecommerceCategory?.name,
    //             href: cmsCategory?.content?._meta?.deliveryKey
    //                 ? `/category/${cmsCategory?.content?._meta?.deliveryKey.split('/')[1]}`
    //                 : `/category/${ecommerceCategory?.slug}`,
    //             content: cmsCategory?.content,
    //             category: ecommerceCategory,
    //             children,
    //             nodeContentItem: cmsCategory?.content,
    //         };
    //         const contentChildren = cmsCategory ? (buildCmsEntries(cmsCategory.children) as NavigationItem[]) : [];
    //         result.children = [...contentChildren];

    //         return result as NavigationItem;
    //     };

    //     const buildGroupItem = (node: "{CmsHierarchyNode}"): NavigationItem | null => {
    //         if (!node) {
    //             return null;
    //         }
    //         let title = node?.content?.title?.values?.find((item: any) => {
    //             return item.locale.startsWith(language);
    //         });
    //         if (!title) {
    //             title = node?.content?.title?.values?.find((item: any) => {
    //                 return item.locale.startsWith('en');
    //             });
    //         }

    //         return {
    //             type: 'group',
    //             title: title?.value,
    //             content: node?.content,
    //             children: buildCmsEntries(node.children),
    //             parents: [],
    //         };
    //     };

    //     const buildPageItem = (node: "{CmsHierarchyNode}"): NavigationItem | null => {
    //         if (!node) {
    //             return null;
    //         }
    //         let title = node?.content?.title?.values?.find((item: any) => {
    //             return item.locale.startsWith(language);
    //         });
    //         if (!title) {
    //             title = node?.content?.title?.values?.find((item: any) => {
    //                 return item.locale.startsWith('en');
    //             });
    //         }

    //         return {
    //             type: 'page',
    //             title: title?.value,
    //             href: node.content._meta?.deliveryKey ? `/${node.content._meta?.deliveryKey}` : undefined,
    //             children: buildCmsEntries(node.children),
    //             parents: [],
    //             content: node.content,
    //             nodeContentItem: node.content,
    //         };
    //     };

    //     const buildExternalPageItem = (node: "{CmsHierarchyNode}"): NavigationItem | null => {
    //         if (!node) {
    //             return null;
    //         }
    //         let title = node?.content?.title?.values?.find((item: any) => {
    //             return item.locale.startsWith(language);
    //         });
    //         if (!title) {
    //             title = node?.content?.title?.values?.find((item: any) => {
    //                 return item.locale.startsWith('en');
    //             });
    //         }

    //         return {
    //             type: 'external-page',
    //             title: title?.value,
    //             href: node.content.href,
    //             children: buildCmsEntries(node.children),
    //             parents: [],
    //             content: node?.content,
    //             nodeContentItem: node?.content,
    //         };
    //     };

    //     const buildCmsItem = (node: "{CmsHierarchyNode}"): NavigationItem | null => {
    //         const type = getTypeFromSchema(node.content?._meta?.schema);
    //         if (!type) {
    //             return null;
    //         }
    //         if (!node.content?.active) {
    //             return null;
    //         }
    //         switch (type) {
    //             case 'category':
    //                 let category = categoriesById[node.content.name];
    //                 return buildCategoryItem(node, category);
    //             case 'group':
    //                 return buildGroupItem(node);
    //             case 'page':
    //                 return buildPageItem(node);
    //             case 'external-page':
    //                 return buildExternalPageItem(node);
    //         }

    //         return null;
    //     };

    //     const buildCmsEntries = (children: "{CmsHierarchyNode}"[] = []): NavigationItem[] => {
    //         children.sort(function (a: any, b: any) {
    //             const priorityA = a.menu?.priority || a.priority || a.title;
    //             const priorityB = b.menu?.priority || b.priority || b.title;

    //             if (priorityA < priorityB) {
    //                 return 1;
    //             } else if (priorityA > priorityB) {
    //                 return -1;
    //             }
    //             return 0;
    //         });
    //         return children.map(buildCmsItem).filter((x) => x != null) as NavigationItem[];
    //     };

    //     enrichCmsEntries(pages, categoriesById, categories);

    //     const rootEntries = buildCmsEntries(pages.children);
    //     rootEntries.forEach((rootEntry) => {
    //         walkNavigation(rootEntry, (node: NavigationItem, parents: NavigationItem[]) => {
    //             node.parents = parents;
    //         });
    //     });
    //     return rootEntries as NavigationItem[];
    // }, [pages, categories, categoriesById, language]);

    const rootItems: any = () => {return[{type: 'page', title: "test", children: [], parents: []}]}

    const findByHref = () => {return undefined}
    // const findByHref = (href: string) => {
    //     let result: NavigationItem | undefined;

    //     for (let rootItem of rootItems) {
    //         walkNavigation(rootItem, (node: NavigationItem, parents: NavigationItem[]) => {
    //             if (`${node.href}` === href) {
    //                 result = node;
    //             }
    //         });
    //         if (result) {
    //             break;
    //         }
    //     }

    //     return result;
    // };

    return (
        <NavigationContext.Provider
            value={{
                rootItems,
                findByHref,
            }}
        >
            {children}
        </NavigationContext.Provider>
    );
};

export function useNavigation(): NavigationState {
    return useContext(NavigationContext) as NavigationState;
}
