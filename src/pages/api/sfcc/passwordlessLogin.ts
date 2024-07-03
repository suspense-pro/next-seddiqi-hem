import { NextApiRequest, NextApiResponse } from "next";
import { Customer, slasHelpers } from "commerce-sdk";
import initializeShopperConfig, {basicAuthorization, clientConfig } from "@utils/sfcc-connector/config";


const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const requestMethod = req.method;
  const body = req?.body !== "" ? JSON.parse(req?.body) : null;

  switch (requestMethod) {
    case "POST":
      try {
        const { username } = body;
        const base64data = await basicAuthorization();
        const client = new Customer.ShopperLogin(clientConfig);

        const options = {
            headers: {
                Authorization: `Basic ${base64data}`,
            },
            parameters: {
                organizationId: clientConfig.parameters.organizationId
            },
            body: {
                callback_uri: "https://webhook.site/0eb817d1-401a-4f0b-b99f-77cb80900f20", // process.env.REDIRECT_URI,
                channel_id: clientConfig.parameters.siteId,
                mode: "callback",
                user_id: username,
            },
        };

        const TokenResponse = await client.authorizePasswordlessCustomer(options)
          .then((TokenResponse) => {
            console.log("Guest Token Response: ", TokenResponse);
            return TokenResponse;
          })
          .catch(error => console.log("Error fetching token for guest login: ", error));
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
