import React, { useState } from 'react';
import { ArrowUpRight, ArrowDownRight } from 'lucide-react';
import styles from '../Styles/AccionesRegistradas.module.css';

const AccionesRegistradas = ({ acciones, accionesActualizadas, onSeleccionarAccion }) => {
  const [ordenamiento, setOrdenamiento] = useState({ columna: null, ascendente: true });
  const [accionesOrdenadas, setAccionesOrdenadas] = useState([]);

  const ordenarAcciones = (columna) => {
    const esAscendente = ordenamiento.columna === columna ? !ordenamiento.ascendente : true;
    const nuevasAccionesOrdenadas = [...acciones].sort((a, b) => {
      const valorA = a[columna];
      const valorB = b[columna];
      
      if (typeof valorA === 'number' && typeof valorB === 'number') {
        return esAscendente ? valorA - valorB : valorB - valorA;
      }
      
      if (valorA < valorB) return esAscendente ? -1 : 1;
      if (valorA > valorB) return esAscendente ? 1 : -1;
      return 0;
    });

    setAccionesOrdenadas(nuevasAccionesOrdenadas);
    setOrdenamiento({ columna, ascendente: esAscendente });
  };

  const accionesMostradas = accionesOrdenadas.length > 0 ? accionesOrdenadas : acciones;

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
                { label: 'Ganancia/Pérdida', key: 'ganancia' },
                { label: '% de Ganancia/Pérdida', key: 'porcentaje' }
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
            {accionesMostradas.map((accion) => (
              <tr 
                key={accion._id} 
                className={styles.tableRow}
                onClick={() => onSeleccionarAccion(accion)}
              >
                <td className={`${styles.tableCell} ${styles.tableCellName}`}>
                  {accion.nombre}
                </td>
                <td className={styles.tableCell}>
                  {accion.numeroAcciones}
                </td>
                <td className={styles.tableCell}>
                  ${accion.valor.toFixed(2)}
                </td>
                <td className={styles.tableCell}>
                  ${accion.precioActual.toFixed(2)}
                </td>
                <td className={`${styles.tableCell} ${accion.ganancia >= 0 ? styles.gain : styles.loss}`}>
                  {accion.ganancia >= 0 ? 
                    <ArrowUpRight className="inline mr-1" size={16} /> : 
                    <ArrowDownRight className="inline mr-1" size={16} />
                  }
                  ${Math.abs(accion.ganancia).toFixed(2)}
                </td>
                <td className={`${styles.tableCell} ${accion.porcentaje >= 0 ? styles.gain : styles.loss}`}>
                  {accion.porcentaje >= 0 ? 
                    <ArrowUpRight className="inline mr-1" size={16} /> : 
                    <ArrowDownRight className="inline mr-1" size={16} />
                  }
                  {Math.abs(accion.porcentaje).toFixed(2)}%
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