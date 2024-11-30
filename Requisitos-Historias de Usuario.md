# Historias de Usuario

## Nro: HU-001
**Título:** Registrar acción comprada  
**Prioridad:** Alta  
**Estimación:** 6 horas  

### Historia de usuario
Como usuario, quiero registrar las acciones que compré, ingresando el símbolo, número de acciones, valor de compra y la fecha, para llevar un registro organizado de mis inversiones.

### Criterios de aceptación
1. **Formulario funcional:** El formulario debe permitir ingresar correctamente el símbolo, número de acciones, valor y fecha.
2. **Validación de datos:** Si algún campo está vacío o contiene datos inválidos (por ejemplo, valores negativos), la aplicación debe mostrar un mensaje de error claro.
3. **Visualización inmediata:** Después de registrar una acción, debe aparecer en la tabla "Acciones Registradas" con los datos ingresados.

### Tareas de implementación
- Diseñar y desarrollar el formulario para registrar acciones. (2 horas)  
- Implementar validaciones para los datos ingresados. (2 horas)  
- Guardar los datos en la base de datos al hacer clic en "Registrar". (1 horas)  
- Probar la funcionalidad con datos válidos e inválidos. (1 hora)  

---

## Nro: HU-002
**Título:** Actualizar precios actuales de las acciones  
**Prioridad:** Alta  
**Estimación:** 11 horas  

### Historia de usuario
Como usuario, quiero que la aplicación obtenga el precio actual de todas las acciones registradas utilizando la API de Finnhub, para que pueda saber si mis inversiones están generando ganancias o pérdidas.

### Criterios de aceptación
1. **Conexión con la API:** La aplicación debe conectarse exitosamente a la API de Finnhub y obtener los precios actuales de las acciones registradas.
2. **Actualización correcta:** Los precios actuales deben actualizarse en la columna "Precio Actual" de la tabla.
3. **Indicadores visuales:** La tabla debe reflejar si el precio actual se actualizó correctamente o si hubo algún error.

### Tareas de implementación
- Configurar la conexión con la API de Finnhub. (5 horas)  
- Implementar la funcionalidad para actualizar los precios actuales de todas las acciones registradas. (4 horas)  
- Mostrar mensajes de error en caso de fallos en la conexión o datos faltantes. (1 horas)  
- Probar la funcionalidad con datos reales y simulados. (1 horas)  

---

## Nro: HU-003
**Título:** Calcular y mostrar ganancias/pérdidas  
**Prioridad:** Media  
**Estimación:** 13 horas  

### Historia de usuario
Como usuario, quiero ver el cálculo detallado de ganancias o pérdidas para cada acción registrada, basado en el precio actual obtenido mediante la API, para evaluar el rendimiento de mis inversiones.

### Criterios de aceptación
1. **Obtención de precios mediante la API:** La aplicación debe consultar los precios actuales de cada acción desde Finnhub y utilizarlos para los cálculos.
2. **Cálculo preciso:** La aplicación debe calcular las ganancias/pérdidas para cada acción utilizando la fórmula:  
   **Ganancia/Pérdida = (Precio Actual - Valor Inicial) × Número de Acciones**
3. **Explicación detallada:** Los cálculos deben incluir una explicación clara del rendimiento, mostrando los datos utilizados (valor inicial, precio actual y número de acciones).
4. **Visualización clara:** Las ganancias/pérdidas deben mostrarse en una tabla, con indicadores visuales (verde para ganancias, rojo para pérdidas).

### Tareas de implementación
- Implementar una función para obtener los precios actuales de todas las acciones registradas utilizando la API de Finnhub. (6 horas)  
- Diseñar el cálculo de ganancias/pérdidas basado en los datos obtenidos de la API. (4 horas)  
- Mostrar los cálculos y explicaciones detalladas en la interfaz. (2 horas)  
- Probar la funcionalidad con diferentes combinaciones de valores iniciales y precios actuales simulados desde la API. (1 hora)  

---

## Nro: HU-004
**Título:** Exportar registros a Excel  
**Prioridad:** Media  
**Estimación:** 12 horas  

### Historia de usuario
Como usuario, quiero exportar la tabla de acciones registradas con sus datos (incluyendo ganancias/pérdidas) a un archivo Excel, para poder analizar mis inversiones fuera de la aplicación.

### Criterios de aceptación
1. **Funcionalidad de exportación:** Debe haber un botón "Exportar a Excel" que permita descargar los datos registrados en formato Excel.
2. **Formato adecuado:** El archivo exportado debe incluir todas las columnas visibles (símbolo, número de acciones, valor inicial, precio actual, ganancias/pérdidas).
3. **Manejo de errores:** Si ocurre un error durante la exportación, se debe mostrar un mensaje claro al usuario.

### Tareas de implementación
- Crear una funcionalidad para exportar los datos a un archivo Excel. (5 horas)  
- Configurar el formato y estructura del archivo exportado. (4 horas)  
- Implementar manejo de errores durante la exportación. (2 horas)  
- Probar la funcionalidad con diferentes cantidades de datos. (1 hora)  

---


