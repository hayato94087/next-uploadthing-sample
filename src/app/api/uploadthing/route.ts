/** app/api/uploadthing/route.ts */
import { ourFileRouter } from "./core";
import { createNextRouteHandler } from "uploadthing/next";

// routerをエクスポートします。
export const { GET, POST } = createNextRouteHandler({
  router: ourFileRouter,
});
