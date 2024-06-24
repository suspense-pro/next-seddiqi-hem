import { NextApiRequest, NextApiResponse } from 'next'
// import { useRef } from "react";
import { Customer } from "commerce-sdk";
import initializeShopperConfig, { clientConfig } from "@utils/sfcc-connector/config";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
    const requestMethod = req.method;
    // const body = req?.body !== "" ? JSON.parse(req?.body) : null;
    // const query = req.query.api ?? "";

    switch (requestMethod) {
        case "GET":
            try {

                const configWithAuth = await initializeShopperConfig();
                const client = new Customer.ShopperCustomers(clientConfig);

                const options = {
                    headers: {
                    Authorization: `Bearer ${configWithAuth}`,
                    },
                    parameters: {
                    siteId: clientConfig.parameters.siteId,
                    organizationId: clientConfig.parameters.organizationId,
                    customerId: "abxekWlrcWxHARkKo0wGYYxbdI"
                    },
                };

                return client
                    .getCustomer(options)
                    .then((customer) => console.log("Customer Info: ", customer))
                    .catch((error) => console.log("Error getting customer: ", error));
            } catch (err) {
                console.error(err);
      
                return {
                    statusCode: 500,
                    body: JSON.stringify({ msg: err }),
                };
            }
            break;
        default:
            res.status(405).json({ message: 'Method not allowed' });
            // return res.status(400).json({ isError: true });
    }

}

export default handler;