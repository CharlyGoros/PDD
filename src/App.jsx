import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import GalleryPage from './pages/GalleryPage';
import LoginPage from './pages/LoginPage';
import AdminPanel from './pages/AdminPanel';

const App = () => {
    return (
        <Router>
            <Navbar />
            <Routes>
                <Route path="/" element={<GalleryPage />} />
                <Route path="/login" element={<LoginPage />} />
                <Route path="/admin" element={<AdminPanel />} />
            </Routes>
        </Router>
    );
};

export default App;
