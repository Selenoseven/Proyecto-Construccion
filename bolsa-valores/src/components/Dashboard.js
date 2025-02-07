import React, { useState, useEffect } from 'react';
import { RefreshCw } from 'lucide-react';
import RegistrarAccion from './registrarAccion';
import AccionesRegistradas from './accionesRegistradas';
import ConsolidationTable from './ConsolidationTable';
import ConsolidationTable2 from './ConsolidationTable2'; // Importar el nuevo componente
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import { obtenerHistoricoAccion, obtenerAcciones } from '../api';
import styles from '../Styles/Dashboard.module.css';
import generatePortfolioReport from './generatePortfolioReport'; // Importar correctamente la función

const Dashboard = () => {
  const [accionesActualizadas, setAccionesActualizadas] = useState(false);
  const [accionSeleccionada, setAccionSeleccionada] = useState(null);
  const [historico, setHistorico] = useState([]);
  const [cargando, setCargando] = useState(false);
  const [acciones, setAcciones] = useState([]);
  const [preciosActuales, setPreciosActuales] = useState({}); // Precios actuales para ConsolidationTable2

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

  const actualizarAcciones = () => {
    setAccionesActualizadas(!accionesActualizadas);
  };

  const handleSeleccionarAccion = async (accion) => {
    try {
      setCargando(true);
      setAccionSeleccionada(accion);
      const historicoData = await obtenerHistoricoAccion(accion.nombre);
      setHistorico(historicoData);
    } catch (error) {
      console.error('Error al obtener el historial de la acción:', error.message);
    } finally {
      setCargando(false);
    }
  };

  const handleExportPDF = () => {
    // Generar datos para ambas tablas
    const transacciones = acciones.map((accion) => ({
      fechaCompra: 'Fecha simulada', // Ajusta según tu estructura de datos
      nombre: accion.nombre,
      precioCompra: accion.valor,
      cantidadComprada: accion.numeroAcciones,
      usdCompra: (accion.valor || 0) * (accion.numeroAcciones || 0),
    }));

    generatePortfolioReport(acciones, transacciones);
  };

  const renderHeader = () => (
    <div className="flex flex-col md:flex-row justify-between items-center mb-8 space-y-4 md:space-y-0">
      <h1 className={styles.title}>Panel de Inversiones</h1>
      <div className="flex space-x-4">
        <button onClick={actualizarAcciones} className={styles.button}>
          <RefreshCw className="mr-2" size={18} /> Actualizar Cartera
        </button>
        <button onClick={handleExportPDF} className={`${styles.button} bg-green-500 hover:bg-green-600`}>
          Exportar PDF
        </button>
      </div>
    </div>
  );

  const renderHistorial = () => (
    <div className={styles.card}>
      <div className="flex justify-between items-center mb-6">
        <h2 className={styles.cardTitle}>
          Historial de {accionSeleccionada.nombre}
        </h2>
        {cargando && <div className={styles.loading}>Cargando...</div>}
      </div>
      <ResponsiveContainer width="100%" height={350}>
        <LineChart data={historico}>
          <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
          <XAxis dataKey="fecha" axisLine={{ stroke: '#e0e0e0' }} tickLine={{ stroke: '#e0e0e0' }} />
          <YAxis axisLine={{ stroke: '#e0e0e0' }} tickLine={{ stroke: '#e0e0e0' }} />
          <Tooltip contentStyle={{ backgroundColor: '#f9fafb', border: '1px solid #e5e7eb' }} labelStyle={{ fontWeight: 'bold', color: '#111827' }} />
          <Legend />
          <Line type="monotone" dataKey="precio" stroke="#3b82f6" strokeWidth={3} activeDot={{ r: 8 }} />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );

  return (
    <div className={styles.container}>
      <div className={styles.content}>
        {renderHeader()}
        <div className="grid grid-cols-2 gap-8">
          <div className="col-span-2 lg:col-span-1">
            <RegistrarAccion onAccionRegistrada={actualizarAcciones} />
          </div>
          <div className="col-span-2 lg:col-span-1">
            <AccionesRegistradas 
              acciones={acciones}
              accionesActualizadas={accionesActualizadas} 
              onSeleccionarAccion={handleSeleccionarAccion} 
            />
          </div>
        </div>
        {acciones.length > 0 && <ConsolidationTable acciones={acciones} />}
        {acciones.length > 0 && (
          <div className="mt-8">
            <ConsolidationTable2 acciones={acciones} preciosActuales={preciosActuales} />
          </div>
        )}
        {accionSeleccionada && renderHistorial()}
      </div>
    </div>
  );
};

export default Dashboard;
