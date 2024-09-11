import { TechSpecsData } from "@utils/models/pdpTabs";

const transformTechSpecsDetails = (data: any):TechSpecsData => {
   
    return {
      specsData: [
        {
          mainTitle: "DETAIL SPECIFICATIONS",
          specs: [
            {
              id: 1,
              specsTitle: "Movement",
              items:[
                {
                  id: 1,
                  itemTitle: "Caliber",
                  itemDescription: data.c_techSpec_caliber
                },
                {
                  id: 2,
                  itemTitle: "Movement",
                  itemDescription: data.c_techSpec_movement
                },
                {
                  id: 3,
                  itemTitle: "Power Reserve",
                  itemDescription: data.c_techSpec_powerReserve
                },
                {
                  id: 4,
                  itemTitle: "Chronograph",
                  itemDescription: data.c_techSpec_chronograph
                },
                {
                  id: 5,
                  itemTitle: "Vibration",
                  itemDescription: data.c_techSpec_vibration
                },
                {
                  id: 6,
                  itemTitle: "Cylinder",
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
                  itemTitle: "Case Material",
                  itemDescription: data.c_techSpec_caseMaterial
                },
                {
                  id: 2,
                  itemTitle: "Caseback",
                  itemDescription: data.c_techSpec_caseBack
                },
                {
                  id: 3,
                  itemTitle: "Water Resistance",
                  itemDescription: data.c_techSpec_waterResistance === true ? data.c_techSpec_waterResistanceDepth + " " + data.c_techSpec_waterResistanceDepthUnit : ""
                },
                {
                  id: 4,
                  itemTitle: "Bezel",
                  itemDescription: data.c_techSpec_bezelType
                },
                {
                  id: 5,
                  itemTitle: "Crown",
                  itemDescription: data.c_techSpec_crown
                },
                {
                  id: 6,
                  itemTitle: "Crystal",
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
                  itemTitle: "Product Weight",
                  itemDescription: data.c_techSpec_productWeight
                },
                {
                  id: 2,
                  itemTitle: "Watch Head Weight",
                  itemDescription: data.c_techSpec_watchHeadWeight
                },
                {
                  id: 3,
                  itemTitle: "Diameter",
                  itemDescription: data.c_techSpec_diameter
                },
                {
                  id: 4,
                  itemTitle: "Thickness",
                  itemDescription: data.c_techSpec_thickness
                },
                {
                  id: 5,
                  itemTitle: "Height",
                  itemDescription: data.c_techSpec_height
                },
                {
                  id: 6,
                  itemTitle: "Lug Width",
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
                  itemTitle: "Strap Material",
                  itemDescription: data.c_techSpec_strapMaterial
                },
                {
                  id: 2,
                  itemTitle: "Strap Color",
                  itemDescription: data.c_techSpec_strapColor
                },
                {
                  id: 3,
                  itemTitle: "Strap Type",
                  itemDescription: data.c_techSpec_strapType
                },
                {
                  id: 4,
                  itemTitle: "Lug",
                  itemDescription: data.c_techSpec_lug
                },
                {
                  id: 5,
                  itemTitle: "Buckle Material",
                  itemDescription: data.c_techSpec_buckleMaterial
                },
                {
                  id: 6,
                  itemTitle: "Buckle Type",
                  itemDescription: data.c_techSpec_buckleType
                },
                {
                  id: 7,
                  itemTitle: "Buckle Size",
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
                  specsTitle: "Size",
                  specsDescription: data.c_size
                }
              ]
            },
            {
              id: 2,
              items: [
                {
                  id: 1,
                  specsTitle: "Movement",
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