import { Hono } from "hono";
import { PrismaClient } from "@prisma/client/edge";
import { verify } from "hono/jwt";
import { createBlogInput } from "@sachin_kumawat/medium-common";

export const blogRoutes = new Hono<{
  Bindings: {
    DATABASE_URL_POOL: string;
    JWT_SECRET: string;
  };
  Variables: {
    userId: string;
    prisma: PrismaClient;
  };
}>();

blogRoutes.use("/*", async (c, next) => {
  const header = c.req.header("Authorization") || "";
  const token = header;
  const response = await verify(token, c.env.JWT_SECRET);
  if (response.id) {
    c.set("userId", String(response.id));
    await next();
  } else {
    c.status(403);
    return c.json({ error: "unauthorized" });
  }
});

blogRoutes.post("/", async (c) => {
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL_POOL,
  });

  const body = await c.req.json();

  const { success } = createBlogInput.safeParse(body);

  if (!success) {
    return c.json({
      message: "invalid inputs",
    });
  }

  const authorId = c.get("userId");

  try {
    const post = await prisma.post.create({
      data: {
        title: body.title,
        content: body.content,
        authorId: Number(authorId),
      },
    });

    return c.json({ message: "post created", post });
  } catch (error) {
    c.status(500);
    return c.json({ message: "failed to created" });
  }
});

blogRoutes.put("/", async (c) => {
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL_POOL,
  });
  const body = await c.req.json();

  try {
    const blog = await prisma.post.update({
      where: {
        id: body.id,
      },
      data: {
        title: body.title,
        content: body.title,
      },
    });

    return c.json({
      blog: blog.id,
    });
  } catch (error) {
    c.status(500);
    return c.json({
      message: " failed to update the post",
    });
  }
});

blogRoutes.get("/bulk", async (c) => {
  const prisma = new PrismaClient({
    datasources: {
      db: {
        url: c.env.DATABASE_URL_POOL,
      },
    },
  });

  try {
    const blogs = await prisma.post.findMany({
      select: {
        id: true,
        content: true,
        title: true,
        author: {
          select: {
            name: true,
          },
        },
      },
    });
    return c.json({ blogs });
  } catch (error) {
    console.error("Error fetching blogs:", error);
    c.status(500);
    return c.json({ message: "Failed to fetch blogs" });
  }
});

blogRoutes.get("/:id", async (c) => {
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL_POOL,
  });
  const id = parseInt(c.req.param("id"), 10);

  try {
    const blog = await prisma.post.findUnique({
      where: {
        id: id,
      },
      select: {
        id: true,
        content: true,
        title: true,
        author: {
          select: {
            name: true,
          },
        },
      },
    });

    return c.json({
      blog,
    });
  } catch (error) {
    return c.json({ error: "Failed to retrieve blog post" }, 500);
  }
});
