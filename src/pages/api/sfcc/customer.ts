import { NextApiRequest, NextApiResponse } from 'next'
import { Customer, slasHelpers } from "commerce-sdk";
import initializeShopperConfig, { clientConfig } from "@utils/sfcc-connector/config";
import { middlewareConfig, getGuestTokenResponse, getShopperTokenResponse } from "@utils/sfcc-connector/config";
import saveGoldenIDToCustomerProfile, { generateRandomString, generateCodeChallenge }from "@utils/sfcc-connector/customerUtils";
const customerAPI = middlewareConfig.parameters.api + '/customer';
 
const handler = async (req: NextApiRequest, res: NextApiResponse) => {
    const requestMethod = req.method;
    const body = req?.body !== "" ? JSON.parse(req?.body) : null;
    const query = req.query.api ?? "";
    const action = req.query.action ?? "";

    switch (query) {
        case "register":
            try {
                if (requestMethod === "POST" && action === "registerCustomer") {
                    const { salutation, fname, lname, phone, email, password } = body;
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
                                salutation: salutation,
                                login: email,
                                email: email,
                                firstName: fname,
                                lastName: lname,
                                phoneMobile: phone,
                            },
                        },
                    };

                    var shopperResponse = await client.registerCustomer(options);
                    // console.log("SFCC Customer: " + JSON.stringify(shopperResponse));
                    
                    if (shopperResponse.customerNo) {
                        /** call to upsert API to get Golden ID */
                        const upsertOptions = {
                            method: requestMethod,
                            headers: {
                                'Content-Type': 'application/json',
                                'client_id': middlewareConfig.parameters.client_id,
                                'client_secret': middlewareConfig.parameters.client_secret,
                                'storeCode': middlewareConfig.parameters.storeCode,
                                'x-correlation-id': middlewareConfig.parameters.x_correlation_id,
                            },
                            body: JSON.stringify({
                                customerId: shopperResponse.customerNo,
                                firstName: shopperResponse.firstName,
                                lastName: shopperResponse.lastName,
                                email: shopperResponse.email,
                                source: middlewareConfig.parameters.source,
                                registrationDate: new Date(shopperResponse.creationDate).toISOString().split('T')[0],
                                lastModifiedTimestamp: shopperResponse.lastModified,
                                preferredLanguage: shopperResponse.preferredLocale,
                                phoneNumber: shopperResponse.phoneMobile,
                                emailOptIn: false,
                                smsOptIn: false,
                                whatsappOptIn: false,
                                isGuestCustomer: false
                            }),
                        };

                        const response = await fetch(customerAPI, upsertOptions);
                        if (!response.ok) {
                            throw new Error(`Error: ${response.status}`);
                        }
                        const result = await response.json();
                        if (result.action === "insert" && result.sfCustomerId) {
                            // console.log("customer : " + JSON.stringify(result, null, 4));
                            /* save the golden ID in SFCC customer profile 
                                1. update the customer profile with golden ID */
                            shopperResponse = {...shopperResponse}
                            shopperResponse.currentPassword = password;

                            saveGoldenIDToCustomerProfile(shopperResponse, result.sfCustomerId);

                            return res.status(200).json({ isError: false, response: result });
                        } else {
                            console.log("Failed to get Golden ID.");
                            return res.status(400).json({ isError: true, response: "Failed to get Golden ID." });
                        }
                    } else {
                        console.log("Registration Failed.");
                        return res.status(400).json({ isError: true, response: "Error registering shopper" });
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

        case "customer":
                try {
                    if (requestMethod === "GET" && action === "getCustomer") {
                        const { customerId } = body;
    
                        const configWithAuth = await initializeShopperConfig();
                        const client = new Customer.ShopperCustomers(clientConfig);

                        const options = {
                            headers: {
                            Authorization: `Bearer ${configWithAuth}`,
                            },
                            parameters: {
                            siteId: clientConfig.parameters.siteId,
                            organizationId: clientConfig.parameters.organizationId,
                            customerId: customerId
                            },
                        };

                        return client
                            .getCustomer(options)
                            .then((customer) => console.log("Customer Info: ", customer))
                            .catch((error) => console.log("Error getting customer: ", error));
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
            res.status(405).json({ message: 'Method not allowed' });
            // return res.status(400).json({ isError: true });
    }

}

export default handler;