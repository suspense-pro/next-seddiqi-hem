import { TechSpecsData } from "@utils/models/pdpTabs";

const transformTechSpecsDetails = (data: any):TechSpecsData => {
   
    return {
      tabsData: [
        {
          id: 1,
          tabTitle: "Dial",
          specs: [
            {
              title: "Dial Type",
              description: data.hasOwnProperty("c_dialType") ? data.c_dialType : null
            },
            {
              title: "Dial Material",
              description: data.hasOwnProperty("c_dialMaterial") ? data.c_dialMaterial : null
            }
          ],
          productImageUrl: data.hasOwnProperty("c_caseTabImage") ? data.c_caseTabImage : data.imageGroups[0]?.images[1]?.link
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
              title: "Complication",
              description: data.hasOwnProperty("c_complication1") ? data.c_complication1 : null
            }
          ],
          productImageUrl: data.hasOwnProperty("c_movementTabImage") ? data.c_movementTabImage : data.imageGroups[0]?.images[1]?.link
        },
        {
          id: 3,
          tabTitle: "Case",
          specs: [
            {
              title: "Case Diameter",
              description: data.hasOwnProperty("c_size") ? data.c_size + " mm" : null
            },
            {
              title: "Water Resistance",
              description: data.hasOwnProperty("c_waterResistanceDepth") ? data.c_waterResistanceDepth : null
            }
          ],
          productImageUrl: data.hasOwnProperty("c_dialTabImage") ? data.c_dialTabImage : data.imageGroups[0]?.images[1]?.link
        },
        {
          id: 4,
          tabTitle: "Bracelet",
          specs: [
            {
              title: "Strap Details",
              description: data.hasOwnProperty("c_strapDescription") ? data.c_strapDescription : null
            },
            {
              title: "Strap Material",
              description: data.hasOwnProperty("c_strapMaterial") ? data.c_strapMaterial : null
            }
          ],
          productImageUrl: data.hasOwnProperty("c_braceletTabImage") ? data.c_braceletTabImage : (data.imageGroups[0].images.length >= 3 ? data.imageGroups[0]?.images[3]?.link : null)
        },
        
      ],
      category: data.c_subGroupName || null,
      specsData: [
        {
          mainTitle: "DETAIL SPECIFICATIONS",
          specs: [
            {
              id: 1,
              specsTitle: "Dial",
              items:[
                {
                  id: 1,
                  itemTitle: "Dial Type",
                  itemDescription: data.hasOwnProperty("c_dialType") ? data.c_dialType : null
                },
                {
                  id: 2,
                  itemTitle: "Dial Material",
                  itemDescription: data.hasOwnProperty("c_dialMaterial") ? data.c_dialMaterial : null
                },
                {
                  id: 3,
                  itemTitle: "Dial Colour",
                  itemDescription: data.hasOwnProperty("c_dialColour") ? data.c_dialColour : null
                },
                {
                  id: 4,
                  itemTitle: "Dial Index",
                  itemDescription: data.hasOwnProperty("c_dialFigure") ? data.c_dialFigure : null
                },
                {
                  id: 5,
                  itemTitle: "Dial Material",
                  itemDescription: data.hasOwnProperty("c_dialTypeOfStones1") ? data.c_dialTypeOfStones1 : null
                },
                {
                  id: 6,
                  itemTitle: "Glass Material",
                  itemDescription: data.hasOwnProperty("c_glass") ? data.c_glass : null
                }
              ]
            },
            {
              id: 2,
              specsTitle: "Movement",
              items:[
                {
                  id: 1,
                  itemTitle: "Movement",
                  itemDescription: data.hasOwnProperty("c_movement1") ? data.c_movement1 : null
                },
                {
                  id: 2,
                  itemTitle: "Complication",
                  itemDescription: data.hasOwnProperty("c_complication1") ? data.c_complication1 : null
                },
                {
                  id: 4,
                  itemTitle: "Caliber",
                  itemDescription: data.hasOwnProperty("c_movementCalibre") ? data.c_movementCalibre : null
                },
                {
                  id: 5,
                  itemTitle: "Power Reserve",
                  itemDescription: data.hasOwnProperty("c_powerReserve") ? data.c_powerReserve : null
                }
              ]
            },
            {
              id: 3,
              specsTitle: "Case",
              items:[
                {
                  id: 1,
                  itemTitle: "Case Diameter",
                  itemDescription: data.hasOwnProperty("c_size") + " mm" ? data.c_size : null
                },
                {
                  id: 2,
                  itemTitle: "Water Resistance",
                  itemDescription: data.c_waterResistance === true ? data.c_waterResistanceDepth + " " + data.c_waterResistanceDepthUnit || null : ""
                },
                {
                  id: 3,
                  itemTitle: "Bezel Type",
                  itemDescription: data.hasOwnProperty("c_bezelType") ? data.c_bezelType : null
                },
                {
                  id: 4,
                  itemTitle: "Bezel Material",
                  itemDescription: data.hasOwnProperty("c_braceletMaterial") ? data.c_braceletMaterial : null
                },
                {
                  id: 5,
                  itemTitle: "Case Material",
                  itemDescription: data.hasOwnProperty("c_caseMaterial") ? data.c_caseMaterial : null
                }
              ]
            },
            {
              id: 4,
              specsTitle: "Bracelet",
              items:[
                {
                  id: 1,
                  itemTitle: "Strap Details",
                  itemDescription: data.hasOwnProperty("c_strapDescription") ?  data.c_strapDescription : null
                },
                {
                  id: 2,
                  itemTitle: "Strap Material",
                  itemDescription: data.hasOwnProperty("c_strapMaterial") ?  data.c_strapMaterial : null
                },
                {
                  id: 3,
                  itemTitle: "Strap Lock",
                  itemDescription: data.hasOwnProperty("c_typeOfLock") ?  data.c_typeOfLock : null
                },
                {
                  id: 4,
                  itemTitle: "Original Accessories",
                  itemDescription: data.hasOwnProperty("c_accessories") ?  data.c_typeOfLock : null
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