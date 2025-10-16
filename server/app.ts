import "react-router";
import { createRequestHandler } from "@react-router/express";
import express from "express";

// declare module "react-router" {
//  interface AppLoadContext {
//    VALUE_FROM_EXPRESS: string;
//  }
// }

export const app = express();

app.use(
  createRequestHandler({
    build: () => import("virtual:react-router/server-build"),
    getLoadContext(request) {
      return {
        session: request.res.locals.session,
      };
    },
  }),
);
