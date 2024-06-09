import { Hono } from "hono";
import { hashPassword, comparePasswords } from "../utils/passwordMethods";
import { sign } from "hono/jwt";
import { PrismaClient } from "@prisma/client/edge";
import { signupInput, signinInput } from "@sachin_kumawat/medium-common";

type Bindings = {
  DATABASE_URL_POOL: string;
  JWT_SECRET: string;
};

type Variables = {
  userId: string;
};

export const userRouter = new Hono<{
  Bindings: Bindings;
  Variables: Variables;
}>();

userRouter.post("/signup", async (c) => {
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL_POOL,
  });

  const body = await c.req.json();

  const { success } = signupInput.safeParse(body);

  if (!success) {
    return c.json({
      message: "Inputs are not correct",
    });
  }

  try {
    const existingUser = await prisma.user.findUnique({
      where: {
        email: body.email,
      },
    });

    if (existingUser) {
      return c.json({ error: "User already exists" }, 400);
    }

    const hashedPassword = await hashPassword(body.password);

    const user = await prisma.user.create({
      data: {
        email: body.email,
        password: hashedPassword,
        name: body?.name,
      },
    });

    const jwtPayload = { id: user.id, email: user.email };
    const jwt = await sign(jwtPayload, c.env.JWT_SECRET);

    return c.json({ jwt }, 200);
  } catch (error) {
    console.error("Error during signup:", error);
    return c.json({ error: "Error while signing up" }, 500);
  }
});

userRouter.post("/signin", async (c) => {
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL_POOL,
  });

  const body = await c.req.json();

  const { success } = await signinInput.safeParse(body);

  if (!success) {
    return c.json({
      message: "Inputs are not correct",
    });
  }

  try {
    const user = await prisma.user.findUnique({
      where: {
        email: body.email,
      },
    });

    if (!user) {
      return c.json({ message: "User doesn't exist" }, 400);
    }

    const isPasswordValid = await comparePasswords(
      body.password,
      user.password
    );
    if (!isPasswordValid) {
      return c.json({ message: "Invalid password" }, 400);
    }

    const jwtPayload = { id: user.id, email: user.email };
    const jwt = await sign(jwtPayload, c.env.JWT_SECRET);

    return c.json({ jwt });
  } catch (error) {
    console.error("Error during signin:", error);
    return c.json({ message: "Failed to signin" }, 500);
  }
});
