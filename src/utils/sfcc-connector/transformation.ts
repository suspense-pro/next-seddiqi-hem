import { TechSpecsData } from "@utils/models/pdpTabs";

const transformTechSpecsDetails = (data: any):TechSpecsData => {
   
    return {
      specsData: [
        {
          mainTitle: "DETAIL SPECIFICATIONS",
          specs: [
            {
              id: 1,
              specsTitle: data.c_movementLabel,
              items:[
                {
                  id: 1,
                  itemTitle: data.c_caliberLabel,
                  itemDescription: data.c_techSpec_caliber
                },
                {
                  id: 2,
                  itemTitle: data.c_movementLabel,
                  itemDescription: data.c_techSpec_movement
                },
                {
                  id: 3,
                  itemTitle: data.c_powerReserveLabel,
                  itemDescription: data.c_techSpec_powerReserve
                },
                {
                  id: 4,
                  itemTitle: data.c_chronographLabel,
                  itemDescription: data.c_techSpec_chronograph
                },
                {
                  id: 5,
                  itemTitle: data.c_vibrationLabel,
                  itemDescription: data.c_techSpec_vibration
                },
                {
                  id: 6,
                  itemTitle: data.c_cylinderLabel,
                  itemDescription: data.c_techSpec_cylinder
                }
              ]
            },
            {
              id: 2,
              specsTitle: "Case",
              items:[
                {
                  id: 1,
                  itemTitle: data.c_caseMaterialLabel,
                  itemDescription: data.c_techSpec_caseMaterial
                },
                {
                  id: 2,
                  itemTitle: data.c_caseBackLabel,
                  itemDescription: data.c_techSpec_caseBack
                },
                {
                  id: 3,
                  itemTitle: data.c_waterResistanceLabel,
                  itemDescription: data.c_techSpec_waterResistance === true ? data.c_techSpec_waterResistanceDepth + " " + data.c_techSpec_waterResistanceDepthUnit : ""
                },
                {
                  id: 4,
                  itemTitle: data.c_bezelTypeLabel,
                  itemDescription: data.c_techSpec_bezelType
                },
                {
                  id: 5,
                  itemTitle: data.c_crownLabel,
                  itemDescription: data.c_techSpec_crown
                },
                {
                  id: 6,
                  itemTitle: data.c_crystalLabel,
                  itemDescription: data.c_techSpec_crystal
                }
              ]
            },
            {
              id: 3,
              specsTitle: "Dimensions",
              items:[
                {
                  id: 1,
                  itemTitle: data.c_productWeightLabel,
                  itemDescription: data.c_techSpec_productWeight
                },
                {
                  id: 2,
                  itemTitle: data.c_watchHeadWeightLabel,
                  itemDescription: data.c_techSpec_watchHeadWeight
                },
                {
                  id: 3,
                  itemTitle: data.c_diameterLabel,
                  itemDescription: data.c_techSpec_diameter
                },
                {
                  id: 4,
                  itemTitle: data.c_thicknessLabel,
                  itemDescription: data.c_techSpec_thickness
                },
                {
                  id: 5,
                  itemTitle: data.c_heightLabel,
                  itemDescription: data.c_techSpec_height
                },
                {
                  id: 6,
                  itemTitle: data.c_lugWidthLabel,
                  itemDescription: data.c_techSpec_lugWidth
                }
              ]
            },
            {
              id: 4,
              specsTitle: "Strap",
              items:[
                {
                  id: 1,
                  itemTitle: data.c_strapMaterialLabel,
                  itemDescription: data.c_techSpec_strapMaterial
                },
                {
                  id: 2,
                  itemTitle: data.c_strapColorLabel,
                  itemDescription: data.c_techSpec_strapColor
                },
                {
                  id: 3,
                  itemTitle: data.c_strapTypeLabel,
                  itemDescription: data.c_techSpec_strapType
                },
                {
                  id: 4,
                  itemTitle: data.c_lugLabel,
                  itemDescription: data.c_techSpec_lug
                },
                {
                  id: 5,
                  itemTitle: data.c_buckleMaterialLabel,
                  itemDescription: data.c_techSpec_buckleMaterial
                },
                {
                  id: 6,
                  itemTitle: data.c_buckleTypeLabel,
                  itemDescription: data.c_techSpec_buckleType
                },
                {
                  id: 7,
                  itemTitle: data.c_buckleSizeLabel,
                  itemDescription: data.c_techSpec_buckleSize
                }
              ]
            }
          ]
        }
      ],

      nonTabSpecsData: [
        {
          nonTabSpecs: [
            {
              id: 1,
              items: [
                {
                  id: 1,
                  specsTitle: "Case",
                  specsDescription: data.c_caseMaterial
                },
                {
                  id: 2,
                  specsTitle: data.c_sizeLabel,
                  specsDescription: data.c_size
                }
              ]
            },
            {
              id: 2,
              items: [
                {
                  id: 1,
                  specsTitle: data.c_movementLabel,
                  specsDescription: data.c_movement
                },
                {
                  id: 2,
                  specsTitle: "Mechanism",
                  specsDescription: data.c_mechanism
                }
              ]
              
            },
            {
              id: 3,
              items: [
                {
                  id: 1,
                  specsTitle: "Bracelet",
                  specsDescription: data.c_braceletMaterial
                },
                {
                  id: 2,
                  specsTitle: "Dial",
                  specsDescription: data.c_dialMaterial
                }
              ] 
            }
          ]
        }
      ]
    };
  };
   
  export {
    transformTechSpecsDetails
  };


  /*caliber: data.c_techSpec_caliber,
  movement: data.c_techSpec_movement,
  powerReserve: data.c_techSpec_powerReserve,
  chronograph: data.c_techSpec_chronograph,
  vibration: data.c_techSpec_vibration,
  cylinder: data.c_techSpec_cylinder,
  caseMaterial: data.c_techSpec_caseMaterial,
  caseback: data.c_techSpec_caseBack,
  waterResistance: data.c_techSpecs_waterResistance,
  waterResistanceDepth: data.c_techSpec_waterResistanceDepth,
  waterResistanceDepthUnit: data.c_techSpec_waterResistanceDepthUnit,
  bezel: data.c_techSpec_bezelType,
  crown: data.c_techSpec_crown,
  crystal: data.c_techSpec_crystal,
  productWeight: data.c_techSpec_productWeight,
  watchHeadWeight: data.c_techSpec_watchHeadWeight,
  diameter: data.c_techSpec_diameter,
  thickness: data.c_techSpec_thickness,
  height: data.c_techSpec_height,
  lugWidth: data.c_techSpec_lugWidth,
  strapMaterial: data.c_techSpec_strapMaterial,
  strapColor: data.c_techSpec_strapColor,
  strapType: data.c_techSpec_strapType,
  lug: data.c_techSpec_lug,
  buckleMaterial: data.c_techSpec_buckleMaterial,
  buckleType: data.c_techSpec_buckleType,
  buckleSize: data.c_techSpec_buckleSize*/