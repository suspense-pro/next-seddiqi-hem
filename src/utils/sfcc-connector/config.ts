import { Customer, slasHelpers } from "commerce-sdk";

export const clientConfig = {
  headers: {
    authorization: ``,
  },
  parameters: {
    clientId: process.env.SFDC_CLIENT_ID,
    secret: process.env.SFDC_SECRET,
    organizationId: process.env.SFDC_ORGANIZATIONID,
    shortCode: process.env.SFDC_SHORTCODE,
    siteId: process.env.SFDC_SITEID,
  },
};

export default async function initializeShopperConfig() {
  const credentials = `${clientConfig.parameters.clientId}:${clientConfig.parameters.secret}`;
  const base64data = Buffer.from(credentials).toString("base64");
  const headers = { Authorization: `Basic ${base64data}` };
  const client = new Customer.ShopperLogin(clientConfig);

  const shopperToken = await client.getAccessToken({
    headers,
    body: {
      grant_type: "client_credentials",
    },
  });

  const configWithAuth = {
    ...clientConfig,
    headers: { authorization: `Bearer ${shopperToken.access_token}` },
  };

  return configWithAuth;
}
