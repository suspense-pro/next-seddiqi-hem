import { MiddlewareFactory } from "@utils/middlewares/types";
import { stackMiddleWares } from "@utils/middlewares/stackMiddleWares";
import {
  NextFetchEvent,
  NextMiddleware,
  NextRequest,
  NextResponse,
} from "next/server";

const test: MiddlewareFactory = (
  next: NextMiddleware
) => {
  return async (req: NextRequest, _next: NextFetchEvent) => {

    const res = NextResponse.next();

    return res;
  };
};

const middlewares = [test];
export default stackMiddleWares(middlewares);


export const config = {
  matcher: ["/api/:path*"],
};
