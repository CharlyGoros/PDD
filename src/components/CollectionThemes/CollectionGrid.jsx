import PropTypes from 'prop-types';
import CollectionCard from './CollectionCard';
import './CollectionGrid.css';

const CollectionGrid = ({ collections, onCollectionClick }) => {
  return (
    <section className="collection-grid">
      <h1>Collection Themes</h1>
      <div className="grid">
        {collections.map((collection) => (
          <CollectionCard
            key={collection.id}
            title={collection.title}
            description={collection.description}
            imageUrl={collection.imageUrl}
            onClick={() => onCollectionClick(collection.id)}
          />
        ))}
      </div>
    </section>
  );
};

CollectionGrid.propTypes = {
  collections: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      title: PropTypes.string.isRequired,
      description: PropTypes.string.isRequired,
      imageUrl: PropTypes.string.isRequired,
    })
  ).isRequired,
  onCollectionClick: PropTypes.func.isRequired
};

export default CollectionGrid;