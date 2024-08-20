# Equipo Gondor
**Tarea de Mentoría - Sodep**

## Descripción
Este proyecto fue probado en Ubuntu 24.04 LTS, consiste en una aplicación web con un backend desarrollado en Node.js y MongoDB, y un frontend en React. A continuación, se detallan los pasos necesarios para desplegar el proyecto en tu entorno local.

## Requisitos
- MongoDB
- Node.js v18.19.0 o superior
- (Opcional) MongoDB Compass

## Estructura del Proyecto
- **server**: Contiene el backend de la aplicación.
- **client**: Contiene el frontend de la aplicación.

###  Instalar MongoDB en Ubuntu

```bash
sudo apt update
sudo apt install -y mongodb

# Inicia MongoDB.
sudo systemctl start mongod

# Verifica que MongoDB esté corriendo.
sudo systemctl status mongod

```

## Pasos para Desplegar el Proyecto

### 1. Configurar Variables de Entorno
En la carpeta `server`, renombra el archivo `.env.example` a `.env` y descomenta las líneas necesarias.

### 2. Instalar Dependencias
Ejecuta los siguientes comandos para instalar las dependencias tanto en el backend como en el frontend:

#### comandos
```bash
cd server
npm install

Frontend
cd client
npm install
 
para correr el servidor: 
nodemon app.js
# o
node app.js

para iniciar el Cliente
npm run dev

```

### Notas Adicionales
Asegurarse de tener MongoDB en funcionamiento antes de iniciar el servidor.
La creación del usuario es importante para gestionar los accesos y permisos en la base de datos.

