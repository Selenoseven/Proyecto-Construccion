import React, { useEffect, useState } from 'react';
import { obtenerAcciones } from '../api';

const AccionesRegistradas = ({ accionesActualizadas, onSeleccionarAccion }) => {
  const [acciones, setAcciones] = useState([]);

  useEffect(() => {
    const fetchAcciones = async () => {
      try {
        const data = await obtenerAcciones();
        setAcciones(data);
      } catch (error) {
        console.error('Error al obtener las acciones:', error.message);
      }
    };

    fetchAcciones();
  }, [accionesActualizadas]);

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-xl font-bold mb-4">Acciones Registradas</h2>
      <table className="min-w-full table-auto">
        <thead className="bg-gray-200">
          <tr>
            <th className="px-4 py-2 text-left">Nombre</th>
            <th className="px-4 py-2 text-right">Número de Acciones</th>
            <th className="px-4 py-2 text-right">Valor Inicial</th>
            <th className="px-4 py-2 text-right">Precio Actual</th>
            <th className="px-4 py-2 text-right">Ganancia/Pérdida</th>
          </tr>
        </thead>
        <tbody>
          {acciones.map((accion) => (
            <tr key={accion._id} className="border-b hover:bg-gray-50 cursor-pointer" onClick={() => onSeleccionarAccion(accion)}>
              <td className="px-4 py-2 font-bold">{accion.nombre}</td>
              <td className="px-4 py-2 text-right">{accion.numeroAcciones}</td>
              <td className="px-4 py-2 text-right">${accion.valor.toFixed(2)}</td>
              <td className="px-4 py-2 text-right">${accion.precioActual.toFixed(2)}</td>
              <td className={`px-4 py-2 text-right ${accion.ganancia >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                ${accion.ganancia.toFixed(2)}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AccionesRegistradas;