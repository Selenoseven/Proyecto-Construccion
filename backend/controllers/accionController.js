const Accion = require('../models/accionModel');
const axios = require('axios');

// Registrar una acción
const registrarAccion = async (req, res) => {
    const { nombre, numeroAcciones, valor, fecha } = req.body;

    if (!nombre || !numeroAcciones || !valor || !fecha) {
        return res.status(400).json({ error: 'Faltan campos requeridos' });
    }

    try {
        // Llamada a la API de Finnhub
        const respuesta = await axios.get('https://finnhub.io/api/v1/quote', {
            params: {
                symbol: nombre,
                token: process.env.FINNHUB_API_KEY,
            },
        });

        const { c: precioActual } = respuesta.data;

        // Calcular ganancia o pérdida
        const ganancia = (precioActual - valor) * numeroAcciones;

        // Crear y guardar la acción en MongoDB
        const nuevaAccion = new Accion({
            nombre,
            numeroAcciones,
            valor,
            fecha,
            precioActual,
            ganancia,
        });

        // Guardar la acción en la base de datos
        const accionGuardada = await nuevaAccion.save();

        res.status(201).json(accionGuardada);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error al registrar la acción' });
    }
};

// Obtener todas las acciones registradas
const obtenerAcciones = async (req, res) => {
    try {
        const acciones = await Accion.find();
        res.json(acciones);
    } catch (error) {
        res.status(500).json({ error: 'Error al obtener las acciones' });
    }
};


module.exports = { registrarAccion, obtenerAcciones };
