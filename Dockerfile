# Сборка клиентской части
FROM node:18 AS client-build
WORKDIR /app/client
COPY client/package*.json ./
RUN npm install
COPY client .
RUN npm run build

# Сборка серверной части
FROM node:18 AS server-build
WORKDIR /app/server
COPY server/package*.json ./
RUN npm install
COPY server .
COPY --from=client-build /app/client/dist ./client-dist

# Копируем Prisma файлы и создаем миграции
COPY prisma ./prisma
RUN npx prisma generate

# Устанавливаем рабочую директорию и порты
EXPOSE 3000

# Запускаем сервер
CMD ["npx", "nodemon"]
