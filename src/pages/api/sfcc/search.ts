import { NextApiRequest, NextApiResponse } from "next";
import { Search } from "commerce-sdk";
import initializeShopperConfig, { clientConfig } from "@utils/sfcc-connector/config";


const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const requestMethod = req.method;
  const categoryId = (req.query.cgid as string) ?? "";
  const searchPhrase = (req.query.search as string) ?? "";
  const query = req.query.api ?? "";
  const action = req.query.action ?? "";

  switch (query) {
    case "search":
      try {
        if (requestMethod === "GET" && action === "getProducts") {
          const accessToken = await initializeShopperConfig();
          clientConfig.headers['authorization'] = `Bearer ${accessToken}`;
          const refineParams = [`cgid=${categoryId}`];

          const options = {
                headers: {
                  Authorization: `Bearer ${accessToken}`
                },
                parameters: {
                  organizationId: clientConfig.parameters.organizationId,
                  siteId: clientConfig.parameters.siteId,
                  refine: refineParams,
                  q: searchPhrase,
                },
            };

          const shopperSearchClient = new Search.ShopperSearch(clientConfig);
          const productResults = await shopperSearchClient.productSearch(options);

          if (productResults.total > 0) {
            console.log("Search Result(s): " + JSON.stringify(productResults, null, 4));
            return res.status(200).json({ isError: false, response: productResults });
          } else {
            console.log("No matching result found");
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
    case "suggestion":
        try {
            if (requestMethod === "GET" && action === "getSuggestions") {
                const accessToken = await initializeShopperConfig();
                clientConfig.headers['authorization'] = `Bearer ${accessToken}`;

                const options = {
                    headers: {
                        Authorization: `Bearer ${accessToken}`
                    },
                    parameters: {
                        organizationId: clientConfig.parameters.organizationId,
                        siteId: clientConfig.parameters.siteId,
                        q: searchPhrase,
                    },
                };

                const shopperSearchClient = new Search.ShopperSearch(clientConfig);
                const searchSuggestions = await shopperSearchClient.getSearchSuggestions(options);

                if (searchSuggestions) {
                    console.log("Search Suggestion(s): " + JSON.stringify(searchSuggestions, null, 4));
                    return res.status(200).json({ isError: false, response: searchSuggestions });
                } else {
                    console.log("No search suggestions found");
                    return res.status(400).json({ isError: true, response: "No suggestions found." });
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
