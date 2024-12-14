import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import './ArtworkForm.css';

const ArtworkForm = ({ onSubmit, initialData }) => {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    images: [''],
  });

  useEffect(() => {
    if (initialData) {
      setFormData({
        title: initialData.title,
        description: initialData.description,
        images: initialData.images,
      });
    }
  }, [initialData]);

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
    setFormData({ title: '', description: '', images: [''] });
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleImageChange = (index, value) => {
    const newImages = [...formData.images];
    newImages[index] = value;
    setFormData({ ...formData, images: newImages });
  };

  const addImageField = () => {
    setFormData({ ...formData, images: [...formData.images, ''] });
  };

  const removeImageField = (index) => {
    const newImages = formData.images.filter((_, i) => i !== index);
    setFormData({ ...formData, images: newImages });
  };

  return (
    <form onSubmit={handleSubmit} className="artwork-form">
      <div className="form-group">
        <label htmlFor="title">Title</label>
        <input
          type="text"
          id="title"
          name="title"
          value={formData.title}
          onChange={handleChange}
          required
        />
      </div>
      <div className="form-group">
        <label htmlFor="description">Description</label>
        <textarea
          id="description"
          name="description"
          value={formData.description}
          onChange={handleChange}
          required
        />
      </div>
      <div className="form-group">
        <label>Images</label>
        {formData.images.map((image, index) => (
          <div key={index} className="image-input-group">
            <input
              type="url"
              value={image}
              onChange={(e) => handleImageChange(index, e.target.value)}
              placeholder="Image URL"
              required
            />
            {formData.images.length > 1 && (
              <button
                type="button"
                onClick={() => removeImageField(index)}
                className="remove-image"
              >
                Remove
              </button>
            )}
          </div>
        ))}
        {formData.images.length < 4 && (
          <button
            type="button"
            onClick={addImageField}
            className="add-image"
          >
            Add Image
          </button>
        )}
      </div>
      <button type="submit" className="submit-button">
        {initialData ? 'Update Artwork' : 'Create Artwork'}
      </button>
    </form>
  );
};

ArtworkForm.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  initialData: PropTypes.shape({
    title: PropTypes.string,
    description: PropTypes.string,
    images: PropTypes.arrayOf(PropTypes.string),
  }),
};

export default ArtworkForm;