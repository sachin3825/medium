import { Hono } from "hono";
import { PrismaClient } from "@prisma/client/edge";
import { withAccelerate } from "@prisma/extension-accelerate";
import { decode, sign, verify } from "hono/jwt";
import { userRouter } from "./routes/user";
import { blogRoutes } from "./routes/blog";
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

app.route("/user", userRouter);
app.route("/blog", blogRoutes);

export default app;
