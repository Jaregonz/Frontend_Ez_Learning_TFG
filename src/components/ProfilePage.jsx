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
    if (user?.profesor) {
      fetch(`http://localhost:8080/usuarios/${user.profesor}`)
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
  }, [user?.profesor]);

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
                {user.profesor
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
          <div className="result">
            <div>
              <span className="semi-title">TÍTULO:</span> Test 1: Present Simple
            </div>
            <div>
              <span className="semi-title">NIVEL:</span> B1
            </div>
            <div>
              <span className="semi-title">TIPO:</span> Grammar
            </div>
            <div>
              <span className="semi-title">PUNTUACIÓN:</span> 20/20
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default ProfilePage;
