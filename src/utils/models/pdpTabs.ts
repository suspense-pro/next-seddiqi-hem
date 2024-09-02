export interface SpecsData {
  title: string;
  description: string;
}

export interface TabsData {
  id: number;
  tabTitle?: string;
  specs?: SpecsData[];
  productImageUrl?: string;
}

export interface PdpTabsData {
  tabsData?: TabsData[];
}





export interface ItemsData {
  id: number;
  itemTitle: string;
  itemDescription: string;
}

export interface Specs {
  id: number;
  specsTitle: string;
  items?: ItemsData[];
}

export interface ListSpecsData {
  mainTitle: string;
  specs?: Specs[];
}

export interface TechSpecsData {
  specsData?: ListSpecsData[];
}
