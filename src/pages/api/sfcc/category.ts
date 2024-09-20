import { NextApiRequest, NextApiResponse } from "next";
import { Product } from "commerce-sdk";
import initializeShopperConfig, { clientConfig } from "@utils/sfcc-connector/config";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
    const requestMethod = req.method;
    const query = req.query.api ?? "";
    const action = req.query.action ?? "";
    const categoryId = (req.query.cgid as string) ?? "";

    switch (query) {
        case "category":
            try {
                if (requestMethod === "GET" && action === "getCategory") {
                    const accessToken = await initializeShopperConfig();
                    clientConfig.headers['authorization'] = `Bearer ${accessToken}`;
                    const shopperProductsClient = new Product.ShopperProducts(clientConfig);

                    const options = {
                        headers: {
                            Authorization: `Bearer ${accessToken}`
                        },
                        parameters: {
                            organizationId: clientConfig.parameters.organizationId,
                            siteId: clientConfig.parameters.siteId,
                            id: categoryId,
                        },
                    };

                    const categoryResults = await shopperProductsClient.getCategory(options);    
                    if (categoryResults.onlineSubCategoriesCount > 0) {
                        // console.log("Categories : " + JSON.stringify(categoryResults, null, 4));
                        return res.status(200).json({ isError: false, response: categoryResults });
                    } else {
                        console.log("No category found.");
                        return res.status(400).json({ isError: true, response: "No category found." });
                    }
                }

            } catch(err) {
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
}

export default handler;
