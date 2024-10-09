export interface StoreDetailsProps {
    store: Store; 
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
  }
