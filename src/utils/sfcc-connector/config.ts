import { Customer, slasHelpers } from "commerce-sdk";
import { TokenResponse } from "commerce-sdk/dist/helpers/slasClient";

export const clientConfig = {
  parameters: {
    clientId: process.env.SFDC_CLIENT_ID,
    clientSecret: process.env.SFDC_SECRET,
    organizationId: process.env.SFDC_ORGANIZATIONID,
    shortCode: process.env.SFDC_SHORTCODE,
    siteId: process.env.SFDC_SITEID,
  },
};

export default async function initializeShopperConfig() {
  // const credentials = `${clientConfig.parameters.clientId}:${clientConfig.parameters.secret}`;
  // const base64data = Buffer.from(credentials).toString("base64");
  // const headers = { Authorization: `Basic ${base64data}` };
  const client = new Customer.ShopperLogin(clientConfig);

  const guestTokenResponse = await slasHelpers.loginGuestUserPrivate(client, 
    { clientSecret: clientConfig.parameters.clientSecret }
  )
    .then((guestTokenResponse) => {
      console.log("Guest Token Response: ", guestTokenResponse);
      const access_token = guestTokenResponse.access_token;
      return access_token;
    })
    .catch(error => console.log("Error fetching token for guest login: ", error));
  

  /* const shopperToken = await client.getAccessToken({
    headers,
    body: {
      grant_type: "client_credentials",
    },
  }); */

  const configWithAuth = guestTokenResponse;

  return configWithAuth;
}

export async function basicAuthorization() {
  const credentials = `${clientConfig.parameters.clientId}:${clientConfig.parameters.clientSecret}`;
  const base64data = Buffer.from(credentials).toString("base64");

  return base64data;
}
