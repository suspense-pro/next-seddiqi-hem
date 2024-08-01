import { NextApiRequest, NextApiResponse } from "next";
import { Customer, slasHelpers, Product, ClientConfig, Search } from "commerce-sdk";
import initializeShopperConfig, { OAuthTokenFromAM, clientConfig } from "@utils/sfcc-connector/config";
import { getProductPriceGraph } from "@utils/sfcc-connector/productUtils";


const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const requestMethod = req.method;
  const body = req?.body !== "" ? JSON.parse(req?.body) : null;
  const query = req.query.api ?? "";
  const action = req.query.action ?? "";

  switch (query) {
    case "product":
      try {
        if (requestMethod === "POST" && action === "getProducts") {
            const categoryId : string  = body;
            const accessToken = await initializeShopperConfig();
            clientConfig.headers['authorization'] = `Bearer ${accessToken}`;
            const productsClient = new Product.Products(clientConfig);
            var accountMgrAccessToken = await OAuthTokenFromAM();
            
            const options = {
                headers: {
                    Authorization : `Bearer ${accountMgrAccessToken}`
                },
                parameters: {
                    organizationId: clientConfig.parameters.organizationId,
                    siteId: clientConfig.parameters.siteId,
                },
                body: {
                    limit: 200,
                    query: {
                        termQuery: {
                            fields: [
                                "categoryId"
                            ],
                            operator: "is",
                            values: [categoryId]
                        }
                    },
                    offset: 0,
                    sorts: [
                        {
                            field: "creationDate",
                            sortOrder: "desc"
                        }
                    ],
                    expand: ["all"]
                }
            };
            
            const productResults = await productsClient.searchProducts(options);
            const result : any = {};
            if (productResults.total > 0) {
                // console.log("Product(s): " + JSON.stringify(productResults, null, 4));
                result.productResults = productResults;

                return res.status(200).json({ isError: false, response: result });
            } else {
                console.log("No product found.");
                return res.status(400).json({ isError: true, response: "No product found." });
            }
        }
      } catch (err) {
        console.error(err);

        return {
          statusCode: 500,
          body: JSON.stringify({ msg: err }),
        };
      }
      break;
    case "filter":
        try {
            if (requestMethod === "GET" && action === "setProducts") {
              const sortOption = (req.query.sort as string) ?? "";
              const categoryId = (req.query.categoryId as string) ?? "";
              const filters = JSON.parse(req.query.filters as string) ?? {};
              const minPrice = req.query.minPrice ? parseFloat(req.query.minPrice as string) : undefined;
              const maxPrice = req.query.maxPrice ? parseFloat(req.query.maxPrice as string) : undefined;
    
              if (!categoryId) {
                return res.status(400).json({ isError: true, response: "Category ID is required." });
              }
    
              const accessToken = await initializeShopperConfig();
              clientConfig.headers['authorization'] = `Bearer ${accessToken}`;
    
              // Build the dynamic refine parameters
              const refineParams = [`cgid=${categoryId}`];

              if (minPrice !== undefined && maxPrice !== undefined) {
                refineParams.push(`price=(${minPrice}..${maxPrice})`);
              }
 
              
             // Process other filters
            Object.keys(filters).forEach(key => {
                console.log(`Processing filter key: ${key}`);
                console.log(`Filter values for ${key}:`, filters[key]);
                if (Array.isArray(filters[key]) && filters[key].length > 0) {
                    filters[key].forEach((value: string) => {
                        console.log(`Adding filter ${key}=${value}`);
                        refineParams.push(`${key}=${value}`);
                    });
                    const combinedValues = filters[key].join('|');
                    refineParams.push(`${key}=${combinedValues}`);
                }
            });

              // Ensure sortOption is included only if it has a valid value
                const sortParam = sortOption ? sortOption : undefined;
    
              const options = {
                headers: {
                  Authorization: `Bearer ${accessToken}`
                },
                parameters: {
                  organizationId: clientConfig.parameters.organizationId,
                  siteId: clientConfig.parameters.siteId,
                  refine: refineParams,
                  sort: sortParam,
                },
              };
    
              const shopperSearchClient = new Search.ShopperSearch(clientConfig);
              const productResults = await shopperSearchClient.productSearch(options);
              
              if (productResults.total > 0) {
                return res.status(200).json({ isError: false, response: productResults });
              } else {
                return res.status(400).json({ isError: true, response: "No product found." });
              }
            }
        } catch (err) {
            console.error("Error during product search:", err);
            return res.status(500).json({ msg: err });
        }
        break;
    default:
      return res.status(400).json({ isError: true });
  }
};

export default handler;
