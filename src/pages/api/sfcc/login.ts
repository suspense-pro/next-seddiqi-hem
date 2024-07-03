import { NextApiRequest, NextApiResponse } from "next";
import { Customer, slasHelpers } from "commerce-sdk";
import initializeShopperConfig, { clientConfig } from "@utils/sfcc-connector/config";


const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const requestMethod = req.method;
  const body = req?.body !== "" ? JSON.parse(req?.body) : null;
  // const query = req.query.api ?? "";

  switch (requestMethod) {
    case "POST":
      try {
        const { username, password} = body;
        const client = new Customer.ShopperLogin(clientConfig);

        const guestTokenResponse = await slasHelpers.loginRegisteredUserB2Cprivate(client, 
          { clientSecret: clientConfig.parameters.clientSecret, password: password, username: username }, {redirectURI: process.env.REDIRECT_URI}
        )
          .then((guestTokenResponse) => {
            console.log("Guest Token Response: ", guestTokenResponse);
            const access_token = guestTokenResponse.access_token;
            return access_token;
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
