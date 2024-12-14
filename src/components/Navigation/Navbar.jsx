import { Link, useNavigate } from 'react-router-dom';
import './Navbar.css'; // Opcional para estilos personalizados
import useAuth from '../../hooks/useAuth'; // Importamos el hook useAuth

const Navbar = () => {
  const { user, logout } = useAuth(); // Obtenemos el estado del usuario y la función logout
  const navigate = useNavigate();

  const handleLogout = () => {
    logout(); // Llamamos a la función logout para limpiar el estado del usuario
    navigate('/login'); // Redirigimos al login
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark shadow">
      <div className="container">
        {/* Brand */}
        <Link className="navbar-brand" to="/">
          Museo Humano
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
                Colecciones
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/about">
                Sobre nosotros
              </Link>
            </li>
          </ul>

          {/* Auth Links */}
          <div className="d-flex ms-3">
            {!user ? (
              <>
                <Link className="btn btn-outline-light me-2" to="/login">
                  Login
                </Link>
                <Link className="btn btn-primary" to="/register">
                  Register
                </Link>
              </>
            ) : (
              <>
                {/* Botón "Abrir Panel" solo visible para usuarios con rol "admin" */}
                {user.role === 1 && (
                  <button
                    className="btn btn-warning me-2"
                    onClick={() => navigate('/admin/users')}
                  >
                    Abrir Panel
                  </button>
                )}
                <button className="btn btn-danger" onClick={handleLogout}>
                  Log out
                </button>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
