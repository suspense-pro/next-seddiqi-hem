import React from 'react';
import { cmsContent } from '@utils/cms/utils';
// import { useContent } from '@components/core/WithVisualization/WithVisualization';

import CmsContentItem from '@components/module/cmsContentItem';
import CmsSlot from '@components/module/cmsSlot';


import { useRouter } from 'next/router';
import { ComponentMapping } from '@utils/cms/config';

export type ContentBlockType = 'SLOT' | 'CONTENT';

interface ContentBlockProps {
    name?: string;
    type?: ContentBlockType;
    content: cmsContent | null;
    components?: { [key: string]: any };
}



const ContentBlock = ({
    content: originalContent,
    type = 'CONTENT',
    components = ComponentMapping,
}: ContentBlockProps) => {
    const { query } = useRouter() || {};
    const vse = (query?.vse as string) || '';

    // Get real-time content from original content
    // const [liveContent] = useContent(originalContent, vse);
    // if (!liveContent) {
    //     return null;
    // }

    const content = originalContent;

    console.log({originalContent});
    
    const Component = components[content?._meta?.schema];
    const children = Component ? <Component {...content} /> : <>{JSON.stringify(content)}</>;

    const wrappedChildren =
        type === 'SLOT' ? (
            <CmsSlot key={content?._meta.deliveryId} content={content}>
                {children}
            </CmsSlot>
        ) : (
            <CmsContentItem key={content?._meta.deliveryId} content={content}>
                {children}
            </CmsContentItem>
        );


    return wrappedChildren;
};

export default ContentBlock;