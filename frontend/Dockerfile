# Используем официальный Node.js образ
FROM node:20

# Задаём рабочую директорию внутри контейнера
WORKDIR /app

# Копируем package.json и package-lock.json (если есть)
COPY package*.json ./

# Устанавливаем зависимости
RUN npm install

# Копируем всё остальное
COPY . .

# Указываем порт, который слушает Vite (по умолчанию 5173)
EXPOSE 5173

# Запускаем сервер разработки Vite
CMD ["npm", "run", "dev", "--", "--host"]
