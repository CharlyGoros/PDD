import React from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css'; // Opcional para agregar estilos personalizados

const Navbar = () => {
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark shadow">
      <div className="container">
        {/* Brand */}
        <Link className="navbar-brand" to="/">
          Museum Name
        </Link>
        
        {/* Toggler for responsive menu */}
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        
        {/* Navbar Links */}
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav ms-auto">
            <li className="nav-item">
              <Link className="nav-link" to="/">
                Home
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/collections">
                Collections
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/about">
                About
              </Link>
            </li>
          </ul>
          
          {/* Auth Links */}
          <div className="d-flex ms-3">
            <Link className="btn btn-outline-light me-2" to="/login">
              Login
            </Link>
            <Link className="btn btn-primary" to="/register">
              Register
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
