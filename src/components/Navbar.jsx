import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
    return (
        <nav className="navbar">
            <div className="logo">
                <Link to="/" style={{ color: 'white', textDecoration: 'none' }}>
                    Museo
                </Link>
            </div>
            <ul>
                <li>
                    <Link to="/">Galería</Link>
                </li>
                <li>
                    <Link to="/login">Iniciar Sesión</Link>
                </li>
                <li>
                    <Link to="/admin">Admin</Link>
                </li>
            </ul>
        </nav>
    );
};

export default Navbar;
