import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../App.css';
import '../styles/style.css';
import '../styles/footer.css';
import '../styles/header.css';
function HomePage() {
    const navigate = useNavigate();
    const handleNavigateToTests = () => {
        const token = localStorage.getItem('jwtToken'); // Supongamos que el token se guarda en localStorage
        if (token) {
          navigate('/tests', { state: { token } });
        } else {
          alert('Por favor, inicie sesión para acceder a los tests.');
        }
      };
  return (
    <div className="HomePage">
        <header>
            <a href="./home.html">
                <div className="logo">
                    <img src="./img/Icono EzLearning.png" alt="Logo"/>
                </div>
            </a>  
            <nav>
                <ul>
                    <li><a href="" onClick={handleNavigateToTests}>TESTS</a></li>
                    <li><a href="./404.html">EX&Aacute;MENES</a></li>
                    <li><a href="./profile.html">PERFIL</a></li>
                    <li><a href="./landing_page.html">CERRAR SESI&Oacute;N</a></li>
                </ul>
            </nav>  
    </header>
    <main className="main-home">
        <img src="./img/imagen-home.png" alt="Imagen de bienvenida" className="illustration"/>
        <div className="bottom-buttons">
            <h1>¿Qué te apetece practicar hoy?</h1>
        
            <div className="options">
                <a href="./tests.html">
                    <button className="boton">
                        TESTS
                    </button>
                </a>
                <img src="./img/buho.svg" alt="Owlie" className="logo-owlie"/>
                <a href="./404.html">
                    <button className="boton">
                        EXÁMENES
                    </button>
                </a>
            </div>
        </div>
    </main>
    <footer>
        <div className="menu">
            <a href="./home.html">Inicio</a>
            <a href="./404.html">Sobre nosotros</a>
            <a href="./contact.html">Contáctanos</a>
            <a href="./404.html">Preguntas Frecuentes</a>
          </div>
    
        <div className="social-icons">
            <img src="./img/logos-footerpng.png"/>
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
    </div>
  );
}

export default HomePage;
