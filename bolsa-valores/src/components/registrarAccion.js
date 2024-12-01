// RegistrarAccion.js
import React, { useState } from 'react';
import { registrarAccion } from '../api';

const RegistrarAccion = ({ onAccionRegistrada }) => {
  const [nombre, setNombre] = useState('');
  const [numeroAcciones, setNumeroAcciones] = useState('');
  const [valor, setValor] = useState('');
  const [fecha, setFecha] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    const accionData = { nombre, numeroAcciones: parseInt(numeroAcciones), valor: parseFloat(valor), fecha };
    
    try {
      const accionRegistrada = await registrarAccion(accionData);
      onAccionRegistrada(accionRegistrada); // Llamar la función para actualizar la lista de acciones
      setNombre('');
      setNumeroAcciones('');
      setValor('');
      setFecha('');
    } catch (error) {
      alert('Error al registrar la acción');
    }
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md mb-4">
      <h2 className="text-xl font-bold mb-4">Registrar Acción</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">Símbolo:</label>
          <input type="text" value={nombre} onChange={(e) => setNombre(e.target.value)} required className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2" />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">Número de Acciones:</label>
          <input type="number" value={numeroAcciones} onChange={(e) => setNumeroAcciones(e.target.value)} required className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2" />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">Valor Inicial:</label>
          <input type="number" value={valor} onChange={(e) => setValor(e.target.value)} required className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2" step="0.01" />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">Fecha:</label>
          <input type="date" value={fecha} onChange={(e) => setFecha(e.target.value)} required className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2" />
        </div>
        <button type="submit" className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700">
          Registrar
        </button>
      </form>
    </div>
  );
};

export default RegistrarAccion;