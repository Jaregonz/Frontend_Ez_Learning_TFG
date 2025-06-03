import { useNavigate } from "react-router-dom";
import "../App.css";
import "../styles/style.css";
import "../styles/footer.css";
import "../styles/header.css";
import Header from "./Header";
import Footer from "./Footer";

function ProfesorHomePage() {
  const navigate = useNavigate();
  const handleCrearTest = () => {
    navigate("/create-test");
  };
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
  const handleClickAlumnosList = () => {
    const token = sessionStorage.getItem("token");
    if (token) {
      const user = sessionStorage.getItem("user");
      const userData = JSON.parse(user);
      const profesorId = userData.id;
      navigate("/alumnos");
    } else {
      alert(
        "La sesión ha expirado o no se ha iniciado sesión. Por favor, inicie sesión nuevamente."
      );
    }
  }

  return (
    <div className="ProfesorDashboardPage">
      <Header />
      <main className="main-profesor-dashboard">
        <div className="dashboard">
          <div className="owl-image">
            <img src="./img/sided-buho.svg" alt="Owlie" />
          </div>
          <div className="welcome-section">
            <h1>
              BIENVENIDO PROFESOR, <br /> ¿QUÉ DESEAS HACER HOY?
            </h1>
            <button className="boton" onClick={handleCrearTest}>
              CREAR TESTS
            </button>
            <button className="boton" onClick={handleClickAlumnosList}>VER DATOS DEL ALUMNADO</button>
            <button className="boton" onClick={handleNuevoExamen}>AGREGAR NUEVO EXAMEN</button>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}

export default ProfesorHomePage;
