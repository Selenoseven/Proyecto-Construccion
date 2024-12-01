import React, { useEffect, useState } from 'react';
import { obtenerAcciones } from '../api';
import { ArrowUpRight, ArrowDownRight } from 'lucide-react';
import styles from '../Styles/AccionesRegistradas.module.css';

const AccionesRegistradas = ({ accionesActualizadas, onSeleccionarAccion }) => {
  const [acciones, setAcciones] = useState([]);
  const [ordenamiento, setOrdenamiento] = useState({ columna: null, ascendente: true });

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

  const ordenarAcciones = (columna) => {
    const esAscendente = ordenamiento.columna === columna ? !ordenamiento.ascendente : true;
    const accionesOrdenadas = [...acciones].sort((a, b) => {
      if (a[columna] < b[columna]) return esAscendente ? -1 : 1;
      if (a[columna] > b[columna]) return esAscendente ? 1 : -1;
      return 0;
    });

    setAcciones(accionesOrdenadas);
    setOrdenamiento({ columna, ascendente: esAscendente });
  };

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>Cartera de Acciones</h2>
      <div className="overflow-x-auto">
        <table className={styles.table}>
          <thead className={styles.tableHeader}>
            <tr>
              {[
                { label: 'Nombre', key: 'nombre' },
                { label: 'Núm. Acciones', key: 'numeroAcciones' },
                { label: 'Valor Inicial', key: 'valor' },
                { label: 'Precio Actual', key: 'precioActual' },
                { label: 'Ganancia/Pérdida', key: 'ganancia' }
              ].map(({ label, key }) => (
                <th 
                  key={key} 
                  onClick={() => ordenarAcciones(key)}
                  className={styles.tableHeaderCell}
                >
                  {label}
                  {ordenamiento.columna === key && (
                    <span className="ml-2">
                      {ordenamiento.ascendente ? '▲' : '▼'}
                    </span>
                  )}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {acciones.map((accion) => (
              <tr 
                key={accion._id} 
                className={styles.tableRow}
                onClick={() => onSeleccionarAccion(accion)}
              >
                <td className={`${styles.tableCell} ${styles.tableCellName}`}>{accion.nombre}</td>
                <td className={styles.tableCell}>{accion.numeroAcciones}</td>
                <td className={styles.tableCell}>${accion.valor.toFixed(2)}</td>
                <td className={styles.tableCell}>${accion.precioActual.toFixed(2)}</td>
                <td className={`${styles.tableCell} ${accion.ganancia >= 0 ? styles.gain : styles.loss}`}>
                  {accion.ganancia >= 0 ? <ArrowUpRight className="inline mr-1" size={16} /> : <ArrowDownRight className="inline mr-1" size={16} />}
                  ${Math.abs(accion.ganancia).toFixed(2)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AccionesRegistradas;
