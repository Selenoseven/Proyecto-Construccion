import React, { useState } from 'react';
import { PlusCircle } from 'lucide-react';
import RegistrarAccion from './registrarAccion';
import AccionesRegistradas from './accionesRegistradas';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { obtenerHistoricoAccion } from '../api';

const Dashboard = () => {
  const [accionesActualizadas, setAccionesActualizadas] = useState(false);
  const [accionSeleccionada, setAccionSeleccionada] = useState(null);
  const [historico, setHistorico] = useState([]);

  const actualizarAcciones = () => {
    setAccionesActualizadas(!accionesActualizadas); // Para forzar la actualización de las acciones registradas
  };

  const handleSeleccionarAccion = async (accion) => {
    setAccionSeleccionada(accion);
    try {
      const historicoData = await obtenerHistoricoAccion(accion.nombre);
      setHistorico(historicoData);
    } catch (error) {
      console.error('Error al obtener el historial de la acción:', error.message);
    }
  };

  return (
    <div className="bg-gray-100 min-h-screen p-8">
      <div className="max-w-4xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-gray-800">Dashboard de Acciones</h1>
          <button
            onClick={actualizarAcciones}
            className="flex items-center bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700"
          >
            <PlusCircle className="mr-2" /> Actualizar Acciones
          </button>
        </div>
        <RegistrarAccion onAccionRegistrada={actualizarAcciones} />
        <AccionesRegistradas accionesActualizadas={accionesActualizadas} onSeleccionarAccion={handleSeleccionarAccion} />
        {accionSeleccionada && (
          <div className="mt-8 bg-white shadow-md rounded-lg p-6">
            <h2 className="text-2xl font-bold mb-4">{accionSeleccionada.nombre} ({accionSeleccionada.nombre}) - Historial</h2>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={historico}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="fecha" />
                <YAxis />
                <Tooltip />
                <Line type="monotone" dataKey="precio" stroke="#8884d8" strokeWidth={2} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
