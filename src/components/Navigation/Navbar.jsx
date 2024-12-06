import { Link } from 'react-router-dom';
import { FaUser } from 'react-icons/fa';
import './Navbar.css';

const Navbar = () => {
  const scrollToCollection = (id) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <nav className="navbar">
      <div className="navbar-brand">
        <Link to="/">Museum Name</Link>
      </div>
      <div className="navbar-auth">
        <Link to="/login" className="auth-link">
          <FaUser /> Login
        </Link>
        <Link to="/register" className="auth-button">
          Register
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;