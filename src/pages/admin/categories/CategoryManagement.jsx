import { useState, useEffect } from 'react';
import { getCategories, createCategory, updateCategory, deleteCategoryById } from '../../../services/api';
import CategoryForm from './CategoryForm';
import './CategoryManagement.css';
import useAuth from '../../../hooks/useAuth';

const CategoryManagement = () => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [editingCategory, setEditingCategory] = useState(null);
const {token} = useAuth();
  useEffect(() => {
    loadCategories();
  }, []); // Se ejecuta solo una vez al montar el componente

  const loadCategories = async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await getCategories();
      setCategories(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleCreateCategory = async (categoryData) => {
    try {
      await createCategory(token,categoryData);
      await loadCategories();
    } catch (err) {
      setError(err.message);
    }
  };

  const handleUpdateCategory = async (categoryId, categoryData) => {
    try {
      await updateCategory(token,categoryId, categoryData);
      await loadCategories();
      setEditingCategory(null);
    } catch (err) {
      setError(err.message);
    }
  };

  const handleDeleteCategory = async (categoryId) => {
    if (!window.confirm('Are you sure you want to delete this category?')) return;

    try {
      await deleteCategoryById(token,categoryId);
      await loadCategories();
    } catch (err) {
      setError(err.message);
    }
  };

  const handleCancelEdit = () => {
    setEditingCategory(null);
  };

  if (loading) return <div className="loading">Cargando categorias...</div>;
  if (error) return <div className="error">{error}</div>;

  return (
    <div className="category-management">
      <h2>Gestión de categorías</h2>
      <CategoryForm
        onSubmit={editingCategory ? 
          (data) => handleUpdateCategory(editingCategory._id, data) : 
          handleCreateCategory}
        initialData={editingCategory}
        onCancel={handleCancelEdit} 
      />
      <div className="category-list">
        {categories.map((category) => (
          <div key={category._id} className="category-item">
            <img src={category.image} alt={category.title} />
            <div className="category-details">
              <h3>{category.title}</h3>
              <p>{category.description}</p>
            </div>
            <div className="category-actions">
              <button onClick={() => setEditingCategory(category)}>Editar</button>
              <button onClick={() => handleDeleteCategory(category._id)}>Eliminar</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CategoryManagement;
