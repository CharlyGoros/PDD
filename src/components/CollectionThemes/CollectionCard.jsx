import PropTypes from 'prop-types';
import './CollectionCard.css';

const CollectionCard = ({ title, description, imageUrl, onClick }) => {
  return (
    <div className="collection-card" onClick={onClick}>
      <img src={imageUrl} alt={title} className="collection-image" />
      <h2>{title}</h2>
      <p>{description}</p>
    </div>
  );
};

CollectionCard.propTypes = {
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  imageUrl: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired
};

export default CollectionCard;