export interface ImageType {
  image: {
    _meta: {
      schema: string;
    };
    id: string;
    name: string;
    endpoint: string;
    defaultHost: string;
    mimeType: string;
  };
  altText: string;
}

export interface CtaType {
  isNewTab: boolean;
  label: string;
  type: string;
  color: string;
}

export interface BoutiqueBannerProps {
  backgroundColor: 'primary' | 'secondary';
  cta: CtaType;
  mainTitle: string;
  media: ImageType;
  richText: string;
}