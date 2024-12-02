# Flujo de Trabajo

## **Estructura del Equipo**
- **Shirley**: Líder de proyecto. Responsable de coordinar tareas y revisiones de código.
- **Daniela**: Frontend Developer. Diseñadora e implementadora de componentes del usuario y conectividad con la API.
- **Marlow**: Backend Developer. Responsable de los controladores, lógica de negocio y manejo de la base de datos.
- **Cristian**: Colaborador general. Encargado de tareas menores y soporte en el desarrollo.
- **Cristofer**: Documentación y comunicación. Asegura que toda la información del proyecto esté clara y accesible.

---

## **Ciclo de Vida del Proyecto**

### **1. Planificación**
1. Crear y priorizar tareas en una herramienta de gestión como Trello o Jira.
2. Definir historias de usuario y los criterios de aceptación.
3. Asignar responsabilidades según los roles del equipo.

---

### **2. Desarrollo**
1. Clonar el repositorio y crear una rama específica para la tarea asignada:
   ```
   git checkout -b feature/nueva-funcionalidad
   ```
2. Implementar la funcionalidad o corrección en la rama correspondiente.
3. Escribir mensajes de commit claros y consistentes
```
git commit -m "[Feature] Agregado registro de acciones"
```
4. Empujar los cambios a la rama remota
```
git push origin feature/nueva-funcionalidad
```
---

### **3. Revisión de Código**
Crear un Pull Request (PR) hacia la rama development.
Notificar al líder del proyecto o al equipo para revisar los cambios.
Corregir cualquier problema o solicitud planteada durante la revisión.

---
### **4. Integración**
1. Una vez aprobada la PR, fusionar los cambios en development.
2. Verificar manualmente que las funcionalidades agregadas no rompen la aplicación.
3. Si todo está correcto, fusionar development con main para el despliegue.
---

### **5. Entrega**

1. Preparar el proyecto para su despliegue manual (sin automatización DevOps).
2. Compartir la aplicación con el equipo o cliente mediante un entorno local o documentación detallada para configuración.
---


## **Elementos Adicionales del Flujo de Trabajo**

### **Control de Versiones**
- **Rama principal**: `main` (Default).
  - **Descripción**: Es la rama principal y estable del proyecto, donde se integran todas las funcionalidades completadas y probadas.
  - **Propósito**: Garantizar una base sólida del código que puede ser usada en producción.
- **Rama secundaria**: `Documentos`.
  - **Descripción**: Esta rama contiene documentación relacionada con el proyecto, como estándares de programación, arquitectura del sistema, flujo de trabajo. requisitos e historias de usuario y guías de instalación.
  - **Propósito**: Centralizar toda la documentación esencial para el equipo, facilitando la colaboración.
- **Rama release**: `release`.
   - **Descripción**: Esta rama está enfocada en el desarrollo del backend y frontend del proyecto, con actualizaciones y ajustes relacionados con la API y la estructura del backend.
   - **Propósito**: Servir como rama intermedia para consolidar y probar características del backend antes de fusionarlas con `main`.





---

### **Políticas de Commit**
- Los mensajes de commit deben ser claros y precisos
---
### **Gestión de Colaboración:**
- Se requiere al menos una revisión por parte de otro miembro antes de fusionar PRs.
---
### **Documentación Continua:**
- Se mantiene actualizada la descripción de la API y del flujo de trabajo.

