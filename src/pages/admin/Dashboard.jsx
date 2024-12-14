import { useState } from 'react';
import { Link, Outlet } from 'react-router-dom';
import { FaUsers, FaImages, FaFolder } from 'react-icons/fa';
import './Dashboard.css';

export const Dashboard = () => {
  const [activeSection, setActiveSection] = useState('users');

  return (
    <div className="admin-dashboard">
      <aside className="admin-sidebar">
        <nav className="admin-nav">
          <Link 
            to="/admin/users" 
            className={`nav-item ${activeSection === 'users' ? 'active' : ''}`}
            onClick={() => setActiveSection('users')}
          >
            <FaUsers /> Usuarios
          </Link>
          <Link 
            to="/admin/categories" 
            className={`nav-item ${activeSection === 'categories' ? 'active' : ''}`}
            onClick={() => setActiveSection('categories')}
          >
            <FaFolder /> Categorias
          </Link>
          <Link 
            to="/admin/artworks" 
            className={`nav-item ${activeSection === 'artworks' ? 'active' : ''}`}
            onClick={() => setActiveSection('artworks')}
          >
            <FaImages /> Obras de Arte
          </Link>
        </nav>
      </aside>
      <main className="admin-content">
        <Outlet />
      </main>
    </div>
  );
};

export default Dashboard;