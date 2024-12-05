import React from 'react';
import ReactDOM from 'react-dom';
import App from './App'; // Importa el componente principal
import './styles.css'; // Importa el CSS global

ReactDOM.render(
    <React.StrictMode>
        <App />
    </React.StrictMode>,
    document.getElementById('root') // Renderiza en el <div id="root"> del index.html
);
