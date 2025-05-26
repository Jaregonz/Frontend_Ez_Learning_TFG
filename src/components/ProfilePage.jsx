import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import "../App.css";
import "../styles/style.css";
import "../styles/footer.css";
import "../styles/header.css";
import Header from "./Header";
import Footer from "./Footer";

const ProfilePage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const user = location.state?.user;

  const [profesorInfo, setProfesorInfo] = useState(null);
  const [mejoresTests, setMejoresTests] = useState([]);

  const formateFecha = (fecha) => {
    if (!fecha) return "";
    const date = new Date(fecha);
    return date.toLocaleDateString("es-ES", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    });
  };

  useEffect(() => {
    if (!user) return;
    const token = sessionStorage.getItem("token");
    if (user.idProfesor) {
      fetch(`http://localhost:8080/usuarios/id/${user.idProfesor}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
        .then((res) => {
          if (!res.ok) {
            throw new Error("Error al obtener el profesor");
          }
          return res.json();
        })
        .then((data) => {
          setProfesorInfo(data);
        })
        .catch((error) => {
          console.error("Error al obtener el profesor:", error);
        });
    }

    if (user.id) {
      fetch(`http://localhost:8080/puntuaciones/usuario/${user.id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
        .then((res) => {
          if (!res.ok) {
            throw new Error("Error al obtener los tests");
          }
          return res.json();
        })
        .then((puntuaciones) => {
          console.log("Puntuaciones obtenidas:", puntuaciones);
          const puntuacionesConPorcentaje = puntuaciones.map((puntuacion) => {
            const [obtenidasStr, totalStr] = puntuacion.puntuacion.split("/");
            const obtenidas = Number(obtenidasStr) || 0;
            const total = Number(totalStr) || puntuacion.totalPreguntas || 0;
            const porcentaje = total > 0 ? (obtenidas / total) * 100 : 0;

            return {
              ...puntuacion,
              porcentaje,
              obtenidas,
              total,
            };
          });

          const top5 = puntuacionesConPorcentaje
            .sort((a, b) => b.porcentaje - a.porcentaje)
            .slice(0, 5);
          console.log("Top 5 tests:", top5);
          setMejoresTests(top5);
        })
        .catch((error) => {
          console.error("Error al obtener los tests:", error);
        });
    }
  }, [user]);
  if (!user) {
    return <p>Cargando los datos del perfil...</p>;
  }

  return (
    <div className="ProfilePage">
      <Header />
      <main className="main-profile">
        <div className="profile-container">
          <div className="profile-photo">
            <img src={user.imagenPerfil} alt="Foto de perfil" />
            <button
              className="boton"
              onClick={() => navigate("/edit-user", { state: { user } })}
            >
              EDITAR PERFIL
            </button>
          </div>

          <div className="profile-details">
            <h1>
              PERFIL<span></span>
            </h1>
            <div className="details-grid">
              <div>
                <span className="semi-title">NOMBRE:</span> {user.nombre}
              </div>
              <div>
                <span className="semi-title">APELLIDOS:</span> {user.apellidos}
              </div>
              <div>
                <span className="semi-title">CORREO ELECTRÓNICO:</span>{" "}
                {user.correoElectronico}
              </div>
              <div>
                <span className="semi-title">FECHA DE NACIMIENTO:</span>{" "}
                {formateFecha(user.fechaNacimiento)}
              </div>
              <div>
                <span className="semi-title">PROFESOR:</span>{" "}
                {user.idProfesor
                  ? profesorInfo
                    ? `${profesorInfo.nombre} ${profesorInfo.apellidos}`
                    : "Cargando..."
                  : "USUARIO PROFESOR"}
              </div>
              <div>
                <span className="semi-title">NIVEL:</span>{" "}
                {user.nivel
                  ? user.nivel !== null
                    ? `${user.nivel}`
                    : "Cargando..."
                  : "C1 (Profesor)"}
              </div>
            </div>
          </div>
        </div>
        <div className="results-container">
          <h1>
            MEJORES RESULTADOS<span></span>
          </h1>
          {mejoresTests.length === 0 ? (
            <p>No hay resultados disponibles.</p>
          ) : (
            mejoresTests.map((test, index) => (
              <div className="result" key={index}>
                <div>
                  <span className="semi-title">TÍTULO:</span> {test.titulo}
                </div>
                <div>
                  <span className="semi-title">NIVEL:</span> {test.nivel}
                </div>
                <div>
                  <span className="semi-title">TIPO:</span> {test.tipo}
                </div>
                <div>
                  <span className="semi-title">PUNTUACIÓN:</span>{" "}
                  {`${test.obtenidas}/${test.total} (${Math.round(test.porcentaje)}%)`}
                </div>
              </div>
            ))
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default ProfilePage;
