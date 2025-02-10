import jsPDF from "jspdf";
import "jspdf-autotable";

const generatePortfolioReport = (acciones, transacciones) => {
  const doc = new jsPDF();

  // Título del reporte
  doc.setFontSize(16);
  doc.text("Reporte de Portafolio de Inversiones", 105, 20, { align: "center" });

  // Fecha del reporte
  const date = new Date();
  doc.setFontSize(10);
  doc.text(`Fecha: ${date.toLocaleDateString()} ${date.toLocaleTimeString()}`, 10, 30);

  // Primera tabla: Cartera de Acciones
  doc.setFontSize(14);
  doc.text("Cartera de Acciones", 10, 40);

  const carteraHeaders = [
    "Nombre de Acción",
    "Cantidad",
    "Valor USD",
    "Precio Actual",
    "Ganancia/Pérdida",
  ];

  const carteraRows = acciones.map((accion) => {
    const nombre = accion.nombre || "Desconocido";
    const cantidad = Number(accion.numeroAcciones) || 0;
    const valorUSD = Number(accion.valorUSD) || 0;
    const precioActual = Number(accion.valor) || 0;
    const gananciaPerdida = (precioActual * cantidad) - valorUSD;

    return [
      nombre,
      cantidad,
      `$${valorUSD.toFixed(2)}`,
      `$${precioActual.toFixed(2)}`,
      `$${gananciaPerdida.toFixed(2)}`,
    ];
  });

  doc.autoTable({
    head: [carteraHeaders],
    body: carteraRows,
    startY: 50,
  });

  // Segunda tabla: Registro de Transacciones
  const nextTableY = doc.previousAutoTable.finalY + 10;
  doc.setFontSize(14);
  doc.text("Registro de Transacciones", 10, nextTableY);

  const transaccionesHeaders = [
    "Fecha de Compra",
    "Nombre de Acción",
    "Precio Compra",
    "Cantidad Comprada",
    "USD Compra",
  ];

  const transaccionesRows = transacciones.map((transaccion) => [
    transaccion.fechaCompra || "Fecha desconocida",
    transaccion.nombre || "Desconocido",
    `$${(Number(transaccion.precioCompra) || 0).toFixed(2)}`,
    Number(transaccion.cantidadComprada) || 0,
    `$${(Number(transaccion.usdCompra) || 0).toFixed(2)}`,
  ]);

  doc.autoTable({
    head: [transaccionesHeaders],
    body: transaccionesRows,
    startY: nextTableY + 10,
  });

  // Guardar el PDF
  doc.save("reporte_portafolio_completo.pdf");
};

export default generatePortfolioReport;
