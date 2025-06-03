import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../App.css";
import "../styles/style.css";
import "../styles/footer.css";
import "../styles/header.css";
import Footer from "./Footer";
const RegisterPage = () => {
  const navigate = useNavigate();
  const [profesores, setProfesores] = useState([]);
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
    idProfesor: "",
  });

  const handleChange = (e) => {
    const { name, value, checked } = e.target;

    if (name === "rol") {
      setFormData((prev) => ({
        ...prev,
        rol: checked ? "PROFESOR" : "ALUMNO",
        idProfesor: checked ? "" : prev.idProfesor,
      }));
    } else if (name === "correoElectronico") {
      setFormData((prev) => ({
        ...prev,
        correoElectronico: value,
        username: value,
      }));
    } else {
      setFormData((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("http://localhost:8080/usuarios/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error("Error en el registro");
      }

      alert("Registro exitoso");
      console.log("Registro exitoso:", await response.json());
      navigate("/");
    } catch (error) {
      alert("Hubo un error en el registro, inténtalo de nuevo.");
      console.error(error);
    }
  };

  useEffect(() => {
    const fetchProfesores = async () => {
      try {
        const response = await fetch(
          "http://localhost:8080/usuarios/profesores"
        );
        if (response.ok) {
          const data = await response.json();
          setProfesores(data);
        } else {
          throw new Error("No se pudo cargar la lista de profesores");
        }
      } catch (error) {
        console.error("Error al obtener profesores:", error);
      }
    };

    fetchProfesores();
  }, []);

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
              <label htmlFor="nombre">Nombre</label>
              <input
                type="text"
                id="nombre"
                name="nombre"
                placeholder="Nombre"
                required
                onChange={handleChange}
              />

              <label htmlFor="apellidos">Apellidos</label>
              <input
                type="text"
                id="apellidos"
                name="apellidos"
                placeholder="Apellidos"
                required
                onChange={handleChange}
              />

              <label htmlFor="password">Contraseña</label>
              <input
                type="password"
                id="password"
                name="password"
                placeholder="Contraseña"
                required
                onChange={handleChange}
              />

              <label htmlFor="correoElectronico">Correo Electrónico</label>
              <input
                type="email"
                id="correoElectronico"
                name="correoElectronico"
                placeholder="Correo Electrónico"
                required
                onChange={handleChange}
              />

              <label htmlFor="fechaNacimiento">Fecha de Nacimiento</label>
              <input
                type="date"
                id="fechaNacimiento"
                name="fechaNacimiento"
                required
                onChange={handleChange}
              />

              <label htmlFor="imagenPerfil">Imagen de Perfil (URL)</label>
              <input
                type="text"
                id="imagenPerfil"
                name="imagenPerfil"
                placeholder="URL de la imagen de perfil"
                onChange={handleChange}
              />

              <div className="checkbox-group">
                <input
                  type="checkbox"
                  id="rol"
                  name="rol"
                  onChange={handleChange}
                />
                <label htmlFor="rol">Soy profesor</label>
              </div>

              <label htmlFor="nivel">Nivel</label>
              <select id="nivel" name="nivel" required onChange={handleChange} disabled={formData.rol === "PROFESOR"}>
                <option value="">Selecciona un nivel</option>
                <option value="B1">B1</option>
                <option value="B2">B2</option>
                <option value="C1">C1</option>
              </select>
              <label htmlFor="profesor">Profesor asignado</label>
              <select
                id="profesor"
                name="idProfesor"
                onChange={handleChange}
                disabled={formData.rol === "PROFESOR"}
              >
                <option value="">Selecciona un profesor</option>
                {profesores.map((profesor) => (
                  <option key={profesor.id} value={profesor.id}>
                    {profesor.nombre} {profesor.apellidos}
                  </option>
                ))}
              </select>

              <button className="boton" type="submit">
                REGISTRARSE
              </button>
            </form>
          </div>

          <div className="logo-section">
            <h2>¡Bienvenido!</h2>
            <img src="./img/logo-grande.png" alt="Logo de Ez Learning" />
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default RegisterPage;
