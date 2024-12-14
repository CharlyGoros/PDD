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
                const category = await getCategoryById( categoryId);
                setCategory(category['data']);
                setArtworks(category['data']['artworks'] ??[]);
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

    if (artworks.length === 0) {
        return (
            <div className="alert alert-info text-center" role="alert">
                No artworks found.
            </div>
        );
    }

    return (
        <div className="container my-5">
            <h1 className="text-center mb-5 text-light">{category.title}</h1>
            <div className='container-fluid mx-auto text-center'>
            <img src={category.image} alt={category.title} style={{width:'200px'}} /></div>
            <p className="text-center mb-5 text-light">{category.description}</p>
            <h2 className="text-center mb-5 text-light">Artworks</h2>
            <div className="row g-4">
                {artworks.map((artwork) => (
                    <div className="container" key={artwork._id}>
                        <div className="row align-items-center pb-3">
                            <div className="col-md-4">
                                <img
                                    src={artwork.images[0]}
                                    alt={artwork.title || 'Artwork image'}
                                    style={{ width: '200px', height: '200px', objectFit: 'cover' }}
                                />
                            </div>

                            <div className="col-md-8 text-light">
                                <h5 className="text-uppercase text-light">{artwork.title}</h5>
                                <p>{artwork.description}</p>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default CategoryDetails;
