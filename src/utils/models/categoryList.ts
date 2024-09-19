export interface MediaType {
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

export interface OpacityType {
  opacity?:number;
}

export interface items {
  media: MediaType;
  title:string;
  description: string;
  opacity: OpacityType;
}

export interface CategoryListProps {
  title: string;
  cta: {
    isNewTab: boolean;
    label: string;
    type: string;
    color: string;
  };
  listItems: items[];
}
