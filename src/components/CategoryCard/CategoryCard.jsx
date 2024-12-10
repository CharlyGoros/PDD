import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import './CategoryCard.css';

const CategoryCard = ({ category }) => {
  return (
    <Link to={`/categories/${category._id}`} className="category-card">
      <div className="category-image-container">
        <img 
          src={category.image} 
          alt={category.title} 
          className="category-image"
        />
      </div>
      <div className="category-content">
        <h2 className="category-title">{category.title}</h2>
        <p className="category-description">{category.description}</p>
      </div>
    </Link>
  );
};

CategoryCard.propTypes = {
  category: PropTypes.shape({
    _id: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    image: PropTypes.string.isRequired,
  }).isRequired,
};

export default CategoryCard;