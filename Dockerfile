# Укажите базовый образ
FROM node:18

# Установите рабочую директорию в контейнере
WORKDIR /app

# Скопируйте только package.json и package-lock.json для установки зависимостей
COPY server/package.json ./ 
COPY server/package-lock.json ./   
COPY server/.env .env

RUN npm install
RUN npm install prisma@latest --silent

# Скопируйте папку prisma (где хранится schema.prisma)
COPY server/prisma ./prisma
# Установите зависимости

# Генерируйте Prisma Client
RUN npx prisma generate


# Скопируйте всю папку server в контейнер
COPY server ./server

# Откройте порт, который используется приложением
EXPOSE 5001

# Команда для запуска приложения через nodemon
CMD ["npx", "ts-node", "server/script.ts"]
