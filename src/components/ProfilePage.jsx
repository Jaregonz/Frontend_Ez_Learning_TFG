import React from "react";
import { useNavigate, useLocation } from "react-router-dom";
import "../App.css";
import "../styles/style.css";
import "../styles/footer.css";
import "../styles/header.css";
import Header from "./Header";
import Footer from "./Footer";

const ProfilePage = () => {
  const location = useLocation();
  const user = location.state?.user;

  const formateFecha = (fecha) => {
    if (!fecha) return "";
    const date = new Date(fecha);
    return date.toLocaleDateString("es-ES", {
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
    });
};

  if(!user){
    return <p>Cargando los datos del perfil...</p>;
  }
  return (
    <div className="ProfilePage">
    <Header />
    <main className="main-profile">
        <div className="profile-container">
            <div className="profile-photo">
                <img src={user.imagenPerfil} alt="Foto de perfil" />
                <a href="./404.html">
                    <button className="boton">EDITAR PERFIL</button>
                </a>
        </div>
    
        <div className="profile-details">
            <h1>PERFIL<span></span></h1>
                <div className="details-grid">
                    <div><span class="semi-title">NOMBRE:</span> {user.nombre}</div>
                    <div><span class="semi-title">APELLIDOS:</span>{user.apellidos}</div>
                    <div><span className="semi-title">CORREO ELECTRÓNICO:</span> {user.correoElectronico}</div>
                    <div><span className="semi-title">FECHA DE NACIMIENTO:</span> {formateFecha(user.fechaNacimiento)}</div>
                    <div><span className="semi-title">PROFESOR:</span> María del Carmen Oñatez</div>
                    <div><span className="semi-title">NIVEL:</span> {user.nivel}</div>
                </div>
            </div>
        </div>
    
        <div className="results-container">
            <h1>MEJORES RESULTADOS<span></span></h1>
            <div className="result">
                <div><span className="semi-title">TÍTULO:</span> Test 1: Present Simple</div>
                <div><span className="semi-title">NIVEL:</span> B1</div>
                <div><span className="semi-title">TIPO:</span> Grammar</div>
                <div><span className="semi-title">PUNTUACIÓN:</span> 20/20</div>
            </div>
            <div className="result">
                <div><span className="semi-title">TÍTULO:</span> Test 2: Past Perfect</div>
                <div><span className="semi-title">NIVEL:</span> B2</div>
                <div><span className="semi-title">TIPO:</span> Grammar</div>
                <div><span className="semi-title">PUNTUACIÓN:</span> 18/20</div>
            </div>
            <div className="result">
                <div><span className="semi-title">TÍTULO:</span> Test 5: Co-working Slang</div>
                <div><span className="semi-title">NIVEL:</span> C1</div>
                <div><span className="semi-title">TIPO:</span> Vocabulary</div>
                <div><span className="semi-title">PUNTUACIÓN:</span> 18/25</div>
            </div>
        </div>
    </main>
    <Footer />
    </div>
    );
  
};

export default ProfilePage;
