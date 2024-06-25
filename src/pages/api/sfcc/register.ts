import { NextApiRequest, NextApiResponse } from 'next'
// import { useRef } from "react";
import { Customer } from "commerce-sdk";
import initializeShopperConfig, { clientConfig } from "@utils/sfcc-connector/config";
 
const handler = async (req: NextApiRequest, res: NextApiResponse) => {
    const requestMethod = req.method; // "POST"
    const body = req?.body !== "" ? JSON.parse(req?.body) : null;
    // const query = req.query.api ?? "";

    switch (requestMethod) {
        case "POST":
            try {
                const { fname, lname, username, email, password } = body;
                // const { isError, response } = { isError: false, response: null }; //await function here from utils service;

                const configWithAuth = await initializeShopperConfig();
                const client = new Customer.ShopperCustomers(clientConfig);

                const options = {
                    headers: {
                    Authorization: `Bearer ${configWithAuth}`,
                    },
                    parameters: {
                        siteId: clientConfig.parameters.siteId,
                        organizationId: clientConfig.parameters.organizationId
                    },
                    body: {
                        password: password,
                        customer: {
                            login: username,
                            email: email,
                            firstName: fname,
                            lastName: lname,
                        },
                    },
                };

                return client
                    .registerCustomer(options)
                    .then((shopper) => console.log("Registerered Shopper: ", shopper))
                    .catch((error) => console.log("Error registering shopper: ", error));
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