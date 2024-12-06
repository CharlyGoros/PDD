import PropTypes from 'prop-types';
import './ArtworkSection.css';

const ArtworkSection = ({ artwork, collectionId }) => {
  return (
    <section id={`artwork-${collectionId}`} className="artwork-section">
      {artwork.map((piece, index) => (
        <div key={piece.id} className={`artwork-item ${index % 2 === 0 ? 'left' : 'right'}`}>
          <div className="artwork-image">
            <img src={piece.imageUrl} alt={piece.title} />
          </div>
          <div className="artwork-content">
            <h3>{piece.title}</h3>
            <p>{piece.description}</p>
          </div>
        </div>
      ))}
    </section>
  );
};

ArtworkSection.propTypes = {
  artwork: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      title: PropTypes.string.isRequired,
      description: PropTypes.string.isRequired,
      imageUrl: PropTypes.string.isRequired,
    })
  ).isRequired,
  collectionId: PropTypes.string.isRequired,
};

export default ArtworkSection;