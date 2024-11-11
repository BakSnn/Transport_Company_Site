# Укажите базовый образ
FROM node:18

# Установите рабочую директорию в контейнере
WORKDIR /app

# Скопируйте только package.json и package-lock.json для установки зависимостей
COPY server/package.json ./   # Копируем только package.json

# Установите зависимости
RUN npm install

# Скопируйте всю папку server в контейнер
COPY server ./server

# Установите nodemon глобально (если требуется)
RUN npm install -g nodemon

# Откройте порт, который используется приложением (замените 5001 на нужный вам порт)
EXPOSE 5001

# Команда для запуска приложения через nodemon
CMD ["npx", "nodemon", "server/script.ts"]
