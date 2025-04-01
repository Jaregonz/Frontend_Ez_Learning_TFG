import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../App.css';
import '../styles/style.css';
import '../styles/footer.css';
import '../styles/header.css';
function HomePage() {
  return (
    <div className="HomePage">
        <header>
            <a href="./home.html">
                <div class="logo">
                    <img src="./img/Icono EzLearning.png" alt="Logo"/>
                </div>
            </a>  
            <nav>
                <ul>
                    <li><a href="./tests.html">TESTS</a></li>
                    <li><a href="./404.html">EX&Aacute;MENES</a></li>
                    <li><a href="./profile.html">PERFIL</a></li>
                    <li><a href="./landing_page.html">CERRAR SESI&Oacute;N</a></li>
                </ul>
            </nav>  
    </header>
    <main class="main-home">
        <img src="./img/imagen-home.png" alt="Imagen de bienvenida" class="illustration"/>
        <div class="bottom-buttons">
            <h1>¿Qué te apetece practicar hoy?</h1>
        
            <div class="options">
                <a href="./tests.html">
                    <button class="boton">
                        TESTS
                    </button>
                </a>
                <img src="./img/buho.svg" alt="Owlie" class="logo-owlie"/>
                <a href="./404.html">
                    <button class="boton">
                        EXÁMENES
                    </button>
                </a>
            </div>
        </div>
    </main>
    <footer>
        <div class="menu">
            <a href="./home.html">Inicio</a>
            <a href="./404.html">Sobre nosotros</a>
            <a href="./contact.html">Contáctanos</a>
            <a href="./404.html">Preguntas Frecuentes</a>
          </div>
    
        <div class="social-icons">
            <img src="./img/logos-footerpng.png"/>
        </div>
    
        <div class="footer-bottom">
            <div class="language">
                <a href="#">Español</a>
                <a href="#">Inglés</a>
                <a href="#">Francés</a>
            </div>
            <div class="rights">
                Non Copyrighted © 2024 Uploaded by EZ Learning
            </div>
        </div>
      </footer>
    </div>
  );
}

export default HomePage;
