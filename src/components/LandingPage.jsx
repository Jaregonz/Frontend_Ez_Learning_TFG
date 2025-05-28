import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../App.css";
import "../styles/style.css";
import "../styles/footer.css";
import "../styles/header.css";
function LandingPage() {
  const [showPopup, setShowPopup] = useState(false);
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:8080/usuarios/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });

      if (!response.ok) throw new Error("Error en el login");

      const token = await response.text();

      sessionStorage.setItem("token", token);

      const decodedToken = JSON.parse(atob(token.split(".")[1]));
      const userRole = decodedToken.roles[0];
      sessionStorage.setItem("role", userRole);
      
      const responseUser = await fetch("http://localhost:8080/usuarios/perfil-usuario", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const user = await responseUser.json();
      sessionStorage.setItem("user", JSON.stringify(user));

      if (userRole === "ROLE_ALUMNO") {
        navigate("/home");
      } else {
        navigate("/teacher-dashboard");
      }
    } catch (error) {
      console.error("Error en el login:", error);
    }
  };

  const handleRegister = () => {
    navigate("/register");
  };

  return (
    <div className="LandingPage">
      <header>
        <a href="landing_page.html">
          <div className="logo">
            <img src="img/Icono EzLearning.png" alt="Logo" />
          </div>
        </a>
      </header>
      <main className="main-landing-page">
        <div className="landing-page">
          <img
            className="titulo-landing-page"
            src="./img/texto.svg"
            alt="Título"
          />
          <div className="texto-landing-page">
            ¡Prepárate de forma fácil y efectiva para tus exámenes de inglés!
          </div>
          <div className="botones-landing-page">
            <button className="boton" onClick={() => setShowPopup(true)}>
              ACCEDER
            </button>
            <button className="boton" onClick={() => handleRegister()}>
              REGÍSTRATE
            </button>
          </div>
        </div>
      </main>
      <footer>
        <div className="menu">
          <a href="./landing_page.html">Inicio</a>
          <a href="./404.html">Sobre nosotros</a>
          <a href="./contact.html">Contáctanos</a>
          <a href="./404.html">Preguntas Frecuentes</a>
        </div>
        <div className="social-icons">
          <img src="./img/logos-footerpng.png" alt="Redes sociales" />
        </div>
        <div className="footer-bottom">
          <div className="language">
            <a href="#">Español</a>
            <a href="#">Inglés</a>
            <a href="#">Francés</a>
          </div>
          <div className="rights">
            Non Copyrighted © 2024 Uploaded by EZ Learning
          </div>
        </div>
      </footer>
      {showPopup && (
        <div className="popup">
          <div className="login-container">
            <span className="close" onClick={() => setShowPopup(false)}>
              &times;
            </span>
            <h1 className="titulo-login">
              INICIO DE SESIÓN<span></span>
            </h1>
            <form className="login" action="./home.html" onSubmit={handleLogin}>
              <label for="email">Correo Electrónico</label>
              <input
                type="email"
                id="email"
                value={username}
                name="email"
                placeholder="Correo Electrónico"
                onChange={(e) => setUsername(e.target.value)}
              />

              <label for="password">Contraseña</label>
              <input
                type="password"
                id="password"
                value={password}
                name="password"
                placeholder="Contraseña"
                onChange={(e) => setPassword(e.target.value)}
              />

              <a className="reset-password" href="./404.html">
                He olvidado mi contraseña
              </a>
              <button className="boton" type="submit">
                ACCEDER
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default LandingPage;
