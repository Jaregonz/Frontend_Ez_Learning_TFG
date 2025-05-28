import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Header from "./Header";
import Footer from "./Footer";
import ModalEntregaExamen from "../modals/ModalEntregaExamen";
import "../styles/style.css";

export default function ExamenesPage() {
  const [examenes, setExamenes] = useState([]);
  const [examenSeleccionado, setExamenSeleccionado] = useState(null);
  const [role, setRole] = useState(sessionStorage.getItem("role"));
  const navigate = useNavigate();

  const handleNuevoExamen = () => {
    const token = sessionStorage.getItem("token");
    if (token) {
      navigate("/create-exam");
    } else {
      alert(
        "La sesión ha expirado o no se ha iniciado sesión. Por favor, inicie sesión nuevamente."
      );
    }
  };

  const handleExamenClick = (examen) => {
    if (role === "ROLE_ALUMNO") {
      setExamenSeleccionado(examen);
    } else if (role === "ROLE_PROFESOR") {
      navigate(`/entregas/${examen.id}`);
    }
  };

  const handleCerrarModal = () => {
    setExamenSeleccionado(null);
  };

  useEffect(() => {
    const token = sessionStorage.getItem("token");

    if (token) {
      fetch("http://localhost:8080/examenes", {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
        .then((response) => {
          if (!response.ok) {
            throw new Error("Error al obtener la lista de exámenes");
          }
          return response.json();
        })
        .then((data) => setExamenes(data))
        .catch((error) => console.error("Error:", error));
    } else {
      alert(
        "La sesión ha expirado o no se ha iniciado sesión. Por favor, inicie sesión nuevamente."
      );
    }
  }, []);

  return (
    <div className="ExamenesPage">
      <Header />
      <main className="main-examenes">
        <h1 className="titulo-examenes">EXÁMENES</h1>
        {examenes.length === 0 ? (
          <p>No hay exámenes disponibles.</p>
        ) : (
          <ul className="lista-examenes">
            {examenes.map((examen) => (
              <li
                key={examen.id}
                className="examen-item"
                onClick={() => handleExamenClick(examen)}
                style={{ cursor: "pointer" }}
              >
                <h3>{examen.titulo}</h3>
                <p>
                  Fecha límite:{" "}
                  {new Date(examen.fechaCierre).toLocaleDateString()}
                </p>
                <p className="subrayado">Haz clic para ver o entregar</p>
              </li>
            ))}
          </ul>
        )}
        {role === "ROLE_PROFESOR" && (
          <button className="boton" onClick={handleNuevoExamen}>
            CREAR NUEVO EXAMEN
          </button>
        )}

        {examenSeleccionado && (
          <ModalEntregaExamen
            examen={examenSeleccionado}
            onClose={handleCerrarModal}
          />
        )}
      </main>
      <Footer />
    </div>
  );
}
