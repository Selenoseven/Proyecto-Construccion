import React from 'react';

const ConsolidationTable = ({ acciones }) => {
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const day = date.getDate();
    const month = date.toLocaleString('es', { month: 'short' }).toLowerCase();
    return `${day}-${month}`;
  };

  const getUSDValue = (price, quantity) => price * quantity;

  // Calculate totals
  const calculateTotals = () => {
    return acciones.reduce((acc, curr) => ({
      totalUSD: acc.totalUSD + (curr.valor * curr.numeroAcciones),
      totalQuantity: acc.totalQuantity + curr.numeroAcciones
    }), { totalUSD: 0, totalQuantity: 0 });
  };

  const { totalUSD, totalQuantity } = calculateTotals();

  return (
    <div className="mt-8 p-6 bg-white rounded-lg shadow-lg">
      <h2 className="text-xl font-bold mb-4">Registro de Transacciones</h2>
      <div className="overflow-x-auto">
        <table className="w-full border-collapse">
          <thead>
            <tr className="bg-gray-50">
              <th className="border p-2 text-left">FECHA COMPRA</th>
              <th className="border p-2 text-left">ACCIÓN</th>
              <th className="border p-2 text-right">PRECIO COMPRA</th>
              <th className="border p-2 text-right">CANTIDAD COMPRADA</th>
              <th className="border p-2 text-right">USD COMPRA</th>
            </tr>
          </thead>
          <tbody>
            {acciones.map((accion, index) => (
              <tr key={index} className="hover:bg-gray-50">
                <td className="border p-2">{formatDate(accion.fecha)}</td>
                <td className="border p-2">{accion.nombre}</td>
                <td className="border p-2 text-right">{accion.valor.toFixed(2)}</td>
                <td className="border p-2 text-right">{accion.numeroAcciones}</td>
                <td className="border p-2 text-right">
                  {getUSDValue(accion.valor, accion.numeroAcciones).toFixed(2)}
                </td>
              </tr>
            ))}
            <tr className="bg-gray-100 font-bold">
              <td colSpan="3" className="border p-2">Totales</td>
              <td className="border p-2 text-right">{totalQuantity}</td>
              <td className="border p-2 text-right">{totalUSD.toFixed(2)}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ConsolidationTable;
