# Укажите базовый образ
FROM node:18

# Установите рабочую директорию
WORKDIR /app

# Скопируйте package.json и package-lock.json для установки зависимостей
COPY Cursovaya_App/server/package*.json ./

# Установите зависимости
RUN npm install

# Скопируйте весь проект в контейнер
COPY Cursovaya_App/server .

# Установите nodemon глобально (если требуется)
RUN npm install -g nodemon

# Откройте порт, который используется приложением (замените 5001 на нужный вам порт)
EXPOSE 5001

# Команда для запуска приложения
CMD ["npx", "nodemon", "script.ts"]
