// Importamos las dependencias necesarias de React
import React from "react";
// Importamos el módulo de ReactDOM para renderizar el componente en el DOM
import ReactDOM from "react-dom/client";
// Importamos los estilos globales de la aplicación
import "./index.css";
// Importamos el componente principal de la aplicación
import App from "./App";

// Creamos una raíz para renderizar el componente React en el elemento con id "root"
const root = ReactDOM.createRoot(document.getElementById("root"));

// Renderizamos el componente App dentro de React.StrictMode para activar comprobaciones adicionales en el desarrollo
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
