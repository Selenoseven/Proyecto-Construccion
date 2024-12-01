const express = require('express');
const router = express.Router();
const { registrarAccion, obtenerAcciones } = require('../controllers/accionController');

// Definir las rutas
router.post('/accion', registrarAccion);  // Ruta para registrar una acción
router.get('/acciones', obtenerAcciones); // Ruta para obtener todas las acciones

module.exports = router; // Exportar el enrutador
