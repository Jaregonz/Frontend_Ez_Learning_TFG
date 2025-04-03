import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import '../App.css';
import '../styles/style.css';
import '../styles/footer.css';
import '../styles/header.css';

const TestsPage = () => {
    const [tests, setTests] = useState([]);
    const location = useLocation();
  
    useEffect(() => {
      const token = location.state?.token;
  
      if (token) {
        fetch('http://localhost:8080/tests/list', {
          method: 'GET',
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
          .then((response) => {
            if (!response.ok) {
              throw new Error('Error al obtener la lista de tests');
            }
            return response.json();
          })
          .then((data) => setTests(data))
          .catch((error) => console.error('Error:', error));
      } else {
        alert('La sesión ha expirado o no se ha iniciado sesión. Por favor, inicie sesión nuevamente.');
      }
    }, [location.state]);
    return (
        <div className="TestsPage">
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

            <div class="search-bar">
                    <input type="text" placeholder="Buscar"/>
                    <select>
                        <option value="">Tipo</option>
                        <option value="grammar">Grammar</option>
                        <option value="listening">Listening</option>
                        <option value="vocabulary">Vocabulary</option>
                    </select>
                    <select>
                        <option value="">Nivel</option>
                        <option value="A1">A1</option>
                        <option value="B1">B1</option>
                        <option value="B2">B2</option>
                        <option value="C1">C1</option>
                    </select>
                    <button><a className='search-filtro'>Filtrar</a></button>
            </div>

            <main class="main-tests">
            {tests.length > 0 ? (
                <table className="test-table">
                    <thead>
                    <tr>
                        <th>TÍTULO</th>
                        <th>NIVEL</th>
                        <th>TIPO</th>
                        <th>FINALIZADO</th>
                    </tr>
                    </thead>
                    <tbody>
                    {tests.map((test) => (
                        <tr key={test.id}>
                        <td><a href={`./test/${test.id}`}>{test.titulo}</a></td>
                        <td>{test.dificultad}</td>
                        <td>{test.tipo}</td>
                        {/*<td>{test.completed ? 'Sí' : 'No'}</td> */}
                        <td>---</td>
                        </tr>
                    ))}
                    </tbody>
                </table>
                ) : (
                <p>Cargando tests o no hay tests disponibles.</p>
        )}           


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
};

export default TestsPage;
