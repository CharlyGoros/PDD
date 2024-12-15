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
                <img src={category.image} alt={category.title} style={{ width: '200px' }} /></div>
            <p className="text-center mb-5 text-light">{category.description}</p>
            <h2 className="text-center mb-5 text-light">Nuestras Obras De Arte</h2>
            <div className="row g-4">
                {artworks.map((artwork) => (
                    <div className="container" key={artwork._id}>
                        <div className="row align-items-center pb-3">
                            <div className="col-md-4">
                                <div id="carouselExample" className="carousel slide">
                                    <div className="carousel-inner">

                                        {artwork.images.map((image, index) => (
                                            <div key={index} className={`carousel-item ${index === 0 ? 'active' : ''}`}>
                                                <img src={image} className="d-block w-100" alt={artwork.title} />
                                            </div>
                                        ))}


                                    </div>
                                    <button className="carousel-control-prev" type="button" data-bs-target="#carouselExample" data-bs-slide="prev">
                                        <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                                        <span className="visually-hidden">Previous</span>
                                    </button>
                                    <button className="carousel-control-next" type="button" data-bs-target="#carouselExample" data-bs-slide="next">
                                        <span className="carousel-control-next-icon" aria-hidden="true"></span>
                                        <span className="visually-hidden">Next</span>
                                    </button>
                                </div>

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
