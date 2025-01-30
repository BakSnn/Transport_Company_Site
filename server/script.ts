import express, { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";
import cors from "cors";

const app = express();
const prisma = new PrismaClient();
const port = process.env.PORT || 5001;

app.use(cors());
app.use(express.json());

// Получение всех мобильных телефонов
app.get("/api/phones", async (req: Request, res: Response) => {
  try {
    const phones = await prisma.phone.findMany({
      include: {
        orders: true,
      },
    });
    res.json(phones);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// Добавление нового мобильного телефона с заказами
app.post("/api/phones", async (req: Request, res: Response) => {
  const { name, brand, price, orders } = req.body;

  try {
    const newPhone = await prisma.phone.create({
      data: {
        name,
        brand,
        price,
        orders: {
          create: orders, // Создание новых заказов для мобильного телефона
        },
      },
    });
    res.status(201).json(newPhone);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// Добавление нового заказа для мобильного телефона
app.post("/api/phones/:phoneId/orders", async (req: Request, res: Response) => {
  const { phoneId } = req.params;
  const { customerName, quantity, shippingAddress } = req.body;

  try {
    const newOrder = await prisma.order.create({
      data: {
        customerName,
        quantity,
        shippingAddress,
        phoneId: Number(phoneId),
      },
    });
    res.status(201).json(newOrder);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// Удаление мобильного телефона
app.delete("/api/phones/:id", async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    await prisma.order.deleteMany({
      where: { phoneId: Number(id) },
    });

    const deletedPhone = await prisma.phone.delete({
      where: { id: Number(id) },
    });

    res.json(deletedPhone);
  } catch (error) {
    console.error("Ошибка при удалении телефона:", error);
    res.status(500).json({ error: "Ошибка при удалении телефона" });
  }
});

// Запуск сервера
app.listen(port, () => {
  console.log(`Server is running on http://150.241.65.37:${port}`);
});
