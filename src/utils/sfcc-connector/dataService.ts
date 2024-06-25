import { NextRequest, NextResponse } from "next/server";
import logger from "@utils/logger";

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
    };
    const config = {
      method: method,
      body: userData,
    };
    const queryString = new URLSearchParams(json).toString();
    const res = await serverApiCallSfcc(`?${queryString}`, config, "register");
    return res;
  } catch (err) {
    logger.error("API threw Error", err);
    throw err;
  }
}

export async function registerCustomer2() {
  try {
    const json = {
      api: "register",
    };
    const config = {
      method: "POST",
      // body: JSON.stringify(userData),
    };
    const queryString = new URLSearchParams(json).toString();
    const res = await serverApiCallSfcc(`?${queryString}`, config, "register");
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

/** This is the fetch call to the pages > api */
const serverApiCallSfcc = async (query: string, config: any, type: string) =>
  await (await fetch(`/api/sfcc/${type}${query}`, config)).json();

// This is called from `app/api/revalidate.ts` so providers can control revalidation logic.
// eslint-disable-next-line no-unused-vars
export async function revalidate(req: NextRequest): Promise<NextResponse> {
  return NextResponse.json({ status: 200, revalidated: true, now: Date.now() });
}
