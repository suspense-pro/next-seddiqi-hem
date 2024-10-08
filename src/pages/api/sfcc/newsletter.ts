import { NextApiRequest, NextApiResponse } from "next";
import { middlewareConfig } from "@utils/sfcc-connector/config";
const newsletterAPI = middlewareConfig.parameters.api + '/newsletter';

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
    const requestMethod = req.method;
    const body = req?.body !== "" ? JSON.parse(req?.body) : null;
    const query = req.query.api ?? "";
    const action = req.query.action ?? "";

    switch (query) {
        case "newsletter":
            try {
                if (requestMethod === "POST" && action === "subscription") {
                    const { email, isSubscribed } = body;
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
                            isSubscribed: isSubscribed,
                            source: middlewareConfig.parameters.source,
                        }),
                    };

                    const response = await fetch(newsletterAPI, options);
                    
                    if (!response.ok) {
                        throw new Error(`Error: ${response.status}`);
                    }

                    const result = await response.json();
                    if (result.message === "success" && result.code === 200) {
                        // console.log("newsletter : " + JSON.stringify(result, null, 4));
                        return res.status(200).json({ isError: false, response: result });
                    } else {
                        console.log("Subscription Failed.");
                        return res.status(400).json({ isError: true, response: "Subscription Failed." });
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
