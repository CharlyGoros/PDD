import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import './CategoryDetails.css';
import { getCategoryById } from '../../services/api';
import useAuth from '../../hooks/useAuth';

const CategoryDetails = () => {
    const { categoryId } = useParams();
    const [category, setCategory] = useState('');
    const [artworks, setArtworks] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const { token } = useAuth();

    useEffect(() => {
        const fetchArtworks = async () => {
            try {
                const category = await getCategoryById(categoryId);
                setCategory(category['data']);
                setArtworks(category['data']['artworks'] ?? []);
            } catch (err) {
                setError(`Failed to fetch artworks. ${err}`);
            } finally {
                setLoading(false);
            }
        };

        fetchArtworks();
    }, [categoryId, token]);

    if (loading) {
        return (
            <div className="d-flex justify-content-center align-items-center vh-100">
                <div className="spinner-border text-primary" role="status">
                    <span className="visually-hidden">Loading...</span>
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="alert alert-danger text-center" role="alert">
                {error}
            </div>
        );
    }

    return (
        <div className="container my-5">
            {/* Imagen de fondo con el título */}
            <div className="category-header position-relative mb-5">
                <img
                    src={category.image}
                    alt={category.title}
                    className="img-fluid category-header-image"
                />
                <div className="category-title-overlay">
                    <h1 className="category-title">{category.title}</h1>
                </div>
            </div>

            {/* Obras de Arte */}
            <h2 className="text-center mb-5 text-light">Nuestras Obras De Arte</h2>
            <div className="row g-4">
                {artworks.map((artwork) => (
                    <div className="col-md-6 col-lg-4" key={artwork._id}>
                        <div className="card artwork-card shadow-sm">
                            <div id={`carousel-${artwork._id}`} className="carousel slide" data-bs-ride="carousel">
                                <div className="carousel-inner">
                                    {artwork.images.map((image, index) => (
                                        <div
                                            key={index}
                                            className={`carousel-item ${index === 0 ? 'active' : ''}`}
                                        >
                                            <img
                                                src={image}
                                                className="d-block w-100 artwork-image"
                                                alt={artwork.title}
                                            />
                                        </div>
                                    ))}
                                </div>
                                <button
                                    className="carousel-control-prev"
                                    type="button"
                                    data-bs-target={`#carousel-${artwork._id}`}
                                    data-bs-slide="prev"
                                >
                                    <span className="carousel-control-prev-icon"></span>
                                    <span className="visually-hidden">Previous</span>
                                </button>
                                <button
                                    className="carousel-control-next"
                                    type="button"
                                    data-bs-target={`#carousel-${artwork._id}`}
                                    data-bs-slide="next"
                                >
                                    <span className="carousel-control-next-icon"></span>
                                    <span className="visually-hidden">Next</span>
                                </button>
                            </div>
                            <div className="card-body text-center">
                                <h5 className="card-title text-uppercase">{artwork.title}</h5>
                                <p className="card-text">{artwork.description}</p>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default CategoryDetails;
