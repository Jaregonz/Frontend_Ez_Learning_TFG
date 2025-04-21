import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import '../App.css';
import '../styles/style.css';
import '../styles/footer.css';
import '../styles/header.css';
import Header from "./Header";
import Footer from "./Footer";

function StartTestScreen() {
    const { id } = useParams();
    const [test, setTest] = useState(null);
    const navigate = useNavigate();
  
    useEffect(() => {
      const token = sessionStorage.getItem("token");
      fetch(`http://localhost:8080/tests/${id}`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
        .then((res) => {
          if (!res.ok) throw new Error("Error al cargar el test");
          return res.json();
        })
        .then((data) => setTest(data))
        .catch((err) => console.error(err));
    }, [id]);

    const handleClickComenzar = () => {
      console.log(test)
      navigate(`/test/${id}`)
    }
  return (
    <div className="StartTestScreen">
    <Header />
    <main className="main-start-test">
        <div className="student-image">
        <img src="../img/imagenEstudiante.jpg" alt="Estudiante con auriculares y portátil" />
        </div>
        {test ? (
        <div className="test-box">
        <h2>{test.titulo}</h2>
        <ul>
            <li><strong>NIVEL</strong><span>{test.dificultad}</span></li>
            <li><strong>TIPO</strong><span>{test.tipo}</span></li>
            <li><strong>NÚMERO DE PREGUNTAS</strong><span>{test.cantidadPreguntas} preguntas</span></li>
            <li><strong>TIEMPO PARA REALIZARLO</strong><span>{test.tiempo} minutos</span></li>
        </ul>
        <button className="boton" onClick={handleClickComenzar}>COMENZAR</button>
        </div>)
        : (
            <p>Cargando test...</p>
    )}
    </main>
    <Footer />
    </div>
  );
}

export default StartTestScreen;