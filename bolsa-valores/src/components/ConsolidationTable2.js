import React, { useState, useEffect } from "react";
import { obtenerPrecioActual } from '../api';

const ConsolidationTable2 = ({ acciones }) => {
  const [preciosActuales, setPreciosActuales] = useState({});
  const [cargando, setCargando] = useState(true);

  useEffect(() => {
    const fetchPreciosActuales = async () => {
      try {
        setCargando(true);
        const precios = {};
        for (const accion of acciones) {
          try {
            const precioActual = await obtenerPrecioActual(accion.nombre);
            precios[accion.nombre] = precioActual;
          } catch (error) {
            console.error(`Error al obtener precio para ${accion.nombre}:`, error);
            precios[accion.nombre] = accion.valor;
          }
        }
        setPreciosActuales(precios);
      } catch (error) {
        console.error('Error al obtener precios actuales:', error);
      } finally {
        setCargando(false);
      }
    };

    fetchPreciosActuales();
  }, [acciones]);

  const groupByAccion = () => {
    const grouped = {};

    acciones.forEach((accion) => {
      if (!grouped[accion.nombre]) {
        grouped[accion.nombre] = {
          nombre: accion.nombre,
          totalCantidad: 0,
          totalUSD: 0,
          precioPromedio: 0,
        };
      }
      grouped[accion.nombre].totalCantidad += accion.numeroAcciones || 0;
      grouped[accion.nombre].totalUSD += (accion.valor || 0) * (accion.numeroAcciones || 0);
    });

    Object.values(grouped).forEach(grupo => {
      grupo.precioPromedio = grupo.totalCantidad > 0 
        ? grupo.totalUSD / grupo.totalCantidad 
        : 0;
    });

    return Object.values(grouped);
  };

  const calculateMetrics = (accion) => {
    const valorTotal = accion.totalUSD;
    const cantidadTotal = accion.totalCantidad;
    const precioPromedio = accion.precioPromedio;
    
    const precioActual = preciosActuales[accion.nombre] || precioPromedio;
    
    const gananciaPercentage = cantidadTotal > 0 
      ? ((precioActual - precioPromedio) / precioPromedio) * 100 
      : 0;
    
    const gananciaPerdidaUSD = (precioActual - precioPromedio) * cantidadTotal;

    return {
      valorTotal: valorTotal.toFixed(2),
      precioPromedio: precioPromedio.toFixed(2),
      precioActual: precioActual.toFixed(2),
      gananciaPercentage: gananciaPercentage.toFixed(2),
      gananciaPerdidaUSD: gananciaPerdidaUSD.toFixed(2)
    };
  };

  const accionesAgrupadas = groupByAccion();

  if (cargando) {
    return <div className="text-center py-4">Cargando precios actuales...</div>;
  }

  return (
    <div className="mt-8 p-6 bg-white rounded-lg shadow-lg">
      <h2 className="text-xl font-bold mb-4">Consolidación de Acciones</h2>
      <div className="overflow-x-auto">
        <table className="w-full border-collapse">
          <thead>
            <tr className="bg-gray-50">
              <th className="border p-2 text-left">ACCIÓN</th>
              <th className="border p-2 text-right">CANTIDAD TOTAL</th>
              <th className="border p-2 text-right">VALOR TOTAL USD</th>
              <th className="border p-2 text-right">PRECIO PROMEDIO</th>
              <th className="border p-2 text-right hidden">PRECIO ACTUAL</th>
              <th className="border p-2 text-right">%GANANCIA/PÉRDIDA</th>
              <th className="border p-2 text-right">$GANANCIA/PÉRDIDA</th>
            </tr>
          </thead>
          <tbody>
            {accionesAgrupadas.map((accion, index) => {
              const { 
                valorTotal, 
                precioPromedio, 
                precioActual,
                gananciaPercentage, 
                gananciaPerdidaUSD 
              } = calculateMetrics(accion);

              return (
                <tr key={index} className="hover:bg-gray-50">
                  <td className="border p-2">{accion.nombre}</td>
                  <td className="border p-2 text-right">{accion.totalCantidad}</td>
                  <td className="border p-2 text-right">{valorTotal}</td>
                  <td className="border p-2 text-right">{precioPromedio}</td>
                  <td className="border p-2 text-right hidden">{precioActual}</td>
                  <td className="border p-2 text-right">{gananciaPercentage}%</td>
                  <td className="border p-2 text-right">{gananciaPerdidaUSD}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ConsolidationTable2;