import React, { useState, useEffect } from "react";
import "./GalleryPage.css";
import categoriesData from "./categories.json"; // Importamos el archivo JSON

const GalleryPage = () => {
    const [collections, setCollections] = useState([]);

    useEffect(() => {
        // Simulamos una carga inicial con datos del JSON
        const fetchCollections = async () => {
            // Convertimos los datos del JSON al formato de la clase Category
            const formattedCollections = categoriesData.map(
                item => new Category(item)
            );
            setCollections(formattedCollections);
        };

        fetchCollections();
    }, []);

    return (
        <div className="gallery-page">
            <h1 className="gallery-title">Collection Themes</h1>
            <div className="gallery-grid">
                {collections.map(collection => (
                    <div className="card" key={collection._id}>
                        <img
                            src={collection.image}
                            alt={collection.title}
                            className="card-image"
                        />
                        <div className="card-content">
                            <h2 className="card-title">{collection.title}</h2>
                            <p className="card-description">{collection.description}</p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

// Clase Category para formatear los datos
class Category {
    constructor({ _id, title, description, image, artWorks }) {
        this._id = _id;
        this.title = title;
        this.description = description;
        this.image = image;
        this.artWorks = artWorks || [];
    }
}

export default GalleryPage;
