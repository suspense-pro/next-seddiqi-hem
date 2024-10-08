import { NextApiRequest, NextApiResponse } from "next";
import { Customer, slasHelpers } from "commerce-sdk";
import initializeShopperConfig, { basicAuthorization, clientConfig, getRefereshTokenResponse } from "@utils/sfcc-connector/config";
import { getCustomer } from "@utils/sfcc-connector/dataService";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const requestMethod = req.method;
  const body = req?.body !== "" ? JSON.parse(req?.body) : null;
  const query = req.query.api ?? "";
  const action = req.query.action ?? "";

  switch (query) {
    case "login":
      try {
        if (requestMethod === "POST" && action === "loginCustomer") {
          const { username, password} = body;
          const client = new Customer.ShopperLogin(clientConfig);

          const registeredUserTokenResponse = await slasHelpers.loginRegisteredUserB2Cprivate(client, 
            { clientSecret: clientConfig.parameters.clientSecret, password: password, username: username }, {redirectURI: process.env.REDIRECT_URI}
          );

          /** Things to do after getting the token
           * Save token, refresh_token, and customerID in a session
           * get the customer profile object and return to front-end (done)
           * refreshToken API implementation (done)
           * token expiry track (handled in config.ts --> getRefereshTokenResponse)
           */

          /** Get refresh token 
          const newToken = await getRefereshTokenResponse(registeredUserTokenResponse.refresh_token);
          console.log("Refresh Token: " + JSON.stringify(newToken, null, 4)); */

          const profile = await getCustomer(registeredUserTokenResponse.customer_id, registeredUserTokenResponse.access_token);
          return profile;
        }
      } catch (err) {
        console.error(err);

        return {
          statusCode: 500,
          body: JSON.stringify({ msg: err }),
        };
      }
      break;
    
    case "passwordlessLogin":
      try {
        if (requestMethod === "POST" && action === "passwordlessLoginCustomer") {
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
                  callback_uri: process.env.REDIRECT_URI,
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
        }
      } catch (err) {
        console.error(err);

        return {
          statusCode: 500,
          body: JSON.stringify({ msg: err }),
        };
      }
      break;

    case "passwordlessAccessToken":
      try {
        if (requestMethod === "POST" && action === "getAccessToken") {
          const { otp } = body;
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
                  client_id: clientConfig.parameters.clientId,
                  grant_type: "client_credentials",
                  hint: "pwdless_login",
                  pwdless_login_token: otp,
              },
          };

          const TokenResponse = await client.getPasswordLessAccessToken(options)
            .then((TokenResponse) => {
              console.log("Guest Token Response: ", TokenResponse);
              return TokenResponse;
            })
            .catch(error => console.log("Error fetching token for guest login: ", error));
        }
      } catch (err) {
        console.error(err);

        return {
          statusCode: 500,
          body: JSON.stringify({ msg: err }),
        };
      }
      break;
    
    case "logout":
      try {
        if (requestMethod === "POST" && action === "logoutCustomer") {
          const { refreshToken } = body;
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
                  refresh_token: refreshToken
              },
          };

          const TokenResponse = await client.logoutCustomer(options)
            .then((TokenResponse) => {
              console.log("Guest Token Response: ", TokenResponse);
              return TokenResponse;
            })
            .catch(error => console.log("Error fetching token for guest login: ", error));
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
