import React from "react";
import { CmsContent } from "@utils/cms/utils";

type typographyProps = {
  className?: string;
  align?: "left" | "center" | "right";
  variant: "h1" | "h2" | "h3" | "h4" | "h5" | "h6" | "p" | "span" | "div";
} & CmsContent;

const Typography = ({
  children,
  align,
  variant,
  className,
}: typographyProps) => {
  const VariantTag = variant;
  return (
    <div className={className} style={{ textAlign: align }}>
      {children && <VariantTag className={className}>{children}</VariantTag>}
    </div>
  );
};

export default Typography;
