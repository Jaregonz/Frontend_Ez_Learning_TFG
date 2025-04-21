import React, { useState, useEffect } from "react";
import { jwtDecode } from "jwt-decode";
import { useNavigate, useParams } from "react-router-dom";
import "../App.css";
import "../styles/style.css";
import Header from "./Header";
import Footer from "./Footer";

function TestPage() {
  const navigate = useNavigate();
  const { id } = useParams();
  const [test, setTest] = useState(null);
  const [respuestasSeleccionadas, setRespuestasSeleccionadas] = useState({});
  const [tiempoRestante, setTiempoRestante] = useState(null);
  const [intervalId, setIntervalId] = useState(null);
  const [mostrarPopup, setMostrarPopup] = useState(false);
  const [puntuacionFinal, setPuntuacionFinal] = useState(null);

  useEffect(() => {
    const token = sessionStorage.getItem("token");
    fetch(`http://localhost:8080/tests/${id}`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((response) => {
        if (!response.ok) throw new Error("Error al cargar el test");
        return response.json();
      })
      .then((data) => {
        console.log("Datos del test:", data);
        setTest(data);
        setTiempoRestante(data.tiempo * 60);
      })
      .catch((error) => console.error("Error al obtener el test:", error));
  }, [id]);

  useEffect(() => {
    if (tiempoRestante !== null) {
      const tiempo = setInterval(() => {
        setTiempoRestante((prevTiempo) => {
          if (prevTiempo <= 1) {
            clearInterval(tiempo);
            handleSubmit();
            return 0;
          }
          return prevTiempo - 1;
        });
      }, 1000);
      setIntervalId(tiempo);

      return () => clearInterval(tiempo);
    }
  }, [tiempoRestante]);

  const handleSelect = (preguntaIndex, respuestaIndex) => {
    setRespuestasSeleccionadas((prevState) => ({
      ...prevState,
      [preguntaIndex]: respuestaIndex,
    }));
  };

  const calcularPuntuacion = () => {
    if (!test) return { correctas: 0, total: 0 };

    let correctas = 0;

    test.preguntas.forEach((pregunta, preguntaIndex) => {
      const respuestaCorrectaIndex = pregunta.respuestas.findIndex(
        (r) => r.esCorrecta
      );
      if (respuestasSeleccionadas[preguntaIndex] === respuestaCorrectaIndex) {
        correctas += 1;
      }
    });

    return { correctas, total: test.preguntas.length };
  };

  const handleSubmit = (e) => {
    if (e) e.preventDefault();
    clearInterval(intervalId);

    const { correctas, total } = calcularPuntuacion();
    const puntuacion = `${correctas}/${total}`;
    setPuntuacionFinal({ correctas, total });
    setMostrarPopup(true);
  };

  const enviarPuntuacion = () => {
    const token = sessionStorage.getItem("token");
    if (token && test && puntuacionFinal) {
      const decodedToken = jwtDecode(token);
      const user = decodedToken.sub;

      fetch(`http://localhost:8080/usuarios/${user}`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
        .then((response) => response.json())
        .then((data) => {
          const puntuacionData = {
            puntuacion: `${puntuacionFinal.correctas}/${puntuacionFinal.total}`,
            idUsuario: data.id,
            idTest: test.id,
          };

          fetch("http://localhost:8080/puntuaciones/submit-puntuacion", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify(puntuacionData),
          })
            .then((response) => {
              if (!response.ok)
                throw new Error("Error al enviar los resultados");
              return response.json();
            })
            .then((data) => {
              console.log("Respuesta del backend:", data);
              alert("¡Puntuación enviada correctamente!");
              setMostrarPopup(false);
              navigate("/home");

            })
            .catch((error) =>
              console.error("Error al enviar los datos:", error)
            );
        })
        .catch((error) =>
          console.error("Error al obtener los datos del usuario:", error)
        );
    }
  };

  const formatearTiempo = (segundos) => {
    const minutos = Math.floor(segundos / 60);
    const segundosRestantes = segundos % 60;
    return `${String(minutos).padStart(2, "0")}:${String(
      segundosRestantes
    ).padStart(2, "0")}`;
  };

  if (!test) return <div className="test-container">Cargando test...</div>;

  return (
    <div className="TestPageScreen">
      <Header />
      <div className="test-container">
        <h1>{test.titulo}</h1>
        {tiempoRestante !== null && (
          <div className="temporizador">
            Tiempo restante: {formatearTiempo(tiempoRestante)}
          </div>
        )}
        <form onSubmit={handleSubmit}>
          {test.preguntas.map((pregunta, preguntaIndex) => (
            <div className="pregunta-container" key={preguntaIndex}>
              <div className="question">
                <p>
                  <strong>{preguntaIndex + 1}.</strong>{" "}
                  {pregunta.contenidoPregunta}
                </p>
                {pregunta.respuestas.map((respuesta, respuestaIndex) => (
                  <label key={respuestaIndex} className="respuesta-label">
                    <input
                      type="radio"
                      name={`pregunta-${preguntaIndex}`}
                      value={respuestaIndex}
                      checked={
                        respuestasSeleccionadas[preguntaIndex] ===
                        respuestaIndex
                      }
                      onChange={() =>
                        handleSelect(preguntaIndex, respuestaIndex)
                      }
                    />
                    <span>{respuesta.contenido}</span>
                  </label>
                ))}
              </div>
            </div>
          ))}
          <button className="boton" type="submit">
            FINALIZAR TEST
          </button>
        </form>
        {mostrarPopup && puntuacionFinal && (
          <div className="popup-overlay">
            <div className="test-popup">
              <h2>¡Test finalizado!</h2>
              <p>
                Obtuviste {puntuacionFinal.correctas} de {puntuacionFinal.total}{" "}
                respuestas correctas.
              </p>

              <div className="options">
                <img src="../img/buho.svg" alt="Owlie" className="logo-owlie" />

                <div className="botones">
                  <button
                    className="boton"
                    onClick={() => {
                      setRespuestasSeleccionadas({});
                      setTiempoRestante(test.tiempo * 60);
                      setMostrarPopup(false);
                      setPuntuacionFinal(null);
                    }}
                  >
                    REINICIAR TEST
                  </button>

                  <button className="boton" onClick={enviarPuntuacion}>
                    FINALIZAR
                  </button>
                </div>
              </div>

            </div>
          </div>
        )}
      </div>
      <Footer />
    </div>
  );
}

export default TestPage;
