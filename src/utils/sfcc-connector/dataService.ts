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
    };
    const config = {
      method: method,
      body: userData,
    };
    const queryString = new URLSearchParams(json).toString();
    const res = await serverApiCallSfcc(`?${queryString}`, config, "passwordlessLogin");
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
    };
    const config = {
      method: method,
      body: userData,
    };
    const queryString = new URLSearchParams(json).toString();
    const res = await serverApiCallSfcc(`?${queryString}`, config, "passwordlessAccessToken");
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
    };
    const config = {
      method: method,
      body: userData,
    };
    const queryString = new URLSearchParams(json).toString();
    const res = await serverApiCallSfcc(`?${queryString}`, config, "logout");
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
