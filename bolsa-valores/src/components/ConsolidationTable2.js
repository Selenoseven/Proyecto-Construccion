import React from 'react';

const ConsolidationTable2 = ({ acciones, preciosActuales = {} }) => {
  // Agrupar acciones por nombre y calcular totales
  const groupByAccion = () => {
    const grouped = {};

    acciones.forEach((accion) => {
      if (!grouped[accion.nombre]) {
        grouped[accion.nombre] = {
          nombre: accion.nombre,
          totalCantidad: 0,
          totalUSD: 0,
        };
      }
      grouped[accion.nombre].totalCantidad += accion.numeroAcciones || 0;
      grouped[accion.nombre].totalUSD += (accion.valor || 0) * (accion.numeroAcciones || 0);
    });

    return Object.values(grouped);
  };

  const accionesAgrupadas = groupByAccion();

  // Calcular precio de costo
  const calculateMetrics = (accion) => {
    const costPrice = accion.totalCantidad > 0 ? accion.totalUSD / accion.totalCantidad : 0;
    return {
      costPrice: costPrice.toFixed(2),
    };
  };

  return (
    <div className="mt-8 p-6 bg-white rounded-lg shadow-lg">
      <h2 className="text-xl font-bold mb-4">Consolidación de Acciones</h2>
      <div className="overflow-x-auto">
        <table className="w-full border-collapse">
          <thead>
            <tr className="bg-gray-50">
              <th className="border p-2 text-left">ACCIÓN</th>
              <th className="border p-2 text-right">CANTIDAD TOTAL</th>
              <th className="border p-2 text-right">VALOR USD</th>
              <th className="border p-2 text-right">PRECIO DE COSTO</th>
            </tr>
          </thead>
          <tbody>
            {accionesAgrupadas.map((accion, index) => {
              const { costPrice } = calculateMetrics(accion);

              return (
                <tr key={index} className="hover:bg-gray-50">
                  <td className="border p-2">{accion.nombre}</td>
                  <td className="border p-2 text-right">{accion.totalCantidad}</td>
                  <td className="border p-2 text-right">{accion.totalUSD.toFixed(2)}</td>
                  <td className="border p-2 text-right">{costPrice}</td>
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