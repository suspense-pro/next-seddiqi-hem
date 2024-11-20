import { TechSpecsData } from "@utils/models/pdpTabs";

const transformTechSpecsDetails = (data: any):TechSpecsData => {
   
    return {
      tabsData: [
        {
          id: 1,
          tabTitle: "Case",
          specs: [
            {
              title: "Case",
              description: data.hasOwnProperty("c_caseMaterial") ? data.c_caseMaterial : null
            },
            {
              title: "Bezel",
              description: data.hasOwnProperty("c_bezelType") ? data.c_bezelType : null
            }
          ],
          productImageUrl: data.hasOwnProperty("c_dialTabImage") ? data.c_dialTabImage : null
        },
    
        {
          id: 2,
          tabTitle: "Movement",
          specs: [
            {
              title: "Movement",
              description: data.hasOwnProperty("c_movement1") ? data.c_movement1 : null
            },
            {
              title: "Power Reserve",
              description: data.hasOwnProperty("c_powerReserve") ? data.c_powerReserve : null
            }
          ],
          productImageUrl: data.hasOwnProperty("c_movementTabImage") ? data.c_movementTabImage : null
        },
    
        {
          id: 3,
          tabTitle: "Dial",
          specs: [
            {
              title: "Dial",
              description: data.hasOwnProperty("c_dialMaterial") ? data.c_dialMaterial : null
            },
            {
              title: "Dial Type",
              description: data.hasOwnProperty("c_dialType") ? data.c_dialType : null
            }
          ],
          productImageUrl: data.hasOwnProperty("c_caseTabImage") ? data.c_caseTabImage : null
        },
      
        {
          id: 4,
          tabTitle: "Bracelet",
          specs: [
            {
              title: "Bracelet",
              description: data.hasOwnProperty("c_braceletMaterial") ? data.c_braceletMaterial : ""
            },
            {
              title: "Type",
              description: data.hasOwnProperty("c_buckleType") ? data.c_buckleType : null
            }
          ],
          productImageUrl: data.hasOwnProperty("c_braceletTabImage") ? data.c_braceletTabImage : null
        },
        
      ],
      category: data.c_subGroupName || null,
      specsData: [
        {
          mainTitle: "DETAIL SPECIFICATIONS",
          specs: [
            {
              id: 1,
              specsTitle: "Case",
              items:[
                {
                  id: 1,
                  itemTitle: "Case Material",
                  itemDescription: data.hasOwnProperty("c_caseMaterial") ? data.c_caseMaterial : null
                },
                {
                  id: 2,
                  itemTitle: "Caseback",
                  itemDescription: data.hasOwnProperty("c_caseBack") ? data.c_caseBack : null
                },
                {
                  id: 3,
                  itemTitle: "Water Resistance",
                  itemDescription: data.c_waterResistance === true ? data.c_waterResistanceDepth + " " + data.c_waterResistanceDepthUnit || null : ""
                },
                {
                  id: 4,
                  itemTitle: "Bezel",
                  itemDescription: data.hasOwnProperty("c_bezelType") ? data.c_bezelType : null
                },
                {
                  id: 5,
                  itemTitle: "Crown",
                  itemDescription: data.hasOwnProperty("c_crown") ? data.c_crown : null
                },
                {
                  id: 6,
                  itemTitle: "Crystal",
                  itemDescription: data.hasOwnProperty("c_crystal") ? data.c_crystal : null
                },
                {
                  id: 7,
                  itemTitle: "Product Weight",
                  itemDescription: data.hasOwnProperty("c_productWeight") ? data.c_productWeight : null
                },
                {
                  id: 8,
                  itemTitle: "Watch-Head Weight",
                  itemDescription: data.hasOwnProperty("c_watchHeadWeight") ? data.c_watchHeadWeight : null
                },
                {
                  id: 9,
                  itemTitle: "Diameter",
                  itemDescription: data.hasOwnProperty("c_size") ? data.c_size : null
                },
                {
                  id: 10,
                  itemTitle: "Thickness",
                  itemDescription: data.hasOwnProperty("c_thickness") ? data.c_thickness : null
                },
                {
                  id: 11,
                  itemTitle: "Height",
                  itemDescription: data.hasOwnProperty("c_height") ? data.c_height : null
                },
                {
                  id: 12,
                  itemTitle: "Lug Width",
                  itemDescription: data.hasOwnProperty("c_lugWidth") ? data.c_lugWidth : null
                },
                {
                  id: 13,
                  itemTitle: "Shape",
                  itemDescription: data.hasOwnProperty("c_caseShape") ? data.c_caseShape : null
                }
              ]
            },
            {
              id: 2,
              specsTitle: "Movement",
              items:[
                {
                  id: 1,
                  itemTitle: "Caliber",
                  itemDescription: data.hasOwnProperty("c_movementCalibre") ? data.c_movementCalibre : null
                },
                {
                  id: 2,
                  itemTitle: "Movement",
                  itemDescription: data.hasOwnProperty("c_movement1") ? data.c_movement1 : null
                },
                {
                  id: 3,
                  itemTitle: "Power Reserve",
                  itemDescription: data.hasOwnProperty("c_powerReserve") ? data.c_powerReserve : null
                },
                {
                  id: 4,
                  itemTitle: "Chronograph",
                  itemDescription: data.hasOwnProperty("c_chronograph") ? data.c_chronograph : null
                },
                {
                  id: 5,
                  itemTitle: "Vibration",
                  itemDescription: data.hasOwnProperty("c_vibration") ? data.c_vibration : null
                },
                {
                  id: 6,
                  itemTitle: "Cylinder",
                  itemDescription: data.hasOwnProperty("c_cylinder") ? data.c_cylinder : null
                }
              ]
            },
            {
              id: 3,
              specsTitle: "Dial",
              items:[

                {
                  id: 1,
                  itemTitle: "Dial",
                  itemDescription: data.hasOwnProperty("c_dialMaterial") ? data.c_dialMaterial : null
                },
                {
                  id: 2,
                  itemTitle: "Dial Type",
                  itemDescription: data.hasOwnProperty("c_dialType") ? data.c_dialType : null
                },
                {
                  id: 3,
                  itemTitle: "Dial Index",
                  itemDescription: data.hasOwnProperty("c_dialFigure") ? data.c_dialFigure : null
                },
                {
                  id: 4,
                  itemTitle: "Stone",
                  itemDescription: data.hasOwnProperty("c_dialTypeOfStones1") ? data.c_dialTypeOfStones1 : null
                }
              ]
            },
            {
              id: 4,
              specsTitle: "Bracelet",
              items:[
                {
                  id: 1,
                  itemTitle: "Strap Material",
                  itemDescription: data.hasOwnProperty("c_strapMaterial") ?  data.c_strapMaterial : null
                },
                {
                  id: 2,
                  itemTitle: "Strap Color",
                  itemDescription: data.hasOwnProperty("c_strapColor") ?  data.c_strapColor : null
                },
                {
                  id: 3,
                  itemTitle: "Strap Type",
                  itemDescription: data.hasOwnProperty("c_strapDescription") ?  data.c_strapDescription : null
                },
                {
                  id: 4,
                  itemTitle: "Lug",
                  itemDescription: data.hasOwnProperty("c_lug") ?  data.c_lug : null
                },
                {
                  id: 5,
                  itemTitle: "Buckle Material",
                  itemDescription: data.hasOwnProperty("c_buckleMaterial") ?  data.c_buckleMaterial : null
                },
                {
                  id: 6,
                  itemTitle: "Buckle Type",
                  itemDescription: data.hasOwnProperty("c_buckleType") ?  data.c_buckleType : null
                },
                {
                  id: 7,
                  itemTitle: "Buckle Size",
                  itemDescription: data.hasOwnProperty("c_buckleSize") ?  data.c_buckleSize : null
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
                  specsTitle: "Stone",
                  specsDescription: "Stone Description"
                }
              ]
            },
            {
              id: 2,
              items: [
                {
                  id: 1,
                  specsTitle: "Metal",
                  specsDescription: "Metal Description"
                }
              ]
              
            },
            {
              id: 3,
              items: [
                {
                  id: 1,
                  specsTitle: "Collection",
                  specsDescription: "Collection Description"
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