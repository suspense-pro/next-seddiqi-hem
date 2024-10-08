import { NextRequest, NextResponse } from "next/server";
import logger from "@utils/logger";
import isServer from "@utils/helpers/isServer";
import { transformTechSpecsDetails } from "./transformation";

export async function registerCustomer({
  userData,
  method,
}: {
  userData: any;
  method: string;
}) {
  try {
    const json = {
      api: "register",
      action: "registerCustomer"
    };
    const config = {
      method: method,
      body: userData,
    };
    const queryString = new URLSearchParams(json).toString();
    const res = await serverApiCallSfcc(`?${queryString}`, config, "customer");
    return res;
  } catch (err) {
    logger.error("API threw Error", err);
    throw err;
  }
}

export async function loginCustomer({
  userData,
  method,
}: {
  userData: any;
  method: string;
}) {
  try {
    const json = {
      api: "login",
      action: "loginCustomer"
    };
    const config = {
      method: method,
      body: userData,
    };
    const queryString = new URLSearchParams(json).toString();
    const res = await serverApiCallSfcc(`?${queryString}`, config, "login");
    return res;
  } catch (err) {
    logger.error("API threw Error", err);
    throw err;
  }
}

export async function passwordlessLoginCustomer({
  userData,
  method,
}: {
  userData: any;
  method: string;
}) {
  try {
    const json = {
      api: "passwordlessLogin",
      action: "passwordlessLoginCustomer"
    };
    const config = {
      method: method,
      body: userData,
    };
    const queryString = new URLSearchParams(json).toString();
    const res = await serverApiCallSfcc(`?${queryString}`, config, "login");
    return res;
  } catch (err) {
    logger.error("API threw Error", err);
    throw err;
  }
}

export async function passwordlessAccessToken({
  userData,
  method,
}: {
  userData: any;
  method: string;
}) {
  try {
    const json = {
      api: "passwordlessAccessToken",
      action: "getAccessToken"
    };
    const config = {
      method: method,
      body: userData,
    };
    const queryString = new URLSearchParams(json).toString();
    const res = await serverApiCallSfcc(`?${queryString}`, config, "login");
    return res;
  } catch (err) {
    logger.error("API threw Error", err);
    throw err;
  }
}

export async function updateCustomer({
  userData,
  method,
  customerId,
  access_token
}: {
  userData: any;
  method: string;
  customerId: string; 
  access_token: string;
}) {
  try {
    const json = {
      api: "updateProfile",
      action: "updateCustomer",
      customerId: customerId,
      accessToken: access_token,
    };
    const config = {
      method: method,
      body: userData,
    };
    const queryString = new URLSearchParams(json).toString();
    const res = await serverApiCallSfcc(`?${queryString}`, config, "customer");
    return res;
  } catch (err) {
    logger.error("API threw Error", err);
    throw err;
  }
}

export async function createCustomerAddress({
  userData,
  method,
  customerId,
  access_token
}: {
  userData: any;
  method: string;
  customerId: string; 
  access_token: string;
}) {
  try {
    const json = {
      api: "newAddress",
      action: "createAddress",
      customerId: customerId,
      accessToken: access_token,
    };
    const config = {
      method: method,
      body: userData,
    };
    const queryString = new URLSearchParams(json).toString();
    const res = await serverApiCallSfcc(`?${queryString}`, config, "customer");
    return res;
  } catch (err) {
    logger.error("API threw Error", err);
    throw err;
  }
}

export async function updateCustomerAddress({
  userData,
  addressName,
  method,
  customerId,
  access_token
}: {
  addressName: string;
  method: string;
  customerId: string; 
  access_token: string;
  userData: any;
}) {
  try {
    const json = {
      api: "updateAddress",
      action: "updateCustomerAddress",
      customerId: customerId,
      accessToken: access_token,
      addressName: addressName,
    };
    const config = {
      method: method,
      body: userData,
    };
    const queryString = new URLSearchParams(json).toString();
    const res = await serverApiCallSfcc(`?${queryString}`, config, "customer");
    return res;
  } catch (err) {
    logger.error("API threw Error", err);
    throw err;
  }
}

export async function getCustomerAddress({
  addressName,
  method,
  customerId,
  access_token
}: {
  addressName: string;
  method: string;
  customerId: string; 
  access_token: string;
}) {
  try {
    const json = {
      api: "address",
      action: "getAddress",
      customerId: customerId,
      accessToken: access_token,
      addressName: addressName,
    };
    const config = {
      method: method,
    };
    const queryString = new URLSearchParams(json).toString();
    const res = await serverApiCallSfcc(`?${queryString}`, config, "customer");
    return res;
  } catch (err) {
    logger.error("API threw Error", err);
    throw err;
  }
}

export async function removeCustomerAddress({
  addressName,
  method,
  customerId,
  access_token
}: {
  addressName: string;
  method: string;
  customerId: string; 
  access_token: string;
}) {
  try {
    const json = {
      api: "removeAddress",
      action: "removeAddress",
      customerId: customerId,
      accessToken: access_token,
      addressName: addressName,
    };
    const config = {
      method: method,
    };
    const queryString = new URLSearchParams(json).toString();
    const res = await serverApiCallSfcc(`?${queryString}`, config, "customer");
    return res;
  } catch (err) {
    logger.error("API threw Error", err);
    throw err;
  }
}

export async function updateCustomerPassword({
  userData,
  method,
  customerId,
  access_token
}: {
  userData: any;
  method: string;
  customerId: string; 
  access_token: string;
}) {
  try {
    const json = {
      api: "password",
      action: "updatePassword",
      customerId: customerId,
      accessToken: access_token,
    };
    const config = {
      method: method,
      body: userData,
    };
    const queryString = new URLSearchParams(json).toString();
    const res = await serverApiCallSfcc(`?${queryString}`, config, "customer");
    return res;
  } catch (err) {
    logger.error("API threw Error", err);
    throw err;
  }
}

export async function deleteCustomerAccount({
  emailAddress,
  method,
  customerId,
  access_token
}: {
  emailAddress: string;
  method: string;
  customerId: string; 
  access_token: string;
}) {
  try {
    const json = {
      api: "account",
      action: "deleteShopper",
      customerId: customerId,
      accessToken: access_token,
      emailAddress: emailAddress,
    };
    const config = {
      method: method,
    };
    const queryString = new URLSearchParams(json).toString();
    const res = await serverApiCallSfcc(`?${queryString}`, config, "customer");
    return res;
  } catch (err) {
    logger.error("API threw Error", err);
    throw err;
  }
}

export async function getPasswordResetToken({
  method,
  userId,
  access_token
}: {
  method: string;
  userId: string; 
  access_token: string;
}) {
  try {
    const json = {
      api: "resetPassword",
      action: "resetToken",
      userId: userId,
      accessToken: access_token,
    };
    const config = {
      method: method,
    };
    const queryString = new URLSearchParams(json).toString();
    const res = await serverApiCallSfcc(`?${queryString}`, config, "customer");
    return res;
  } catch (err) {
    logger.error("API threw Error", err);
    throw err;
  }
}

export async function resetPassword ({
  method,
  userId,
  codeVerifier,
  access_token,
  userData,

}: {
  method: string;
  userId: string;
  codeVerifier: string; 
  access_token: string;
  userData: any
}) {
  try {
    const json = {
      api: "setPassword",
      action: "resetPassword",
      userId: userId,
      accessToken: access_token,
      codeVerifier: codeVerifier,
    };
    const config = {
      method: method,
      body: userData,
    };
    const queryString = new URLSearchParams(json).toString();
    const res = await serverApiCallSfcc(`?${queryString}`, config, "customer");
    return res;
  } catch (err) {
    logger.error("API threw Error", err);
    throw err;
  }
}

export async function logoutCustomer({
  userData,
  method,
}: {
  userData: any;
  method: string;
}) {
  try {
    const json = {
      api: "logout",
      action: "logoutCustomer"
    };
    const config = {
      method: method,
      body: userData,
    };
    const queryString = new URLSearchParams(json).toString();
    const res = await serverApiCallSfcc(`?${queryString}`, config, "login");
    return res;
  } catch (err) {
    logger.error("API threw Error", err);
    throw err;
  }
}


export const getCustomer = async (customerId: string, access_token: string): Promise<any> => {
  try {
    const json = {
      api: "customer",
      action: "getCustomer",
      customerId: customerId,
      accessToken: access_token
    };
    const config = {
      method: "GET",
    };
    const queryString = new URLSearchParams(json).toString();
    const res = await serverApiCallSfcc(`?${queryString}`, config, "customer");
    return res;
  } catch (err) {
    logger.error("API threw Error", err);
    throw err;
  }
};

export async function getProductListing({
  categoryId,
  method,
}: {
  categoryId: any;
  method: string;
}) {
  try {
    const json = {
      api: "product",
      action: "getProducts"
    };
    const config = {
      method: method,
      body: JSON.stringify(categoryId),
    };
    const queryString = new URLSearchParams(json).toString();
    
    const res = await serverApiCallSfcc(`?${queryString}`, config, "product");

    console.log({res});

    if(!res) {
      return null;
    }
     
    return res.response;
    
  } catch (err) {
    logger.error("API threw Error", err);
    throw err;
  }
}

export async function getCategoryFilters({
  cgid,
  method,
}: {
  cgid: any;
  method: string;
}) {
  try {
    const json = {
      api: "filters",
      action: "getFilters",
      cgid: cgid,
    };
    const config = {
      method: method,
    };
    const queryString = new URLSearchParams(json).toString();
    
    const res = await serverApiCallSfcc(`?${queryString}`, config, "category");

    console.log({res});

    if(!res) {
      return null;
    }
     
    return res.response;
    
  } catch (err) {
    logger.error("API threw Error", err);
    throw err;
  }
}

export async function setFilters({
  method,
  categoryId,
  filters,
  sortOption,
  maxPrice,
  minPrice,
}: {
  method: string;
  categoryId?: string;
  filters?: any;
  sortOption?: string;
  maxPrice?: any;
  minPrice?: any;
}) {
  try { 
    const json: any = {
      api: "filter",
      action: "setProducts",
      categoryId: categoryId,
      filters: JSON.stringify(filters),
      sort: sortOption,
      maxPrice: maxPrice,
      minPrice: minPrice,
    };

    const config = {
      method: method,
    };
    const queryString = new URLSearchParams(json).toString();

    const res = await serverApiCallSfcc(`?${queryString}`, config, "product");

    console.log({ res });

    if (!res) {
      return null;
    }

    return res.response;
  } catch (err) {
    logger.error("API threw Error", err);
    throw err;
  }
}


export async function getProductDetails({
  productId,
  method,
}: {
  productId: string;
  method: string;
}) {
  try {
    const json = {
      api: "productDetail",
      action: "getProductDetails",
      pid: productId
    };
    const config = {
      method: method,
    };
    const queryString = new URLSearchParams(json).toString();
    const res = (await serverApiCallSfcc(`?${queryString}`, config, "product"));
    console.log("res: ", res);
    const techSpecs = transformTechSpecsDetails(res.response);

    return {...res, techSpecs};
  } catch (err) {
    logger.error("API threw Error", err);
    throw err;
  }
}

export async function getProducts({
  pids,
  method,
}: {
  pids: any;
  method: string;
}) {
  try {
    const json = {
      api: "productList",
      action: "getMultipleProducts",
      productIds: pids,
    };
    const config = {
      method: method,
    };
    const queryString = new URLSearchParams(json).toString();
    
    const res = await serverApiCallSfcc(`?${queryString}`, config, "product");

    //console.log({res});

    if(!res) {
      return null;
    }
     
    return res.response;
    
  } catch (err) {
    logger.error("API threw Error", err);
    throw err;
  }
}

export async function getSearchResults({
  query,
  method,
}: {
  query: string;
  method: string;
}) {
  try {
    const json = {
      api: "search",
      action: "getProducts",
      search: query
    };
    const config = {
      method: method,
    };
    const queryString = new URLSearchParams(json).toString();
    const res = (await serverApiCallSfcc(`?${queryString}`, config, "search"));
    return res;
  } catch (err) {
    logger.error("API threw Error", err);
    throw err;
  }
}

export async function getStores({
  method,
  brand,
  city,
  name,
}: {
  method: string;
  brand: string;
  city: string;
  name: string;
}) {
  try {
    const json = {
      api: "search",
      action: "getStores",
      ...(brand && { brand }),      // Include brand filter if provided
      ...(city && { city }),        // Include city filter if provided
      ...(name && { name }), // Include location filter if provided
    };
    const config = {
      method: method,
    };
    const queryString = new URLSearchParams(json).toString();
    const res = (await serverApiCallSfcc(`?${queryString}`, config, "store"));
    return res;
  } catch (err) {
    logger.error("API threw Error", err);
    throw err;
  }
}

export async function getCategory({
  method,
  cgid,
}: {
  method: string;
  cgid: string;
}) {
  try {
    const json = {
      api: "category",
      action: "getCategory",
      cgid: cgid,
    };
    const config = {
      method: method,
    };
    const queryString = new URLSearchParams(json).toString();
    const res = (await serverApiCallSfcc(`?${queryString}`, config, "category"));
    return res;
  } catch (err) {
    logger.error("API threw Error", err);
    throw err;
  }
}

export async function subscribedToNewsletter({
  method,
  userData,
}: {
  method: string;
  userData: any;
}) {
  try {
    const json = {
      api: "newsletter",
      action: "subscription",
    };
    const config = {
      method: method,
      body: JSON.stringify(userData),
    };
    const queryString = new URLSearchParams(json).toString();
    const res = (await serverApiCallSfcc(`?${queryString}`, config, "newsletter"));
    return res;
  } catch (err) {
    logger.error("API threw Error", err);
    throw err;
  }
}

let apiConfig: any;

const cacheApiConfig = () => {
  if (!isServer()) {
      return "";
  }

  if (!apiConfig) {
      apiConfig = process.env.NEXT_PUBLIC_HOSTED_URL ?? "http://localhost:3000";
  }

  return apiConfig;
};

/** This is the fetch call to the pages > api */
const serverApiCallSfcc = async (query: string, config: any, type: string) =>
  await (await fetch(`${cacheApiConfig()}/api/sfcc/${type}${query}`, config)).json();

// This is called from `app/api/revalidate.ts` so providers can control revalidation logic.
// eslint-disable-next-line no-unused-vars
export async function revalidate(req: NextRequest): Promise<NextResponse> {
  return NextResponse.json({ status: 200, revalidated: true, now: Date.now() });
}
