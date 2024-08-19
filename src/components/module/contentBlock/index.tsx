import React from 'react';
import { CmsContent } from '@utils/cms/utils';
import CmsContentItem from '@components/module/cmsContentItem';
import CmsSlot from '@components/module/cmsSlot';
import { useRouter } from 'next/router';
import { ComponentMapping } from '@utils/cms/config';
import { useContent } from '@contexts/withVisualizationContext';

export type ContentBlockType = 'SLOT' | 'CONTENT';

interface ContentBlockProps {
    name?: string;
    type?: ContentBlockType;
    content: CmsContent | null;
    components?: { [key: string]: any };
}

const ContentBlock: React.FC<ContentBlockProps> = ({
    content: originalContent,
    type = 'CONTENT',
    components = ComponentMapping,
}) => {
    const { query } = useRouter() || {};
    const vse = (query?.vse as string) || '';

    // Get real-time content from original content
    const [liveContent] = useContent(originalContent, vse);

    if (!liveContent) {
        return null;
    }

    const content = liveContent;
    const Component = components[content?._meta?.schema];
    const children = Component ? <Component {...content} /> : null;

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
