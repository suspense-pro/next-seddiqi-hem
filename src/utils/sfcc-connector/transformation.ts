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
              description: data.hasOwnProperty("c_caseMaterial") ? data.c_caseMaterial : "No available data"
            },
            {
              title: "Size",
              description: data.hasOwnProperty("c_size") ? data.c_size : "No available data"
            },
            {
              title: "Water Resistance",
              description: data.c_waterResistance === true ? data.c_waterResistanceDepth || "No available data" + " " + data.c_waterResistanceDepthUnit || "No available data" : ""
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
              description: data.hasOwnProperty("c_movement1") ? data.c_movement1 : "No available data"
            },
            {
              title: "Power Reserve",
              description: data.hasOwnProperty("c_powerReserve") ? data.c_powerReserve : "No available data"
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
              description: data.hasOwnProperty("c_dialMaterial") ? data.c_dialMaterial : "No available data"
            },
            {
              title: "Power Reserve",
              description: data.hasOwnProperty("c_powerReserve") ? data.c_powerReserve : "No available data"
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
              title: "Size",
              description: data.hasOwnProperty("c_size") ? data.c_size : "No available data"
            },
            {
             title: "Water Resistance",
              description: data.c_waterResistance === true ? data.c_waterResistanceDepth || "No available data" + " " + data.c_waterResistanceDepthUnit || "No available data" : ""
            }
          ],
          productImageUrl: data.hasOwnProperty("c_braceletTabImage") ? data.c_braceletTabImage : null
        },
        
      ],
      category: data.c_categoryName || "No available data",
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
                  itemDescription: data.hasOwnProperty("c_caliber") ? data.c_caliber : "No available data"
                },
                {
                  id: 2,
                  itemTitle: "Movement",
                  itemDescription: data.hasOwnProperty("c_movement") ? data.c_movement : "No available data"
                },
                {
                  id: 3,
                  itemTitle: "Power Reserve",
                  itemDescription: data.hasOwnProperty("c_powerReserve") ? data.c_powerReserve : "No available data"
                },
                {
                  id: 4,
                  itemTitle: "Chronograph",
                  itemDescription: data.hasOwnProperty("c_chronograph") ? data.c_chronograph : "No available data"
                },
                {
                  id: 5,
                  itemTitle: "Vibration",
                  itemDescription: data.hasOwnProperty("c_vibration") ? data.c_vibration : "No available data"
                },
                {
                  id: 6,
                  itemTitle: "Cylinder",
                  itemDescription: data.hasOwnProperty("c_cylinder") ? data.c_cylinder : "No available data"
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
                  itemDescription: data.hasOwnProperty("c_caseMaterial") ? data.c_caseMaterial : "No available data"
                },
                {
                  id: 2,
                  itemTitle: "Caseback",
                  itemDescription: data.hasOwnProperty("c_caseBack") ? data.c_caseBack : "No available data"
                },
                {
                  id: 3,
                  itemTitle: "Water Resistance",
                  itemDescription: data.c_waterResistance === true ? data.c_waterResistanceDepth || "No available data" + " " + data.c_waterResistanceDepthUnit || "No available data" : ""
                },
                {
                  id: 4,
                  itemTitle: "Bezel",
                  itemDescription: data.hasOwnProperty("c_bezelType") ? data.c_bezelType : "No available data"
                },
                {
                  id: 5,
                  itemTitle: "Crown",
                  itemDescription: data.hasOwnProperty("c_crown") ? data.c_crown : "No available data"
                },
                {
                  id: 6,
                  itemTitle: "Crystal",
                  itemDescription: data.hasOwnProperty("c_crystal") ? data.c_crystal : "No available data"
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
                  itemDescription: data.hasOwnProperty("c_productWeight") ? data.c_productWeight : "No available data"
                },
                {
                  id: 2,
                  itemTitle: "Watch-Head Weight",
                  itemDescription: data.hasOwnProperty("c_watchHeadWeight") ? data.c_watchHeadWeight : "No available data"
                },
                {
                  id: 3,
                  itemTitle: "Diameter",
                  itemDescription: data.hasOwnProperty("c_diameter") ? data.c_diameter : "No available data"
                },
                {
                  id: 4,
                  itemTitle: "Thickness",
                  itemDescription: data.hasOwnProperty("c_thickness") ? data.c_thickness : "No available data"
                },
                {
                  id: 5,
                  itemTitle: "Height",
                  itemDescription: data.hasOwnProperty("c_height") ? data.c_height : "No available data"
                },
                {
                  id: 6,
                  itemTitle: "Lug Width",
                  itemDescription: data.hasOwnProperty("c_lugWidth") ? data.c_lugWidth : "No available data"
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
                  itemDescription: data.hasOwnProperty("c_strapMaterial") ?  data.c_strapMaterial : "No available data"
                },
                {
                  id: 2,
                  itemTitle: "Strap Color",
                  itemDescription: data.hasOwnProperty("c_strapColor") ?  data.c_strapColor : "No available data"
                },
                {
                  id: 3,
                  itemTitle: "Strap Type",
                  itemDescription: data.hasOwnProperty("c_strapType") ?  data.c_strapType : "No available data"
                },
                {
                  id: 4,
                  itemTitle: "Lug",
                  itemDescription: data.hasOwnProperty("c_lug") ?  data.c_lug : "No available data"
                },
                {
                  id: 5,
                  itemTitle: "Buckle Material",
                  itemDescription: data.hasOwnProperty("c_buckleMaterial") ?  data.c_buckleMaterial : "No available data"
                },
                {
                  id: 6,
                  itemTitle: "Buckle Type",
                  itemDescription: data.hasOwnProperty("c_buckleType") ?  data.c_buckleType : "No available data"
                },
                {
                  id: 7,
                  itemTitle: "Buckle Size",
                  itemDescription: data.hasOwnProperty("c_buckleSize") ?  data.c_buckleSize : "No available data"
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