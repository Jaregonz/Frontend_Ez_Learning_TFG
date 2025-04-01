import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../App.css';
import '../styles/style.css';
import '../styles/footer.css';
import '../styles/header.css';

const RegisterPage = () => {
  const [formData, setFormData] = useState({
    username: "",
    password: "",
    correoElectronico: "",
    nombre: "",
    apellidos: "",
    fechaNacimiento: "",
    nivel: "",
    rol: "ALUMNO",
    imagenPerfil: "",
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? (checked ? "PROFESOR" : "ALUMNO") : value,
      ...(name === "correoElectronico" && { username: value }),
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("http://localhost:8080/api/registro", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error("Error en el registro");
      }

      alert("Registro exitoso");
      console.log("Registro exitoso:", await response.json());
    } catch (error) {
      alert("Hubo un error en el registro, inténtalo de nuevo.");
      console.error(error);
    }
  };

  return (
    <div className="RegisterPage">
      <header>
        <a href="landing_page.html">
          <div className="logo">
            <img src="./img/Icono EzLearning.png" alt="Logo" />
          </div>
        </a>
      </header>

      <main className="main-register">
        <div className="container-register">
          <div className="form-register">
            <h1 className="titulo-register">CREAR CUENTA</h1>
            <form className="register" onSubmit={handleSubmit}>
              <label htmlFor="username">Usuario</label>
              <input type="text" id="username" name="username" placeholder="Usuario" required onChange={handleChange} />

              <label htmlFor="password">Contraseña</label>
              <input type="password" id="password" name="password" placeholder="Contraseña" required onChange={handleChange} />

              <label htmlFor="correoElectronico">Correo Electrónico</label>
              <input type="email" id="correoElectronico" name="correoElectronico" placeholder="Correo Electrónico" required onChange={handleChange} />

              <label htmlFor="nombre">Nombre</label>
              <input type="text" id="nombre" name="nombre" placeholder="Nombre" required onChange={handleChange} />

              <label htmlFor="apellidos">Apellidos</label>
              <input type="text" id="apellidos" name="apellidos" placeholder="Apellidos" required onChange={handleChange} />

              <label htmlFor="fechaNacimiento">Fecha de Nacimiento</label>
              <input type="date" id="fechaNacimiento" name="fechaNacimiento" required onChange={handleChange} />

              <label htmlFor="nivel">Nivel</label>
              <select id="nivel" name="nivel" required onChange={handleChange}>
                <option value="">Selecciona un nivel</option>
                <option value="B1">B1</option>
                <option value="B2">B2</option>
                <option value="C1">C1</option>
              </select>

              <label htmlFor="rol">Soy profesor</label>
              <input type="checkbox" id="rol" name="rol" onChange={handleChange} />

              <label htmlFor="imagenPerfil">Imagen de Perfil (URL)</label>
              <input type="text" id="imagenPerfil" name="imagenPerfil" placeholder="URL de la imagen de perfil" onChange={handleChange} />

              <div className="checkbox-group">
                <input type="checkbox" id="cookies" name="cookies" required />
                <label htmlFor="cookies">He leído y acepto las Políticas de Privacidad y Políticas de Cookies</label>
              </div>

              <button className="boton" type="submit">REGISTRARSE</button>
            </form>
          </div>

          <div className="logo-section">
            <h2>¡Bienvenido!</h2>
            <img src="./img/logo-grande.png" alt="Logo de Ez Learning" />
          </div>
        </div>
      </main>

      <footer>
        <div className="menu">
          <a href="#">Inicio</a>
          <a href="#">Sobre nosotros</a>
          <a href="#">Contáctanos</a>
          <a href="#">Preguntas Frecuentes</a>
        </div>

        <div className="social-icons">
          <img src="./img/logos-footerpng.png" alt="Social media icons" />
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
    </div>
  );
};

export default RegisterPage;
