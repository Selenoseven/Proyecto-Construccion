const Accion = require('../models/accionModel');
const axios = require('axios');

// Registrar una acción
const registrarAccion = async (req, res) => {
    const { nombre, numeroAcciones, valor, fecha } = req.body;

    if (!nombre || !numeroAcciones || !valor || !fecha) {
        return res.status(400).json({ error: 'Faltan campos requeridos' });
    }

    try {
        // Crear y guardar la acción en MongoDB sin incluir el precio actual ni la ganancia
        const nuevaAccion = new Accion({
            nombre,
            numeroAcciones,
            valor,
            fecha,
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
        const accionesConPrecioActual = await Promise.all(
            acciones.map(async (accion) => {
                // Llamada a la API de Finnhub para obtener el precio actual
                const respuesta = await axios.get('https://finnhub.io/api/v1/quote', {
                    params: {
                        symbol: accion.nombre,
                        token: process.env.FINNHUB_API_KEY,
                    },
                });

                const { c: precioActual } = respuesta.data;

                // Recalcular la ganancia basada en el precio actual
                const ganancia = (precioActual - accion.valor) * accion.numeroAcciones;
                const porcentaje = ganancia !== 0 ? (precioActual / ganancia) * 100 : 0;
                return {
                    ...accion.toObject(),
                    precioActual,
                    ganancia,
                    porcentaje,
                };
            })
        );

        res.json(accionesConPrecioActual);
    } catch (error) {
        res.status(500).json({ error: 'Error al obtener las acciones' });
    }
};



module.exports = { registrarAccion, obtenerAcciones };
