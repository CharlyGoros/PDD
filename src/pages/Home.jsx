import { useState, useEffect } from 'react';
import CollectionGrid from '../components/CollectionThemes/CollectionGrid';
import ArtworkSection from '../components/Artwork/ArtworkSection';
import { fetchCollections } from '../services/api';

function Home() {
  const [collections, setCollections] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadCollections = async () => {
      try {
        const mockData = [
          {
            id: '1',
            title: 'Renaissance Art',
            description: 'Explore the rebirth of art and culture from 14th to 17th century Europe.',
            imageUrl: '/renaissance.jpg',
            artwork: [
              {
                id: 'r1',
                title: 'The Birth of Venus',
                description: 'A masterpiece of the Italian Renaissance, depicting Venus emerging from the sea.',
                imageUrl: '/venus.jpg'
              },
              {
                id: 'r2',
                title: 'The Last Supper',
                description: 'One of the most famous religious works of the Renaissance period.',
                imageUrl: '/supper.jpg'
              }
            ]
          },
          {
            id: '2',
            title: 'Modern Abstract',
            description: 'Contemporary abstract works that challenge traditional artistic conventions.',
            imageUrl: '/abstract.jpg',
            artwork: [
              {
                id: 'a1',
                title: 'Composition VIII',
                description: 'A vibrant exploration of geometric shapes and colors.',
                imageUrl: '/composition.jpg'
              },
              {
                id: 'a2',
                title: 'Color Field Study',
                description: 'An immersive experience in pure color and form.',
                imageUrl: '/colorfield.jpg'
              }
            ]
          },
          {
            id: '3',
            title: 'Asian Art',
            description: 'Traditional and contemporary artworks from across Asia.',
            imageUrl: '/asian.jpg',
            artwork: [
              {
                id: 'as1',
                title: 'Waves of Kanagawa',
                description: 'The iconic woodblock print of a great wave off Kanagawa.',
                imageUrl: '/wave.jpg'
              },
              {
                id: 'as2',
                title: 'Ming Vase',
                description: 'A pristine example of Ming Dynasty porcelain artistry.',
                imageUrl: '/vase.jpg'
              }
            ]
          },
          {
            id: '4',
            title: 'Impressionism',
            description: 'Light and color through the eyes of the Impressionist masters.',
            imageUrl: '/impressionism.jpg',
            artwork: [
              {
                id: 'i1',
                title: 'Water Lilies',
                description: 'Monet\'s serene depiction of his garden at Giverny.',
                imageUrl: '/waterlilies.jpg'
              },
              {
                id: 'i2',
                title: 'Starry Night',
                description: 'Van Gogh\'s visionary night sky over Saint-Rémy.',
                imageUrl: '/starrynight.jpg'
              }
            ]
          },
          {
            id: '5',
            title: 'Ancient Civilizations',
            description: 'Artifacts and artworks from the cradles of human civilization.',
            imageUrl: '/ancient.jpg',
            artwork: [
              {
                id: 'ac1',
                title: 'Egyptian Hieroglyphs',
                description: 'Ancient Egyptian wall paintings telling stories of pharaohs.',
                imageUrl: '/hieroglyphs.jpg'
              },
              {
                id: 'ac2',
                title: 'Greek Amphora',
                description: 'Classical Greek pottery with mythological scenes.',
                imageUrl: '/amphora.jpg'
              }
            ]
          },
          {
            id: '6',
            title: 'Contemporary Photography',
            description: 'Modern photographic works pushing the boundaries of the medium.',
            imageUrl: '/photography.jpg',
            artwork: [
              {
                id: 'p1',
                title: 'Urban Landscapes',
                description: 'Contemporary views of city life and architecture.',
                imageUrl: '/urban.jpg'
              },
              {
                id: 'p2',
                title: 'Portrait Series',
                description: 'Intimate portraits capturing human diversity.',
                imageUrl: '/portraits.jpg'
              }
            ]
          }
        ];
        
        setCollections(mockData);
      } catch (err) {
        setError('Failed to load collections');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    loadCollections();
  }, []);

  const handleCollectionClick = (collectionId) => {
    const element = document.getElementById(`artwork-${collectionId}`);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  if (loading) return <div className="loading">Loading...</div>;
  if (error) return <div className="error">{error}</div>;

  return (
    <div>
      <CollectionGrid collections={collections} onCollectionClick={handleCollectionClick} />
      {collections.map(collection => (
        <ArtworkSection 
          key={collection.id}
          artwork={collection.artwork}
          collectionId={collection.id}
        />
      ))}
    </div>
  );
}

export default Home;