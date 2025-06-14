import React from 'react';
import { useNavigate } from 'react-router-dom';
import "../App.css";
import "../styles/style.css";
import "../styles/footer.css";

const Footer = () => {
    const navigate = useNavigate();
    const handleClickAboutUs = () => {
        navigate('/about-us');
    }
    const handleClickHome = () => {
        navigate('/');
    }
    return (
        <footer>
            <div className="menu">
                <a onClick={handleClickHome}>Inicio</a>
                <a onClick={handleClickAboutUs}>Sobre nosotros</a>
                <a href="/contact">Contáctanos</a>
                <a href="/404">Preguntas Frecuentes</a>
            </div>

            <div className="social-icons">
                <img src="../img/logos-footerpng.png" alt="Redes sociales"/>
            </div>

            <div className="footer-bottom">
                <div className="language">
                    <a href="#">Español</a>
                    <a href="#">Inglés</a>
                    <a href="#">Francés</a>
                </div>
                <div className="rights">
                    Non Copyrighted © 2024 Uploaded by EZ Learning
                </div>
            </div>
        </footer>
    );
};

export default Footer;
