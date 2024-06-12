import React from 'react';
import { cmsContent } from '@utils/cms/utils';
import ContentBlock from '@components/module/contentBlock';

type SlotProps = {} & cmsContent;

const Slot = ({ content }: SlotProps) => {
    return <ContentBlock content={content} />;
};

export default Slot;