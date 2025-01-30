import express, { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";
import cors from "cors";

const app = express();
const prisma = new PrismaClient();
const port = process.env.PORT || 5001;

app.use(cors());
app.use(express.json());

// Получение всех мобильных телефонов с заказами
app.get("/api/phones", async (req: Request, res: Response) => {
  try {
    const phones = await prisma.phone.findMany({
      include: {
        orders: true, // Включаем заказы, связанные с телефоном
      },
    });
    res.json(phones); // Возвращаем список всех телефонов с заказами
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// Получение информации о мобильном телефоне по ID
app.get("/api/phones/:id", async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    const phone = await prisma.phone.findUnique({
      where: { id: Number(id) },
      include: {
        orders: true, // Включаем заказы для данного телефона
      },
    });

    if (phone) {
      res.json(phone); // Возвращаем информацию о конкретном телефоне
    } else {
      res.status(404).json({ error: "Phone not found" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// Оформление нового заказа для мобильного телефона
app.post("/api/phones/:phoneId/orders", async (req: Request, res: Response) => {
  const { phoneId } = req.params;
  const { customerName, quantity, shippingAddress } = req.body;

  try {
    // Создаем новый заказ для телефона
    const newOrder = await prisma.order.create({
      data: {
        customerName,
        quantity,
        shippingAddress,
        phoneId: Number(phoneId),
      },
    });
    res.status(201).json(newOrder); // Возвращаем созданный заказ
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// Удаление мобильного телефона и связанных с ним заказов
app.delete("/api/phones/:id", async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    // Сначала удаляем все заказы, связанные с телефоном
    await prisma.order.deleteMany({
      where: { phoneId: Number(id) },
    });

    // Затем удаляем сам телефон
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
