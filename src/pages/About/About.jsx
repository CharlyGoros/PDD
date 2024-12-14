// about.jsx
import React from 'react';

const About = () => {
    return (
        <div className="container mt-5">
            <div className="row align-items-center">
                <div className="col-md-6">
                    <img
                        src="https://via.placeholder.com/500x300"
                        alt="Museo Humano"
                        className="img-fluid rounded shadow"
                    />
                </div>
                <div className="col-md-6">
                    <h2 className="text-primary">Sobre Nosotros</h2>
                    <p className="text-light mt-3">
                        El <strong>Museo Humano</strong> es un espacio dedicado a explorar y celebrar la diversidad de la expresión artística. Nuestro museo reúne una vasta colección de obras de arte que abarcan desde las épocas más antiguas hasta las manifestaciones contemporáneas.
                    </p>
                    <p className="text-light">
                        Creemos que el arte es un reflejo de la humanidad, y nuestro objetivo es brindar a cada visitante una experiencia única que inspire curiosidad, emoción y un profundo aprecio por las culturas de todo el mundo.
                    </p>
                    <p className="text-light">
                        Desde pinturas y esculturas clásicas hasta innovadoras instalaciones interactivas, el Museo Humano se esfuerza por mantenerse a la vanguardia de la creatividad y el conocimiento cultural.
                    </p>
                </div>
            </div>

            <div className="row mt-5">
                <div className="col">
                    <h3 className="text-secondary">Nuestra Misión</h3>
                    <p className="text-light">
                        Fomentar el entendimiento cultural y la apreciación artística a través de exposiciones dinámicas, programas educativos y actividades interactivas que acerquen el arte a todas las generaciones.
                    </p>
                </div>
                <div className="col">
                    <h3 className="text-secondary">Visítanos</h3>
                    <p className="text-light">
                        Estamos ubicados en el corazón de la ciudad, con fácil acceso y un entorno acogedor para todas las edades. Ven y descubre lo que hace único al Museo Humano.
                    </p>
                </div>
            </div>
        </div>
    );
};

export default About;