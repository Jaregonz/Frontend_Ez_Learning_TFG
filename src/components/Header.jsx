import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import '../App.css';
import '../styles/style.css';
import '../styles/header.css';

const Header = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const token = location.state?.token;

    const handleLogout = () => {
        sessionStorage.removeItem("token");
        navigate("/");
    };

    const handleProfileClick = () => {
        const token = sessionStorage.getItem("token");
        if (!token) {
            alert('Sesión expirada. Inicia sesión nuevamente.');
            return;
        }
    
        fetch(`http://localhost:8080/usuarios/perfil-usuario`, {
            method: 'GET',
            headers: {
                Authorization: `Bearer ${token}`,
            },
        })
            .then(response => {
                if (!response.ok) throw new Error('Error al obtener datos del usuario');
                return response.json();
            })
            .then(userData => {
                navigate('/profile', { state: { user: userData, token } });
            })
            .catch(error => console.error('Error al obtener perfil:', error));
    };


    const handleNavigateToTests = () => {
        const token = sessionStorage.getItem("token"); 
        if (token) {
          navigate('/tests', { state: { token } });
        } else {
          alert('Por favor, inicie sesión para acceder a los tests.');
        }
      };

      const handleNavigateHome = () => {
        const token = sessionStorage.getItem("token"); 
        const decodedToken = JSON.parse(atob(token.split(".")[1]));
        const userRole = decodedToken.roles[0];
        sessionStorage.setItem("role", userRole);
        if (userRole === "ROLE_ALUMNO") {
            navigate("/home");
        } else {
            navigate("/teacher-dashboard"); 
        }
      };

    return (
        <header>
            <a onClick={handleNavigateHome}>
                <div className="logo">
                    <img src="./img/Icono EzLearning.png" alt="Logo" />
                </div>
            </a>
            <nav>
                <ul>
                    <li>
                        <a onClick={handleNavigateToTests} className="profile-button">TESTS</a>
                    </li>
                    <li><a href="/404">EXÁMENES</a></li>
                    <li>
                        <a onClick={handleProfileClick} className="profile-button">PERFIL</a>
                    </li>
                    <li><a onClick={handleLogout}>CERRAR SESIÓN</a></li>
                </ul>
            </nav>
        </header>
    );
};

export default Header;