import { TechSpecsData } from "@utils/models/pdpTabs";

const transformTechSpecsDetails = (data: any):any => {
    // console.log({order});
   
    return {
      caliber: data.c_caliber,
      movement: data.c_movement,
      powerReserve: data.c_powerReserve,
      chronograph: data.c_chronograph,
      vibration: data.c_vibration,
      caseMaterial: data.c_caseMaterial,
      caseback: data.c_caseBack,
      bezel: data.c_bezelType,
      crown: data.c_crown,
      crystal: data.c_crystal,
      watchHeadWeight: data.c_watchHeadWeight,
      diameter: data.c_diameter,
      thickness: data.c_thickness,
      height: data.c_height,
      lugWidth: data.c_lugWidth,
      strapMaterial: data.c_strapMaterial,
      strapColor: data.c_strapColor,
      strapType: data.c_strapType,
      lug: data.c_lug,
      buckleMaterial: data.c_buckleMaterial,
      buckleType: data.c_buckleType,
      buckleSize: data.c_buckleSize
    };
  };
   
  export {
    transformTechSpecsDetails
  };