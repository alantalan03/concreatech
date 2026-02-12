# Etapa 1: Construcción de Angular
FROM node:18 AS build-stage
WORKDIR /app

# Copiar archivos y dependencias
COPY package*.json ./
RUN npm install --legacy-peer-deps

# Copiar el resto del código
COPY . .

# Compilar la aplicación Angular
RUN npm run build:dev

# Etapa 2: Servir con Apache
FROM php:apache

# Habilitar mod_rewrite en Apache
RUN a2enmod rewrite

# Copiar el build de Angular desde la etapa anterior a la carpeta de Apache (por defecto /var/www/html/)
COPY --from=build-stage /app/dist/DASHBOARD/browser/ /var/www/html/

# Copiar archivo .htaccess con reglas para Angular
COPY .docker/apache/.htaccess /var/www/html/.htaccess

# Ajustar permisos
RUN chown -R www-data:www-data /var/www/html/*

# Asegurar que Apache sirva el index.html correctamente
RUN echo "DirectoryIndex index.html" >> /etc/apache2/apache2.conf