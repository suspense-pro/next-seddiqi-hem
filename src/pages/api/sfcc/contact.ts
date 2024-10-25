import { NextApiRequest, NextApiResponse } from "next";
import { middlewareConfig } from "@utils/sfcc-connector/config";
const contactAPI = middlewareConfig.parameters.api + '/contact';

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
    const requestMethod = req.method;
    const body = req?.body !== "" ? JSON.parse(req?.body) : null;
    const query = req.query.api ?? "";
    const action = req.query.action ?? "";

    switch (query) {
        case "contact":
            try {
                if (requestMethod === "POST" && action === "contactUsSubmission") {
                    const { email, firstName, lastName, phoneNumber, orderReferenceNumber, message, type } = body;
                    const options = {
                        method: requestMethod,
                        headers: {
                            'Content-Type': 'application/json',
                            'client_id': middlewareConfig.parameters.client_id,
                            'client_secret': middlewareConfig.parameters.client_secret,
                            'storeCode': middlewareConfig.parameters.storeCode,
                            'x-correlation-id': middlewareConfig.parameters.x_correlation_id,
                        },
                        body: JSON.stringify({
                            email: email,
                            firstName: firstName,
                            lastName: lastName,
                            orderReferenceNumber: orderReferenceNumber,
                            type: type,
                            message: message,
                            phoneNumber: phoneNumber,
                            source: middlewareConfig.parameters.source,
                        }),
                    };

                    const response = await fetch(contactAPI, options);
                    const result = await response.json();
                    
                    if (!response.ok) {
                        console.log("Contact us form submission failed.");
                        return res.status(400).json({ isError: true, response: result });
                    }

                    if (result.message === "success" && result.code === 200) {
                        // console.log("contact us : " + JSON.stringify(result, null, 4));
                        return res.status(200).json({ isError: false, response: result });
                    } else {
                        console.log("Request submission failed.");
                        return res.status(400).json({ isError: true, response: result });
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
