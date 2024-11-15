export interface StoreDetailsProps {
    store: any; 
    mapViewOn:boolean;
    stores?:[];
  }
  
export interface Store {
    id: string;
    name?:string;
    city?: string;
    address1?: string;
    storeHours?: string;
    c_services?: [];
    c_availableBrands?: [];
    c_storeImage: string;
    latitude?:number;
    longitude?:number;
    c_googleMapLocation?:string;
  }
  

export interface StoreLocationDetailsProps {
    onClose: () => void;
    isOpen: boolean;
    storeId: string;
    mapViewOn:boolean;
    useOnPopup:boolean;
    stores:any;
  }

  
export interface BrandPopUpProps {
  brands: string[]; 
  isOpen: boolean; 
  onClose: () => void;
}