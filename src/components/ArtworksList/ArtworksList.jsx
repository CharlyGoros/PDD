import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import './ArtworksList.css';

const ArtworksList = () => {
    const { categoryId } = useParams();
    const [artworks, setArtworks] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchArtworks = async () => {
            try {
                // Simular llamada a API (reemplaza con tu API real)
                const response = await fetch(`/api/categories/${categoryId}/artworks`);
                const data = await response.json();
                setArtworks(data);
            } catch (err) {
                setError('Failed to fetch artworks');
            } finally {
                setLoading(false);
            }
        };

        fetchArtworks();
    }, [categoryId]);

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
            <h1 className="text-center mb-5">Artworks</h1>
            <div className="row g-4">
                {artworks.map((artwork) => (
                    <div className="col-12 col-md-6" key={artwork._id}>
                        <div className="card shadow-sm">
                            <img
                                src={artwork.images[0]}
                                className="card-img-top"
                                alt={artwork.title}
                            />
                            <div className="card-body">
                                <h5 className="card-title">{artwork.title}</h5>
                                <p className="card-text">{artwork.description}</p>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default ArtworksList;
