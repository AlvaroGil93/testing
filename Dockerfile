# Imagen base de Node.js
FROM node:18-alpine

# Establecer el directorio de trabajo en el contenedor
WORKDIR /app

# Copiar package.json y package-lock.json para instalar dependencias
COPY package*.json ./

# Instalar dependencias
RUN npm install

# Copiar el resto de la aplicación
COPY . .

# Exponer el puerto en el que corre la aplicación
EXPOSE 9000

# Comando para ejecutar la aplicación
CMD ["node", "src/bin/www"]
