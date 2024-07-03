import { NextApiRequest, NextApiResponse } from "next";
import { Customer, slasHelpers } from "commerce-sdk";
import initializeShopperConfig, {basicAuthorization, clientConfig } from "@utils/sfcc-connector/config";


const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const requestMethod = req.method;
  const body = req?.body !== "" ? JSON.parse(req?.body) : null;

  switch (requestMethod) {
    case "POST":
      try {
        // const { username } = body;
        const base64data = await basicAuthorization();
        const configWithAuth = await initializeShopperConfig();
        const client = new Customer.ShopperLogin(clientConfig);

        const options = {
            headers: {
                Authorization: `Bearer ${configWithAuth}`,
            },
            parameters: {
                channel_id: clientConfig.parameters.siteId,
                client_id: clientConfig.parameters.clientId,
                organizationId: clientConfig.parameters.organizationId,
                refresh_token: "NKvuA9Z3QhJ4VyOmPxwjSBjflraarLd6XOd3kYjefnQ"
            },
        };

        const TokenResponse = await client.logoutCustomer(options)
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
