import React from 'react';
import { cmsContent } from '@utils/cms/utils';

type typographyProps = {
    children: string;
    className?: string;
    align: "left" | "center" | "right";
    variant: "h1" | "h2" | "h3" | "h4"| "h5" | "h6" | "p" | "span"
} & cmsContent;

const Typography = ({ children, align, variant, className }: typographyProps) => {
    const VariantTag = variant;
    return <div className={className} style={{ textAlign: align }}>{children && <VariantTag>{children}</VariantTag>}</div>;
};

export default Typography;