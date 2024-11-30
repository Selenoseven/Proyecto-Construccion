# Escuela Politécnica Nacional
# Construcción y Evolución del Software

### Integrantes:
- Armijos Marlow
- Collaguazo Shirley
- Guachamin Daniela
- Galarza Cristofer
- falta UNO

# Manual de Instalación y Configuración

## Descripción General
Este manual detalla los pasos necesarios para instalar y configurar el sistema de registro y análisis de acciones. Este proyecto permite registrar transacciones y evaluar ganancias/pérdidas mediante datos actualizados desde la API de **Finnhub**.

---

# Requisitos del Sistema

Sistema Operativo: Windows 10 o superior, macOS o Linux.  
Node.js: Versión 16 o superior.  
MongoDB: Local o en la nube (MongoDB Atlas).  
Git: Control de versiones.  
Navegador Web: Última versión de Chrome, Edge o Firefox.  

# Instalación

## 1. Clonar el Repositorio
```
git clone https://github.com/usuario/proyectoConstruccion.git  
```
```
cd proyectoConstruccion 
```

## 2. Backend

Navega al directorio backend:  
```
cd backend  
```
Instala dependencias:  
```
npm install  
```
Configura las variables de entorno en un archivo `.env` (usa un ejemplo como guía si está disponible):  
```
MONGODB_URI=mongodb://localhost:27017/accionesDB  
FINNHUB_API_KEY=tu_clave_finnhub (La aplicacion te da una una vez registrado)  
PORT=5000  
```
Inicia el servidor:  
```
npm start  
```
## 3. Frontend

Navega al directorio bolsa-valores:  
```
cd ../bolsa-valores  
```
Instala dependencias:  
```
npm install  
```
Configura las variables de entorno en un archivo `.env`:  
```
REACT_APP_API_URL=http://localhost:5000  
```
Inicia la aplicación:  
```
npm start  

## 4. Verifica el Proyecto
```
Backend: Accede a las rutas de la API mediante Postman o un navegador.  
Frontend: La aplicación debería estar disponible en:
```
http://localhost:5000  
```