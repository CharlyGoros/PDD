import { useState } from 'react';
import { Link, Outlet } from 'react-router-dom';
import { FaUsers, FaImages, FaFolder } from 'react-icons/fa';
import './Dashboard.css';

const Dashboard = () => {
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
            <FaUsers /> Users
          </Link>
          <Link 
            to="/admin/categories" 
            className={`nav-item ${activeSection === 'categories' ? 'active' : ''}`}
            onClick={() => setActiveSection('categories')}
          >
            <FaFolder /> Categories
          </Link>
          <Link 
            to="/admin/artworks" 
            className={`nav-item ${activeSection === 'artworks' ? 'active' : ''}`}
            onClick={() => setActiveSection('artworks')}
          >
            <FaImages /> Artworks
          </Link>
        </nav>
      </aside>
      <main className="admin-content">
        <Outlet />
      </main>
    </div>
  );
};