import { OpenAPIHono } from "@hono/zod-openapi";
import { Scalar } from "@scalar/hono-api-reference";

import bookApp from "@/routes/book/route";

const basePath = "/api/services";

const app = new OpenAPIHono().basePath(basePath);

app.route("/book", bookApp);

app.doc31("/docs", {
  openapi: "3.1.0",
  info: {
    title: "Services API",
    version: "1.0.0",
  },
});

app.get(
  "/scalar",
  Scalar({
    url: `${basePath}/docs`,
    title: "Services API",
  }),
);

export const GET = (req: Request) => app.fetch(req);
export const POST = (req: Request) => app.fetch(req);
export const PUT = (req: Request) => app.fetch(req);
export const DELETE = (req: Request) => app.fetch(req);
export const PATCH = (req: Request) => app.fetch(req);
