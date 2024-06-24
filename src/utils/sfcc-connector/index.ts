import { Product, Search, Customer } from "commerce-sdk";
import initializeShopperConfig, { clientConfig } from "./config";
import { NextRequest, NextResponse } from "next/server";
import logger from "@utils/logger";


export async function getProducts(searchQuery) {

  const configWithAuth = await initializeShopperConfig();

  const searchClient = new Search.ShopperSearch(configWithAuth);
  const searchResults = await searchClient.productSearch({
    parameters: { q: searchQuery },
  });

  const results = [];

  const productsClient = new Product.ShopperProducts(configWithAuth);

  await Promise.all(
    searchResults.hits.map(async (product) => {
      const productResults = await productsClient.getProduct({
        parameters: {
          organizationId: clientConfig.parameters.organizationId,
          siteId: clientConfig.parameters.siteId,
          id: product.productId,
        },
      });

      /* Transform Product Results Here before pusing in the Results Array */

      results.push(productResults);
    }),
  );

  return results;
}

export async function registerCustomer({ 
  userData, 
  method
}: { 
    userData: any
    method: string
}) {
  try {
    const json = {
      api: "register",
      action:"registerCustomer"
    };
    const config = {
      method: method,
      body: JSON.stringify(userData),
    };
    const queryString = new URLSearchParams(json).toString();
    const res = await serverApiCallSfcc(queryString, config, "register");
    return res;
  } catch (err) {
    logger.error("API threw Error", err);
    throw err;
  }
};

export const getCustomer = async () => {
  try {
    const json = {
      api: "customer",
    };
    const config = {
      method: "GET",
    };
    const queryString = ""; // new URLSearchParams(json).toString();
    const res = await serverApiCallSfcc(queryString, config, "customer");
    return res;
  } catch (err) {
    logger.error("API threw Error", err);
    throw err;
  }
};

/** This function is to call the handler in pages > api; This is also used in the Client Side Call*/
export async function getTestApiCall({ orderId, method }: { orderId: string; method: string }) {
  try {
    const json = {
      api: "order",
      orderId: orderId,
      action: "getOrder",
    };

    const config = {
      method: method,
    };
    const queryString = new URLSearchParams(json).toString();
    const res = await serverApiCallSfcc(queryString, config, "login");
    
    return res.response;
  } catch (err) {
    logger.error("API threw Error", err);
    throw err;
  }
}

/** This is the fetch call to the pages > api */
const serverApiCallSfcc = async (query: string, config: any, type: string) => await (await fetch(`/api/sfcc/${type}`, config)).json();

// This is called from `app/api/revalidate.ts` so providers can control revalidation logic.
// eslint-disable-next-line no-unused-vars
export async function revalidate(req: NextRequest): Promise<NextResponse> {
  return NextResponse.json({ status: 200, revalidated: true, now: Date.now() });
}