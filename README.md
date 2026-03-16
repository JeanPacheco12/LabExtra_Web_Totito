# Lab Extra - Totito (Tic-Tac-Toe) Pro con React + TypeScript

## Descripción del Laboratorio
Este laboratorio extra es una implementación avanzada del juego de Totito (Tic-Tac-Toe) con un tutorial que nos vino en la página oficial de React. Partiendo de la base del tutorial, se expandió la funcionalidad para incluir retos de lógica y UI, utilizando **Vite** como bundler y **TypeScript** para un desarrollo seguro y libre de errores de tipado y para mejorar la UX del usuario con las diferentes implementaciones que se realizaron.

## Funcionalidades y Desafíos Extra Implementados
Más allá del tutorial básico que nos ofrecía React, este proyecto incluye:

1.  **Renderización Dinámica (Loops):** El tablero se genera mediante bucles anidados, eliminando el código repetitivo y mejorando la escalabilidad.
2.  **Ubicación de Movimientos:** El historial muestra coordenadas precisas `(fila, columna)` para cada jugada realizada.
3.  **Viaje en el Tiempo (Time Travel):** Gestión de estado inmutable mediante *Lifting State Up* en el componente `Game`.
4.  **Resaltado del Movimiento Actual:** La interfaz identifica visualmente el paso actual en el historial, desactivando el botón para evitar redundancia.
5.  **Ordenamiento Inteligente:** Funcionalidad para alternar el orden de la lista de movimientos (Ascendente/Descendente).
6.  **Detección de Empate y Resaltado de Victoria:** Cuando hay un ganador, se resaltan los cuadros de la combinación ganadora. Si se agotan los movimientos, se notifica un empate.

---
**Video de demostración:** 
(https://youtu.be/pRai7s8K75E)
