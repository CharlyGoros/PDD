import { useState, useEffect } from 'react';
import {
  getCategories,
  getArtworksByCategory,
  createArtwork,
  updateArtwork,
  deleteArtworkById,
} from '../../../services/api';
import ArtworkForm from './ArtworkForm';
import useAuth from '../../../hooks/useAuth';
import './ArtworkManagement.css';

const ArtworkManagement = () => {
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [artworks, setArtworks] = useState([]);
  const [loadingCategories, setLoadingCategories] = useState(true);
  const [loadingArtworks, setLoadingArtworks] = useState(false);
  const [error, setError] = useState(null);
  const [editingArtwork, setEditingArtwork] = useState(null);
  const { token } = useAuth();

  useEffect(() => {
    const loadCategories = async () => {
      try {
        const data = await getCategories(token);
        setCategories(data);
        if (data.length > 0) {
          setSelectedCategory(data[0]);
        } else {
          setError('No categories found.');
        }
      } catch (err) {
        setError(`Error loading categories: ${err.message}`);
      } finally {
        setLoadingCategories(false);
      }
    };

    loadCategories();
  }, [token]);

  useEffect(() => {
    if (selectedCategory) {
      loadArtworks(selectedCategory._id);
    }
  }, [selectedCategory, token]);

  const loadArtworks = async (categoryId) => {
    setLoadingArtworks(true);
    setError(null);
    try {
      const data = await getArtworksByCategory(token, categoryId);
      setArtworks(data);
    } catch (err) {
      setError(`Error loading artworks: ${err.message}`);
    } finally {
      setLoadingArtworks(false);
    }
  };

  const handleCreateArtwork = async (artworkData) => {
    try {
      await createArtwork(token, selectedCategory._id, artworkData);
      await loadArtworks(selectedCategory._id);
      setEditingArtwork(null);
    } catch (err) {
      setError(`Error creating artwork: ${err.message}`);
    }
  };

  const handleUpdateArtwork = async (artworkId, artworkData) => {
    try {
      await updateArtwork(token, selectedCategory._id, artworkId, artworkData);
      await loadArtworks(selectedCategory._id);
      setEditingArtwork(null);
    } catch (err) {
      setError(`Error updating artwork: ${err.message}`);
    }
  };

  const handleDeleteArtwork = async (artworkId) => {
    if (!window.confirm('Are you sure you want to delete this artwork?')) return;

    try {
      await deleteArtworkById(token, selectedCategory._id, artworkId);
      await loadArtworks(selectedCategory._id);
    } catch (err) {
      setError(`Error deleting artwork: ${err.message}`);
    }
  };

  const handleCancelEdit = () => {
    setEditingArtwork(null);
  };

  if (loadingCategories) {
    return (
      <div className="loading">Loading categories...</div>
    );
  }

  if (error) {
    return (
      <div className="error">{error}</div>
    );
  }

  return (
    <div className="artwork-management">
      <h2>Gestión de obras de arte</h2>
      <div className="category-selector">
        <select
          value={selectedCategory?._id || ''}
          onChange={(e) =>
            setSelectedCategory(categories.find((c) => c._id === e.target.value))
          }
        >
          {categories.map((category) => (
            <option key={category._id} value={category._id}>
              {category.title}
            </option>
          ))}
        </select>
      </div>
      <ArtworkForm
        onSubmit={editingArtwork
          ? (data) => handleUpdateArtwork(editingArtwork._id, data)
          : handleCreateArtwork}
        initialData={editingArtwork}
        onCancel={handleCancelEdit}
      />
      {loadingArtworks ? (
        <div className="loading">Cargando obras de arte...</div>
      ) : (
        <div className="artwork-list">
          {artworks.map((artwork) => (
            <div key={artwork._id} className="artwork-item">
              <img src={artwork.images[0]} alt={artwork.title} />
              <div className="artwork-details">
                <h3>{artwork.title}</h3>
                <p>{artwork.description}</p>
              </div>
              <div className="artwork-actions">
                <button onClick={() => setEditingArtwork(artwork)}>Editar</button>
                <button onClick={() => handleDeleteArtwork(artwork._id)}>Eliminar</button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ArtworkManagement;
