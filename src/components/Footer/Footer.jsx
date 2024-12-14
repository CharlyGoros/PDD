import { Link } from 'react-router-dom';
import { FaFacebook, FaTwitter, FaInstagram } from 'react-icons/fa';
import './Footer.css';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-content">
        <div className="footer-section">
          <h3>Visitanos</h3>
          <p>Segurola 712</p>
          <p>Buenos aires, Argentina</p>
          <p>Horarios: 10:00 - 18:00</p>
        </div>
        <div className="footer-section">
          <h3>Quick Links</h3>
          <Link to="/about">Sobre nosotros</Link>
          <Link to="/contact">Contacto</Link>
          <Link to="/support">Apoyanos</Link>
        </div>
        <div className="footer-section">
          <h3>Redes</h3>
          <div className="social-links">
            <a href="#" aria-label="Facebook"><FaFacebook /></a>
            <a href="#" aria-label="Twitter"><FaTwitter /></a>
            <a href="#" aria-label="Instagram"><FaInstagram /></a>
          </div>
        </div>
      </div>
      <div className="footer-bottom">
        <p>&copy; {new Date().getFullYear()} Museo Humano.Todos los derechos reservados.</p>
      </div>
    </footer>
  );
};

export default Footer;