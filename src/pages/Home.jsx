import { useEffect, useState } from 'react';
import { fetchCategories } from '../services/api';
import CategoryCard from '../components/CategoryCard/CategoryCard';
import './Home.css';

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

  if (loading) return <div className="loading">Loading...</div>;
  if (error) return <div className="error">{error}</div>;

  return (
    <div className="home">
      <header className="home-header">
        <h1>Welcome to Our Museum</h1>
        <p>Explore our diverse collection of artworks and exhibitions</p>
      </header>
      <section className="categories-grid">
        {categories.map(category => (
          <CategoryCard key={category._id} category={category} />
        ))}
      </section>
    </div>
  );
}

export default Home;