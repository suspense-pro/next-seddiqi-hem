import { TechSpecsData } from "@utils/models/pdpTabs";

const transformTechSpecsDetails = (data: any): TechSpecsData => {
  return {
    tabsData: [
      {
        id: 1,
        tabTitle: "Case",
        specs: [
          {
            title: "Case",
            description: data.c_caseMaterial || "No available data",
          },
          {
            title: "Size",
            description: data.c_size || "No available data",
          },
          {
            title: "Water Resistance",
            description:
              data.c_waterResistance === true
                ? data.c_waterResistanceDepth ||
                  "No available data" + " " + data.c_waterResistanceDepthUnit ||
                  "No available data"
                : "",
          },
        ],
        productImageUrl: data.c_dialTabImage,
      },

      {
        id: 2,
        tabTitle: "Movement",
        specs: [
          {
            title: "Movement",
            description: data.c_movement,
          },
          {
            title: "Power Reserve",
            description: data.c_powerReserve || "No available data",
          },
        ],
        productImageUrl: data.c_movementTabImage,
      },

      {
        id: 3,
        tabTitle: "Dial",
        specs: [
          {
            title: "Dial",
            description: data.c_dialMaterial || "No available data",
          },
          {
            title: "Power Reserve",
            description: data.c_powerReserve || "No available data",
          },
        ],
        productImageUrl: data.c_caseTabImage,
      },

      {
        id: 4,
        tabTitle: "Bracelet",
        specs: [
          {
            title: "Bracelet",
            description: "Microblasted and Polished Black Ceramic",
          },
          {
            title: "Size",
            description: "42 mm",
          },
          {
            title: "Water Resistance",
            description: "100M OR 10 ATM",
          },
        ],
        productImageUrl: data.c_braceletTabImage,
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
            items: [
              {
                id: 1,
                itemTitle: "Caliber",
                itemDescription: data.c_caliber || "No available data",
              },
              {
                id: 2,
                itemTitle: "Movement",
                itemDescription: data.c_movement || "No available data",
              },
              {
                id: 3,
                itemTitle: "Power Reserve",
                itemDescription: data.c_powerReserve || "No available data",
              },
              {
                id: 4,
                itemTitle: "Chronograph",
                itemDescription: data.c_chronograph || "No available data",
              },
              {
                id: 5,
                itemTitle: "Vibration",
                itemDescription: data.c_vibration || "No available data",
              },
              {
                id: 6,
                itemTitle: "Cylinder",
                itemDescription: data.c_cylinder || "No available data",
              },
            ],
          },
          {
            id: 2,
            specsTitle: "Case",
            items: [
              {
                id: 1,
                itemTitle: "Case Material",
                itemDescription: data.c_caseMaterial || "No available data",
              },
              {
                id: 2,
                itemTitle: "Caseback",
                itemDescription: data.c_caseBack || "No available data",
              },
              {
                id: 3,
                itemTitle: "Water Resistance",
                itemDescription:
                  data.c_waterResistance === true
                    ? data.c_waterResistanceDepth ||
                      "No available data" + " " + data.c_waterResistanceDepthUnit ||
                      "No available data"
                    : "",
              },
              {
                id: 4,
                itemTitle: "Bezel",
                itemDescription: data.c_bezelType || "No available data",
              },
              {
                id: 5,
                itemTitle: "Crown",
                itemDescription: data.c_crown || "No available data",
              },
              {
                id: 6,
                itemTitle: "Crystal",
                itemDescription: data.c_crystal || "No available data",
              },
            ],
          },
          {
            id: 3,
            specsTitle: "Dimensions",
            items: [
              {
                id: 1,
                itemTitle: "Product Weight",
                itemDescription: data.c_productWeight || "No available data",
              },
              {
                id: 2,
                itemTitle: "Watch-Head Weight",
                itemDescription: data.c_watchHeadWeight || "No available data",
              },
              {
                id: 3,
                itemTitle: "Diameter",
                itemDescription: data.c_diameter || "No available data",
              },
              {
                id: 4,
                itemTitle: "Thickness",
                itemDescription: data.c_thickness || "No available data",
              },
              {
                id: 5,
                itemTitle: "Height",
                itemDescription: data.c_height || "No available data",
              },
              {
                id: 6,
                itemTitle: "Lug Width",
                itemDescription: data.c_lugWidth || "No available data",
              },
            ],
          },
          {
            id: 4,
            specsTitle: "Strap",
            items: [
              {
                id: 1,
                itemTitle: "Strap Material",
                itemDescription: data.c_strapMaterial || "No available data",
              },
              {
                id: 2,
                itemTitle: "Strap Color",
                itemDescription: data.c_strapColor || "No available data",
              },
              {
                id: 3,
                itemTitle: "Strap Type",
                itemDescription: data.c_strapType || "No available data",
              },
              {
                id: 4,
                itemTitle: "Lug",
                itemDescription: data.c_lug || "No available data",
              },
              {
                id: 5,
                itemTitle: "Buckle Material",
                itemDescription: data.c_buckleMaterial || "No available data",
              },
              {
                id: 6,
                itemTitle: "Buckle Type",
                itemDescription: data.c_buckleType || "No available data",
              },
              {
                id: 7,
                itemTitle: "Buckle Size",
                itemDescription: data.c_buckleSize || "No available data",
              },
            ],
          },
        ],
      },
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
                specsDescription: "Stone Description",
              },
            ],
          },
          {
            id: 2,
            items: [
              {
                id: 1,
                specsTitle: "Metal",
                specsDescription: "Metal Description",
              },
            ],
          },
          {
            id: 3,
            items: [
              {
                id: 1,
                specsTitle: "Collection",
                specsDescription: "Collection Description",
              },
            ],
          },
        ],
      },
    ],
  };
};

export { transformTechSpecsDetails };
