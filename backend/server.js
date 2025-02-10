const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors');

// Cargar variables de entorno
dotenv.config();

const app = express();
app.use(express.json()); // middleware para manejar JSON
app.use(cors()); // middleware para permitir CORS

// Conectar a MongoDB
mongoose
  .connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('Conectado a MongoDB'))
  .catch((error) => console.error('Error al conectar a MongoDB:', error));

// Importar las rutas correctamente (debemos importar el router)
const accionRoutes = require('./routes/accionRoutes');

// Asegurarse de usar el router correctamente
app.use('/api', accionRoutes);  // Este es el enrutador que contiene las rutas definidas

// Iniciar el servidor
const port = 5000;
app.listen(port, () => {
  console.log(`Servidor corriendo en http://localhost:${port}`);
});
