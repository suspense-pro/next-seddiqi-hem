import { NextApiRequest, NextApiResponse } from "next";
import { Customer, slasHelpers, Product, ClientConfig } from "commerce-sdk";
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
            if (requestMethod === "POST" && action === "setFilters") {
                const { categoryId, filters } = body;
                const accessToken = await initializeShopperConfig();
                clientConfig.headers['authorization'] = `Bearer ${accessToken}`;
                const productsClient = new Product.Products(clientConfig);
                var accountMgrAccessToken = await OAuthTokenFromAM();
                console.log("Filters: " + JSON.stringify(filters));

                // Build the dynamic filters
                const filterQuery = {
                    operator: "or",
                    filters: []
                };
                
                // Add filters to the filter query, excluding unqueryable fields
                Object.keys(filters).forEach(key => {
                    if (filters[key].length > 0) {
                        filters[key].forEach(value => {
                            filterQuery.filters.push({
                                termFilter: {
                                    field: key,
                                    operator: "is",
                                    values: [value]
                                }
                            });
                        });
                    }
                });

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
                        expand: ["all"],
                        offset: 0,
                        sorts: [
                            {
                                field: "creationDate",
                                sortOrder: "desc"
                            }
                        ],
                        query: {
                            filteredQuery: {
                                query: {
                                    termQuery: {
                                        fields: [
                                            "categoryId"
                                        ],
                                        operator: "is",
                                        values: [categoryId]
                                    }
                                },
                                filter: {
                                    boolFilter: filterQuery,
                                }
                            }
                        }
                    }
                };
                
                const productResults = await productsClient.searchProducts(options);
                const result : any = {};
                if (productResults.total > 0) {
                    console.log("Product(s): " + JSON.stringify(productResults, null, 4));
                    result.productResults = productResults;
    
                    // Price range graph - JSON
                    const priceRangeJson = getProductPriceGraph(productResults);
                    console.log("Price Range Data: " + priceRangeJson);
                    result.priceRangeJson = priceRangeJson;

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
    default:
      return res.status(400).json({ isError: true });
  }
};

export default handler;
