import { useState, useEffect } from 'react';
import { fetchCategories, createCategory, updateCategory, deleteCategory } from '../../../services/api';
import CategoryForm from './CategoryForm';
import './CategoryManagement.css';

const CategoryManagement = () => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [editingCategory, setEditingCategory] = useState(null);

  useEffect(() => {
    loadCategories();
  }, []);

  const loadCategories = async () => {
    try {
      const data = await fetchCategories();
      setCategories(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleCreateCategory = async (categoryData) => {
    try {
      await createCategory(categoryData);
      await loadCategories();
      setEditingCategory(null);
    } catch (err) {
      setError(err.message);
    }
  };

  const handleUpdateCategory = async (categoryId, categoryData) => {
    try {
      await updateCategory(categoryId, categoryData);
      await loadCategories();
      setEditingCategory(null);
    } catch (err) {
      setError(err.message);
    }
  };

  const handleDeleteCategory = async (categoryId) => {
    if (!window.confirm('Are you sure you want to delete this category?')) return;
    
    try {
      await deleteCategory(categoryId);
      await loadCategories();
    } catch (err) {
      setError(err.message);
    }
  };

  if (loading) return <div className="loading">Loading categories...</div>;
  if (error) return <div className="error">{error}</div>;

  return (
    <div className="category-management">
      <h2>Category Management</h2>
      <CategoryForm 
        onSubmit={editingCategory ? 
          (data) => handleUpdateCategory(editingCategory._id, data) : 
          handleCreateCategory}
        initialData={editingCategory}
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
              <button onClick={() => setEditingCategory(category)}>Edit</button>
              <button onClick={() => handleDeleteCategory(category._id)}>Delete</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};