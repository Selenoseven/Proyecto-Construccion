import axios from 'axios';

const API_URL = 'http://localhost:5000/api';
const API_KEY = '078cd8766c85476cadb219120424bb75';



// Registrar una acción
export const registrarAccion = async (datos) => {
  try {
    const response = await axios.post(`${API_URL}/accion`, datos);
    return response.data;
  } catch (error) {
    console.error('Error al registrar la acción:', error.message);
    throw error;
  }
};
// Obtener precio actual de una acción desde Twelve Data
export const obtenerPrecioActual = async (simbolo) => {
  try {
    const response = await axios.get('https://api.twelvedata.com/quote', {
      params: {
        symbol: simbolo,
        apikey: API_KEY,
      },
    });

    const { close } = response.data; // Precio actual
    if (!close) {
      throw new Error('Precio actual no disponible');
    }

    return parseFloat(close);
  } catch (error) {
    console.error('Error al obtener el precio actual desde Twelve Data:', error.message);
    throw error;
  }
};


// Obtener todas las acciones registradas
export const obtenerAcciones = async () => {
  try {
    const response = await axios.get(`${API_URL}/acciones`);
    return response.data;
  } catch (error) {
    console.error('Error al obtener las acciones:', error.message);
    throw error;
  }
};


// Obtener histórico de una acción desde Twelve Data
export const obtenerHistoricoAccion = async (simbolo) => {
  
  try {
    const response = await axios.get('https://api.twelvedata.com/time_series', {
      params: {
        symbol: simbolo,
        interval: '1day',
        apikey: API_KEY,
      },
    });

    const { values } = response.data;
    if (!values) {
      throw new Error('Datos históricos no disponibles');
    }

    const historico = values.map((item) => ({
      fecha: item.datetime,
      precio: parseFloat(item.close),
    }));

    return historico;
  } catch (error) {
    console.error('Error al obtener el historial de la acción desde Twelve Data:', error.message);
    throw error;
  }
};


