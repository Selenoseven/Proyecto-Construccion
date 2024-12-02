## **Estándares de Programación**

Los estándares de programación adoptados en el proyecto aseguran un código limpio, fácil de mantener y comprensible por todo el equipo. Además, fomentan la colaboración eficiente y minimizan errores comunes en el desarrollo.

---

### **Clean Code**
- **Nombres claros y consistentes para variables y funciones**:
  - Se utilizaron nombres descriptivos y significativos que reflejan su propósito.

  - Uso de convenciones como camelCase para variables y funciones, y PascalCase para nombres de clases.
  
- **Comentarios solo cuando es estrictamente necesario**:
  - El código debe ser autoexplicativo; los comentarios se utilizan únicamente para documentar lógica compleja o decisiones críticas.


---

### **Evitar Code Smells**
- **Dividir funciones grandes en pequeñas**:
  - Cada función debe realizar una única tarea específica (principio de responsabilidad única).
   
- **No repetir código innecesariamente**:
  - Se implementaron funciones reutilizables para evitar duplicación y mantener la DRY (Don't Repeat Yourself).
    Ejemplo: Una función centralizada para manejar solicitudes HTTP.

---

### **Control de Versiones**
- **Estructura de Ramas**:
  - `main`: Contiene la versión estable del código, lista para producción.
  - `release`: Rama base para el desarrollo de nuevas funcionalidades.
  - `Documentos`: Contiene los documentos necesarios para la implementación del proyecto.

- **Mensajes de Commit Claros**:
  - Formato estándar: rama(funcionalidad-Backend-Frontend-Documento): acción a realizar.


---

### **Colaboración**
- **Revisiones de Código**:
  - Cada cambio significativo en el código se revisa a través de Pull Requests (PRs) para garantizar la calidad.
  - Las revisiones son realizadas por otro miembro del equipo, lo que fomenta el aprendizaje colectivo y minimiza errores.
  
  
- **Comunicación Activa**:
  - Durante el desarrollo, se mantuvo una comunicación constante en canales compartidos (WhatsApp) para resolver dudas rápidamente y mantener al equipo sincronizado.

---

Estos estándares no solo aseguran un código limpio y funcional, sino que también permiten que el proyecto sea escalable y comprensible para nuevos colaboradores en el futuro.
