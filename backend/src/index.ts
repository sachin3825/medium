import { Hono } from "hono";
import { PrismaClient } from "@prisma/client/edge";
import { userRouter } from "./routes/user";
import { blogRoutes } from "./routes/blog";
import { cors } from "hono/cors";
type Bindings = {
  DATABASE_URL: string;
  JWT_SECRET: string;
};

type Variables = {
  userId: string;
  prisma: PrismaClient;
};

const app = new Hono<{ Bindings: Bindings; Variables: Variables }>().basePath(
  "/api/v1"
);

app.use("/*", cors());
app.route("/user", userRouter);
app.route("/blog", blogRoutes);

export default app;
