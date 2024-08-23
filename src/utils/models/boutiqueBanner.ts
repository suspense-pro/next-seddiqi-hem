interface MediaType {
  image?: {
    _meta: {
      schema: string;
    };
    id: string;
    name: string;
    endpoint: string;
    defaultHost: string;
    mimeType: string;
  };
  video?: {
    _meta: {
      schema: string;
    };
    id: string;
    name: string;
    endpoint: string;
    defaultHost: string;
    mimeType: string;
  };
  altText?: string;
  autoPlay?: boolean;
  showPlay?: boolean;
}

interface BoutiqueBannerProps {
  backgroundColor: "primary" | "secondary" | "default";
  cta: {
    isNewTab: boolean;
    label: string;
    type: string;
    color: string;
  };
  mainTitle: string;
  media: MediaType;
  richText: string;
}
