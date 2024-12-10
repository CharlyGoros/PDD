import PropTypes from 'prop-types';
import './ArtworkGrid.css';

const ArtworkGrid = ({ artworks }) => {
  return (
    <div className="artwork-grid">
      {artworks.map((artwork) => (
        <div key={artwork._id} className="artwork-item">
          <div className="artwork-image-container">
            <img 
              src={artwork.images[0]} 
              alt={artwork.title} 
              className="artwork-image"
            />
          </div>
          <div className="artwork-content">
            <h3 className="artwork-title">{artwork.title}</h3>
            <p className="artwork-description">{artwork.description}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

ArtworkGrid.propTypes = {
  artworks: PropTypes.arrayOf(
    PropTypes.shape({
      _id: PropTypes.string.isRequired,
      title: PropTypes.string.isRequired,
      description: PropTypes.string.isRequired,
      images: PropTypes.arrayOf(PropTypes.string).isRequired,
    })
  ).isRequired,
};

export default ArtworkGrid;