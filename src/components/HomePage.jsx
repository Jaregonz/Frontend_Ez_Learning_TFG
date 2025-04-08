import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../App.css';
import '../styles/style.css';
import '../styles/footer.css';
import '../styles/header.css';
import Header from './Header';
import Footer from './Footer';

function HomePage() {
    const navigate = useNavigate();
  return (
    <div className="HomePage">
    <Header />
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
    <Footer />
    </div>
  );
}

export default HomePage;
