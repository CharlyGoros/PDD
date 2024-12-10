import { useEffect, useState } from 'react';
import { fetchCategories } from '../services/api';
import CategoryCard from '../components/CategoryCard/CategoryCard';

function Home() {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadCategories = async () => {
      try {
        const data = await fetchCategories();
        setCategories(data);
      } catch (err) {
        setError('Failed to load categories');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    loadCategories();
  }, []);

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
      <header className="text-center mb-5">
        <h1 className="display-4 text-dark">Welcome to Our Museum</h1>
        <p className="text-muted fs-5">
          Explore our diverse collection of artworks and exhibitions
        </p>
      </header>
      <div className="row g-4">
        {categories.map((category) => (
          <div className="col-12 col-sm-6 col-md-4 col-lg-3" key={category._id}>
            <CategoryCard category={category} />
          </div>
        ))}
      </div>
    </div>
  );
}

export default Home;
