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
    repeatPassword: "",
    correoElectronico: "",
    nombre: "",
    apellidos: "",
    fechaNacimiento: "",
    nivel: "",
    rol: "ALUMNO",
    imagenPerfil: "",
    idProfesor: "",
  });

  const [errors, setErrors] = useState({});

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

  const validateForm = () => {
    const newErrors = {};
    const emailRegex =
      /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
    const passwordRegex = /^[a-zA-Z0-9]+$/;

    if (!formData.nombre.trim()) newErrors.nombre = "El nombre es obligatorio";
    if (!formData.apellidos.trim())
      newErrors.apellidos = "Los apellidos son obligatorios";

    if (!formData.correoElectronico.trim()) {
      newErrors.correoElectronico = "El correo es obligatorio";
    } else if (!emailRegex.test(formData.correoElectronico)) {
      newErrors.correoElectronico = "Formato de correo no válido";
    }

    if (!formData.password.trim()) {
      newErrors.password = "La contraseña es obligatoria";
    } else if (!passwordRegex.test(formData.password)) {
      newErrors.password = "Solo se permiten letras y números";
    }

    if (!formData.repeatPassword.trim()) {
      newErrors.repeatPassword = "Repite la contraseña";
    } else if (formData.password !== formData.repeatPassword) {
      newErrors.repeatPassword = "Las contraseñas no coinciden";
    }

    if (!formData.fechaNacimiento) {
      newErrors.fechaNacimiento = "La fecha es obligatoria";
    }

    if (formData.rol === "ALUMNO") {
      if (!formData.nivel) {
        newErrors.nivel = "Selecciona un nivel";
      }

      if (!formData.idProfesor) {
        newErrors.idProfesor = "Selecciona un profesor";
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    const formDataToSend = new FormData();
    formDataToSend.append("username", formData.username);
    formDataToSend.append("password", formData.password);
    formDataToSend.append("correoElectronico", formData.correoElectronico);
    formDataToSend.append("nombre", formData.nombre);
    formDataToSend.append("apellidos", formData.apellidos);
    formDataToSend.append("fechaNacimiento", formData.fechaNacimiento);
    formDataToSend.append("nivel", formData.nivel);
    formDataToSend.append("rol", formData.rol);
    formDataToSend.append("idProfesor", formData.idProfesor);
    if (formData.imagenPerfil) {
      formDataToSend.append("imagenPerfil", formData.imagenPerfil);
    } else {
      const response = await fetch("../img/logo-grande.png");
      const blob = await response.blob();
      const defaultFile = new File([blob], "default-profile.png", {
        type: blob.type,
      });
      formDataToSend.append("imagenPerfil", defaultFile);
    }

    try {
      const response = await fetch("http://localhost:8080/usuarios/register", {
        method: "POST",
        body: formDataToSend,
      });

      if (!response.ok) throw new Error("Error en el registro");

      alert("Registro exitoso");
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
        <a href="/">
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
                onChange={handleChange}
                className={errors.nombre ? "input-error" : ""}
              />
              {errors.nombre && (
                <span className="error-msg">{errors.nombre}</span>
              )}

              <label htmlFor="apellidos">Apellidos</label>
              <input
                type="text"
                id="apellidos"
                name="apellidos"
                placeholder="Apellidos"
                onChange={handleChange}
                className={errors.apellidos ? "input-error" : ""}
              />
              {errors.apellidos && (
                <span className="error-msg">{errors.apellidos}</span>
              )}

              <label htmlFor="password">Contraseña</label>
              <input
                type="password"
                id="password"
                name="password"
                placeholder="Contraseña"
                onChange={handleChange}
                className={errors.password ? "input-error" : ""}
              />
              {errors.password && (
                <span className="error-msg">{errors.password}</span>
              )}

              <label htmlFor="repeatPassword">Repetir Contraseña</label>
              <input
                type="password"
                id="repeatPassword"
                name="repeatPassword"
                placeholder="Repite la contraseña"
                onChange={handleChange}
                className={errors.repeatPassword ? "input-error" : ""}
              />
              {errors.repeatPassword && (
                <span className="error-msg">{errors.repeatPassword}</span>
              )}

              <label htmlFor="correoElectronico">Correo Electrónico</label>
              <input
                type="email"
                id="correoElectronico"
                name="correoElectronico"
                placeholder="Correo Electrónico"
                onChange={handleChange}
                className={errors.correoElectronico ? "input-error" : ""}
              />
              {errors.correoElectronico && (
                <span className="error-msg">{errors.correoElectronico}</span>
              )}

              <label htmlFor="fechaNacimiento">Fecha de Nacimiento</label>
              <input
                type="date"
                id="fechaNacimiento"
                name="fechaNacimiento"
                onChange={handleChange}
                className={errors.fechaNacimiento ? "input-error" : ""}
              />
              {errors.fechaNacimiento && (
                <span className="error-msg">{errors.fechaNacimiento}</span>
              )}

              <label htmlFor="imagenPerfil">Imagen de Perfil</label>
              <input
                type="file"
                id="imagenPerfil"
                name="imagenPerfil"
                accept="image/*"
                onChange={(e) =>
                  setFormData((prev) => ({
                    ...prev,
                    imagenPerfil: e.target.files[0],
                  }))
                }
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
              <select
                id="nivel"
                name="nivel"
                onChange={handleChange}
                disabled={formData.rol === "PROFESOR"}
                className={errors.nivel ? "input-error" : ""}
              >
                <option value="">Selecciona un nivel</option>
                <option value="B1">B1</option>
                <option value="B2">B2</option>
                <option value="C1">C1</option>
              </select>
              {errors.nivel && (
                <span className="error-msg">{errors.nivel}</span>
              )}

              <label htmlFor="profesor">Profesor asignado</label>
              <select
                id="profesor"
                name="idProfesor"
                onChange={handleChange}
                disabled={formData.rol === "PROFESOR"}
                className={errors.idProfesor ? "input-error" : ""}
              >
                <option value="">Selecciona un profesor</option>
                {profesores.map((profesor) => (
                  <option key={profesor.id} value={profesor.id}>
                    {profesor.nombre} {profesor.apellidos}
                  </option>
                ))}
              </select>
              {errors.idProfesor && (
                <span className="error-msg">{errors.idProfesor}</span>
              )}

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
