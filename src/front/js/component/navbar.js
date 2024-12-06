import React from "react";
import "../../styles/index.css"; // Usa estilos globales o crea nuevos si es necesario

const Navbar = () => {
  return (
    <nav className="navbar">
      <div className="navbar-brand">Monitō</div>// Nombre de la APP
      <ul className="navbar-links">
        <li><a href="#">Inicio</a></li>
        <li><a href="#">Mapa</a></li>
        <li><a href="#">¿Qué es?</a></li>
        <li><a href="#">Contacto</a></li>
      </ul>
      <button className="btn-iniciar-sesion">Iniciar Sesión</button>
    </nav>
  );
};

export default Navbar;
