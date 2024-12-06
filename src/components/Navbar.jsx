import React from 'react';
import { Link } from 'react-router-dom';
import './styles.css'; // Asegúrate de que la hoja de estilos esté incluida

const Navbar = () => {
    return (
        <nav className="navbar">
            <div className="navbar-logo">
                <Link to="/" className="navbar-title">
                    Museo
                </Link>
            </div>
            <ul className="navbar-links">
                <li>
                    <Link to="/" className="navbar-link">Galería</Link>
                </li>
                <li>
                    <Link to="/login" className="navbar-link">Iniciar Sesión</Link>
                </li>
                <li>
                    <Link to="/admin" className="navbar-link">Admin</Link>
                </li>
            </ul>
        </nav>
    );
};

export default Navbar;
