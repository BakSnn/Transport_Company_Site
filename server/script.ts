import express, { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";
import cors from "cors";

const app = express();
const prisma = new PrismaClient();
const port = process.env.PORT || 5001;

app.use(cors());
app.use(express.json()); // Для обработки JSON-данных

// Получение всех пользователей
app.get("/api/product", async (req: Request, res: Response) => {
  try {
    const users = await prisma.user.findMany({
      include: {
        posts: true, // Включение связанных постов
      },
    });
    res.json(users);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// Добавление нового пользователя с постами
app.post("/api/product", async (req: Request, res: Response) => {
  const { email, name, posts } = req.body;

  try {
    const newUser = await prisma.user.create({
      data: {
        email,
        name,
        posts: {
          create: posts, // Создание новых постов для пользователя
        },
      },
    });
    res.status(201).json(newUser);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// Добавление нового поста для пользователя
app.post("/api/product/:userId/title", async (req: Request, res: Response) => {
  const { userId } = req.params;
  const { title, content, published } = req.body;

  try {
    const newPost = await prisma.post.create({
      data: {
        title,
        content,
        published,
        authorId: Number(userId),
      },
    });
    res.status(201).json(newPost);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// удаление пользователя и его постов
app.delete("/api/product/:id", async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    await prisma.post.deleteMany({
      where: { authorId: Number(id) },
    });

    // удаление пользователя
    const deletedUser = await prisma.user.delete({
      where: { id: Number(id) },
    });

    res.json(deletedUser);
  } catch (error) {
    console.error("Ошибка при удалении пользователя:", error);
    res.status(500).json({ error: "Ошибка при удалении пользователя" });
  }
});

app.listen(port, () => {
  console.log(`Server is running on http://150.241.65.37:${port}`);
});
