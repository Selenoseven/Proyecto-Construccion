import React, { useState } from 'react';
import { registrarAccion } from '../api';
import { Save, AlertTriangle } from 'lucide-react';
import styles from '../Styles/RegistrarAccion.module.css';

const RegistrarAccion = ({ onAccionRegistrada }) => {
  const [nombre, setNombre] = useState('');
  const [numeroAcciones, setNumeroAcciones] = useState('');
  const [valor, setValor] = useState('');
  const [fecha, setFecha] = useState('');
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);

    if (numeroAcciones <= 0) {
      setError('El número de acciones debe ser mayor a 0');
      return;
    }

    if (valor <= 0) {
      setError('El valor inicial debe ser mayor a 0');
      return;
    }

    const accionData = {
      nombre,
      numeroAcciones: parseInt(numeroAcciones),
      valor: parseFloat(valor),
      fecha
    };

    try {
      const accionRegistrada = await registrarAccion(accionData);
      onAccionRegistrada(accionRegistrada);
      setNombre('');
      setNumeroAcciones('');
      setValor('');
      setFecha('');
    } catch (error) {
      setError('Error al registrar la acción');
      console.error(error);
    }
  };

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>Registrar Nueva Inversión</h2>

      {error && (
        <div className={styles.error}>
          <AlertTriangle className="mr-3 text-red-500" />
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label className={styles.label}>Símbolo de Acción</label>
          <input
            type="text"
            value={nombre}
            onChange={(e) => setNombre(e.target.value)}
            required
            placeholder="Ej. AAPL, GOOGL"
            className={styles.input}
          />
        </div>

        {/* Definimos grid directamente en el JSX */}
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className={styles.label}>Número de Acciones</label>
            <input
              type="number"
              value={numeroAcciones}
              onChange={(e) => setNumeroAcciones(e.target.value)}
              required
              min="1"
              placeholder="Cantidad"
              className={styles.input}
            />
          </div>

          <div>
            <label className={styles.label}>Valor Inicial</label>
            <input
              type="number"
              value={valor}
              onChange={(e) => setValor(e.target.value)}
              required
              step="0.01"
              min="0"
              placeholder="Precio"
              className={styles.input}
            />
          </div>
        </div>

   

        <div>
          <label className={styles.label}>Fecha de Compra</label>
          <input
            type="date"
            value={fecha}
            onChange={(e) => setFecha(e.target.value)}
            required
            className={styles.input}
          />
        </div>

        <button
          type="submit"
          className={styles.button}
        >
          <Save className="mr-2" /> Registrar Inversión
        </button>
      </form>
    </div>
  );
};

export default RegistrarAccion;
