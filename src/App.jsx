import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navigation/Navbar';
import Footer from './components/Footer/Footer';
import CategoryDetails from './components/CategoryCard/CategoryDetails';
import Home from './pages/Home';
import Login from './pages/auth/Login';
import Register from './pages/auth/Register';
import Dashboard from './pages/Admin/Dashboard';
import UserManagement from './pages/Admin/users/UserManagement';
import CategoryManagement from './pages/Admin/categories/CategoryManagement';
import ArtworkManagement from './pages/Admin/artworks/ArtworkManagement';
import ProtectedRoute from './components/ProtectedRoute/ProtectedRoute';
import './App.css';
import About from './pages/About/About';

function App() {
  return (
    <Router>
      <div className="app">
        <Navbar />
        <main className="main-content">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/categories/:categoryId" element={<CategoryDetails />} />
            <Route path="/about" element={<About />} />

            <Route
              path="/admin"
              element={
                <ProtectedRoute adminOnly>
                  <Dashboard />
                </ProtectedRoute>
              }
            >
              <Route path="users" element={<UserManagement />} />
              <Route path="categories" element={<CategoryManagement />} />
              <Route path="artworks" element={<ArtworkManagement />} />
            </Route>
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;