FROM node:18

# Установка рабочего каталога
WORKDIR /app


COPY server/package.json server/package-lock.json ./
RUN npm install


COPY server .

RUN npx prisma generate


EXPOSE 5001

CMD ["npm", "run", "start"]
