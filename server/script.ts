import express, { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";
import cors from "cors";

const app = express();
const prisma = new PrismaClient();
const port = process.env.PORT || 5001;

app.use(cors());
app.use(express.json()); // Для обработки JSON-данных

app.get("/api/exit", async (req: Request, res: Response) => {
  try {
    const login = process.env.LOGIN;
    const password = process.env.PASSWORD;
    const usersData = {
      login: login,
      password: password,
    };

    res.json(usersData);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});
// Получение всех пользователей
app.get("/api/users", async (req: Request, res: Response) => {
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
app.post("/api/users", async (req: Request, res: Response) => {
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
app.post("/api/users/:userId/posts", async (req: Request, res: Response) => {
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

// удаление пользователя
// Удаление пользователя и его постов
app.delete("/api/users/:id", async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    // Удаляем все посты пользователя
    await prisma.post.deleteMany({
      where: { authorId: Number(id) },
    });

    // Удаляем самого пользователя
    const deletedUser = await prisma.user.delete({
      where: { id: Number(id) },
    });

    res.json(deletedUser);
  } catch (error) {
    console.error("Ошибка при удалении пользователя:", error);
    res.status(500).json({ error: "Ошибка при удалении пользователя" });
  }
});

// Запуск сервера
app.listen(port, () => {
  console.log(`Server is running on http://150.241.65.37:${port}`);
});
