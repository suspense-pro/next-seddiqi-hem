import { Customer, slasHelpers } from "commerce-sdk";
import { TokenResponse } from "commerce-sdk/dist/helpers/slasClient";

export const clientConfig = {
  headers: {},
  parameters: {
    clientId: process.env.SFDC_CLIENT_ID,
    clientSecret: process.env.SFDC_SECRET,
    organizationId: process.env.SFDC_ORGANIZATIONID,
    shortCode: process.env.SFDC_SHORTCODE,
    siteId: process.env.SFDC_SITEID,
  },
};

export const AccountMgrConfig = {
  parameters: {
    clientId: process.env.ACCOUNT_MGR_CLIENT_ID,
    password: process.env.ACCOUNT_MGR_PASSWORD,
    realmId: process.env.SFCC_REALM_ID,
    instanceId: process.env.SFCC_INSTANCE_ID,
    scopes: process.env.SFCC_OAUTH_SCOPES,
    api: process.env.SFCC_OAUTH_API_URL,
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

/** Get OAuth token from account manager */

export async function OAuthTokenFromAM() {
  const credentials = `${AccountMgrConfig.parameters.clientId}:${AccountMgrConfig.parameters.password}`;
  const base64data = Buffer.from(credentials).toString("base64");
  const OAuthBaseUrl = `${AccountMgrConfig.parameters.api}`;

  const headers = {
    'Authorization': `Basic ${base64data}`,
    'Content-Type' : 'application/x-www-form-urlencoded',
  }
  const body = new URLSearchParams({
    grant_type: "client_credentials",
    scope: `SALESFORCE_COMMERCE_API:${AccountMgrConfig.parameters.realmId}_${AccountMgrConfig.parameters.instanceId} ${AccountMgrConfig.parameters.scopes}`
  });

  const accountMgrAccessToken : any = await fetch(OAuthBaseUrl, {
    method: 'POST',
    headers,
    body: body.toString()
  })
  .then((accountMgrAccessToken) => {
    console.log("Account Manager Access token: ", accountMgrAccessToken);
    return accountMgrAccessToken;
  })
  .catch(error => console.log("Error fetching access token for account manager: ", error));
  const data = await accountMgrAccessToken.json();
  
  var access_token : string = data.access_token;

  return access_token;
}
