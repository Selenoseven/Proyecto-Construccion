const mongoose = require('mongoose');

const AccionSchema = new mongoose.Schema({
    nombre: { type: String, required: true },
    numeroAcciones: { type: Number, required: true },
    valor: { type: Number, required: true },
    fecha: { type: Date, required: true },
    ganancia: { type: Number },
});


module.exports = mongoose.model('Accion', AccionSchema);
