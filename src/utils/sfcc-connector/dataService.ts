import { NextRequest, NextResponse } from "next/server";
import logger from "@utils/logger";
import isServer from "@utils/helpers/isServer";

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


export const getCustomer = async (): Promise<any> => {
  console.log("CLICKED");

  try {
    const json = {
      api: "customer",
      action: "getCustomer"
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

export async function setFilters({
  method,
  categoryId,
  filters,
  sortOption,
  maxPrice,
  minPrice
}: {
  method: string;
  categoryId?: string;
  filters?: any;
  sortOption?: string;
  maxPrice?: any;
  minPrice?: any;
}) {
  try {
    const json = {
      api: "filter",
      action: "setFilters",
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
    return res;
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
