# Укажите базовый образ
FROM node:18

# Установите рабочую директорию в контейнере
WORKDIR /app

# Скопируйте только package.json и package-lock.json для установки зависимостей
COPY server/package.json ./ 
COPY server/package-lock.json ./   
COPY .env .env
# Скопируйте папку prisma (где хранится schema.prisma)
COPY server/prisma ./prisma

# Генерируйте Prisma Client
RUN npx prisma generate
# Установите зависимости
RUN npm install

# Скопируйте всю папку server в контейнер
COPY server ./server

# Установите nodemon глобально (если требуется)
RUN npm install -g nodemon

# Откройте порт, который используется приложением
EXPOSE 5001

# Команда для запуска приложения через nodemon
CMD ["npx", "nodemon", "server/script.ts"]
