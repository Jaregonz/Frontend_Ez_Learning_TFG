import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../App.css';
import '../styles/style.css';
import '../styles/footer.css';
import '../styles/header.css';
import Header from './Header';
import Footer from './Footer';

function ProfesorHomePage() {
    const navigate = useNavigate();
    const handleCrearTest = () => {
        navigate("/create-test");
    }
  return (
    <div className="ProfesorDashboardPage">
    <Header />
    <main className="main-profesor-dashboard">
        <div class="dashboard">
            <div class="owl-image">
                <img src="./img/sided-buho.svg" alt="Owlie"/>
            </div>
            <div class="welcome-section">
                <h1>BIENVENIDO PROFESOR, <br/> ¿QUÉ DESEAS HACER HOY?</h1>
                <button className='boton' onClick={handleCrearTest}>CREAR TESTS</button>
                <button className='boton'>VER DATOS DEL ALUMNADO</button>
                <button className='boton'>AGREGAR NUEVO EXAMEN</button>
            </div>
        </div>
    </main>
    <Footer />
    </div>
  );
}

export default ProfesorHomePage;
