import React, { PropsWithChildren, createContext, useContext } from 'react';
import { cmsContent } from '@utils/cms/utils';

interface CmsContentItemProps extends PropsWithChildren {
    content: cmsContent;
}

type CmsContentItemState = {
    id: string;
    label: string;
    schema: string;
};

const CmsContentItemContext = createContext<CmsContentItemState | null>(null);

export function useCmsContentItem(): CmsContentItemState | null {
    return useContext(CmsContentItemContext);
}

const CmsContentItem = ({ content, children }: CmsContentItemProps) => {

    console.log({content});
    console.log({children});
    
    

    if (!content || !content._meta || !content._meta.deliveryId) {
        return <>{children}</>;
    }

    return (
        <CmsContentItemContext.Provider
            value={{
                id: content._meta.deliveryId,
                label: content._meta.deliveryKey || content._meta.name || content._meta.deliveryId,
                schema: content._meta.schema,
            }}
            key={content._meta.deliveryId}
        >
            {children}
        </CmsContentItemContext.Provider>
    );
};

export default CmsContentItem;