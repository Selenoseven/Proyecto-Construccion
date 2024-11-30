# **Documentación del Proyecto**

## **Arquitectura Vista-Controlador**

La arquitectura Vista-Controlador (MVC) se utilizó para estructurar este proyecto, dividiendo claramente las responsabilidades entre el frontend (Vista), el backend (Controlador) y la base de datos. Esto permite un desarrollo más organizado, escalable y fácil de mantener.

---

### **Frontend (Vista)**
- **Implementación**:
  - Construido utilizando **React**, un framework de JavaScript que permite la creación de interfaces de usuario dinámicas y eficientes.
  - Emplea un enfoque basado en componentes reutilizables, lo que facilita la lectura, el mantenimiento y la expansión del código.

- **Responsabilidades**:
  - **Presentación de Datos**: Muestra la información obtenida del backend, como los detalles de las acciones registradas y su ganancia/pérdida.
  - **Interacción con el Usuario**: Permite al usuario realizar operaciones como:
    - Registrar una nueva acción ingresando datos como el símbolo, cantidad, valor inicial y fecha.
    - Visualizar una tabla resumen de las acciones registradas y el estado actual (ganancia/pérdida).
  - **Conexión con el Backend**:
    - A través de llamadas HTTP utilizando librerías como **Axios** o la API Fetch nativa de JavaScript.
    - Envío de solicitudes POST para registrar nuevas acciones.
    - Obtención de datos mediante solicitudes GET.

- **Estructura del Código**:
  - Componentes principales incluyen:
    - **Formulario de Registro**: Captura los datos ingresados por el usuario.
    - **Dashboard**: Muestra la lista de acciones y sus detalles en una tabla.
  - Integración con el backend mediante un archivo `api.js` centralizado para gestionar las llamadas a la API.

---

### **Backend (Controlador)**
- **Implementación**:
  - Construido utilizando **Node.js** como entorno de ejecución y **Express** como framework para manejar las rutas y la lógica del servidor.
  - Proporciona una API RESTful para comunicar el frontend con la base de datos.

- **Responsabilidades**:
  - **Lógica de Negocio**:
    - Validar los datos recibidos del frontend (por ejemplo, asegurarse de que el valor inicial o el número de acciones no sean negativos).
    - Calcular la ganancia o pérdida de cada acción utilizando los datos actuales obtenidos de la API de **Finnhub**.
  - **Manejo de Rutas**:
    - Rutas POST para registrar una nueva acción.
    - Rutas GET para obtener la lista de acciones registradas junto con su estado actual.
  - **Conexión con MongoDB**:
    - Utiliza el paquete **Mongoose** para definir esquemas de datos y realizar operaciones CRUD (crear, leer, actualizar, eliminar).

- **Estructura del Código**:
  - **Controladores** (`accionController.js`): Manejan la lógica para cada ruta, incluyendo las operaciones con la base de datos y los cálculos necesarios.
  - **Modelos** (`accionModel.js`): Define la estructura de los documentos en MongoDB, incluyendo campos como:
    - `simbolo` (String): Identificador de la acción (por ejemplo, "AAPL").
    - `cantidad` (Number): Número de acciones compradas.
    - `valorInicial` (Number): Precio total de la compra.
    - `fechaCompra` (Date): Fecha en que se adquirió la acción.

---

### **Base de Datos**
- **Implementación**:
  - La base de datos utilizada es **MongoDB**
  - Se accede a través de la librería **Mongoose**, que facilita la definición de esquemas y operaciones.

- **Responsabilidades**:
  - **Almacenamiento de Datos**:
    - Registra cada acción con todos los detalles ingresados por el usuario (símbolo, cantidad, valor inicial, fecha).
  - **Persistencia**:
    - Asegura que los datos ingresados por el usuario estén disponibles incluso después de que el servidor se detenga o reinicie.
  - **Eficiencia**:
    - Diseñada para manejar grandes cantidades de datos de manera eficiente, lo que permite almacenar un historial detallado de acciones registradas.

- **Estructura**:
  - La colección principal en MongoDB se llama `acciones` y tiene la siguiente estructura de documento:
    ```json
    {
      "_id": "64839a7e29342",
      "simbolo": "AAPL",
      "cantidad": 10,
      "valorInicial": 500,
      "fechaCompra": "2023-10-01T00:00:00.000Z"
    }
    ```
  - Los cálculos de ganancia/pérdida se realizan en el backend, utilizando datos actualizados desde la API de Finnhub.

---

### **Interacción entre las Capas**
1. **El usuario ingresa datos en el formulario del frontend**.
2. **El frontend envía los datos al backend** mediante una solicitud HTTP POST.
3. **El backend valida y almacena los datos en la base de datos**.
4. **Cuando el usuario consulta sus acciones**:
   - El backend obtiene los precios actuales desde Finnhub.
   - Calcula la ganancia/pérdida para cada acción.
   - Envía los datos al frontend.
5. **El frontend muestra los datos procesados** en un formato claro y amigable.

---

Esta arquitectura permite mantener una separación clara de responsabilidades, lo que facilita la colaboración entre los desarrolladores y mejora la escalabilidad y mantenibilidad del sistema.

