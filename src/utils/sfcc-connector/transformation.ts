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
              description: data.c_caseMaterial
            },
            {
              title: "Size",
              description: data.c_size
            },
            {
              title: "Water Resistance",
              description: data.c_waterResistance === true ? data.c_waterResistanceDepth + " " + data.c_waterResistanceDepthUnit : ""
            }
          ],
          productImageUrl: data.c_dialTabImage
        },
    
        {
          id: 2,
          tabTitle: "Movement",
          specs: [
            {
              title: "Movement",
              description: data.c_movement
            },
            {
              title: "Power Reserve",
              description: data.c_powerReserve
            }
          ],
          productImageUrl: data.c_movementTabImage
        },
    
        {
          id: 3,
          tabTitle: "Dial",
          specs: [
            {
              title: "Dial",
              description: data.c_dialMaterial
            },
            {
              title: "Power Reserve",
              description: data.c_powerReserve
            }
          ],
          productImageUrl: data.c_caseTabImage
        },
    
        {
          id: 4,
          tabTitle: "Bracelet",
          specs: [
            {
              title: "Bracelet",
              description: "Microblasted and Polished Black Ceramic"
            },
            {
              title: "Size",
              description: "42 mm"
            },
            {
              title: "Water Resistance",
              description: "100M OR 10 ATM"
            }
          ],
          productImageUrl: data.c_braceletTabImage
        },
      ],
      category: data.c_categoryName,
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
                  itemDescription: data.c_caliber
                },
                {
                  id: 2,
                  itemTitle: "Movement",
                  itemDescription: data.c_movement
                },
                {
                  id: 3,
                  itemTitle: "Power Reserve",
                  itemDescription: data.c_powerReserve
                },
                {
                  id: 4,
                  itemTitle: "Chronograph",
                  itemDescription: data.c_chronograph
                },
                {
                  id: 5,
                  itemTitle: "Vibration",
                  itemDescription: data.c_vibration
                },
                {
                  id: 6,
                  itemTitle: "Cylinder",
                  itemDescription: data.c_cylinder
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
                  itemDescription: data.c_caseMaterial
                },
                {
                  id: 2,
                  itemTitle: "Caseback",
                  itemDescription: data.c_caseBack
                },
                {
                  id: 3,
                  itemTitle: "Water Resistance",
                  itemDescription: data.c_waterResistance === true ? data.c_waterResistanceDepth + " " + data.c_waterResistanceDepthUnit : ""
                },
                {
                  id: 4,
                  itemTitle: "Bezel",
                  itemDescription: data.c_bezelType
                },
                {
                  id: 5,
                  itemTitle: "Crown",
                  itemDescription: data.c_crown
                },
                {
                  id: 6,
                  itemTitle: "Crystal",
                  itemDescription: data.c_crystal
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
                  itemDescription: data.c_productWeight
                },
                {
                  id: 2,
                  itemTitle: "Watch-Head Weight",
                  itemDescription: data.c_watchHeadWeight
                },
                {
                  id: 3,
                  itemTitle: "Diameter",
                  itemDescription: data.c_diameter
                },
                {
                  id: 4,
                  itemTitle: "Thickness",
                  itemDescription: data.c_thickness
                },
                {
                  id: 5,
                  itemTitle: "Height",
                  itemDescription: data.c_height
                },
                {
                  id: 6,
                  itemTitle: "Lug Width",
                  itemDescription: data.c_lugWidth
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
                  itemDescription: data.c_strapMaterial
                },
                {
                  id: 2,
                  itemTitle: "Strap Color",
                  itemDescription: data.c_strapColor
                },
                {
                  id: 3,
                  itemTitle: "Strap Type",
                  itemDescription: data.c_strapType
                },
                {
                  id: 4,
                  itemTitle: "Lug",
                  itemDescription: data.c_lug
                },
                {
                  id: 5,
                  itemTitle: "Buckle Material",
                  itemDescription: data.c_buckleMaterial
                },
                {
                  id: 6,
                  itemTitle: "Buckle Type",
                  itemDescription: data.c_buckleType
                },
                {
                  id: 7,
                  itemTitle: "Buckle Size",
                  itemDescription: data.c_buckleSize
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