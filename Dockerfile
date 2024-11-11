# Скопируйте только package.json и package-lock.json для установки зависимостей
COPY server/package*.json ./

# Установите зависимости
RUN npm install

# Скопируйте папку prisma (где хранится schema.prisma)
COPY server/prisma ./prisma

# Генерируйте Prisma Client
RUN npx prisma generate

# Скопируйте всю папку server в контейнер
COPY server .

# Установите nodemon глобально
RUN npm install -g nodemon

# Откройте порт
EXPOSE 5001

# Запуск приложения с использованием nodemon
CMD ["npx", "nodemon", "server/script.ts"]
