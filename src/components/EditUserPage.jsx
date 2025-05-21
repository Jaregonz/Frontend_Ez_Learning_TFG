import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import "../styles/style.css";
import "../styles/footer.css";
import "../styles/header.css";
import Header from "./Header";
import Footer from "./Footer";

const EditUserPage = () => {
  const location = useLocation();
  const user = location.state?.user;

  const [formData, setFormData] = useState({
    nombre: "",
    apellidos: "",
    correoElectronico: "",
    fechaNacimiento: "",
    imagenPerfil: "",
  });

  useEffect(() => {
    if (user) {
      setFormData({
        nombre: user.nombre,
        apellidos: user.apellidos,
        correoElectronico: user.correoElectronico,
        fechaNacimiento: user.fechaNacimiento?.split("T")[0] || "",
        imagenPerfil: user.imagenPerfil || "",
      });
    }
  }, [user]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const token = sessionStorage.getItem("token");
    console.log("Token:", token);

    fetch(`http://localhost:8080/usuarios/${user.id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`
       },
      body: JSON.stringify(formData),
    })
      .then((res) => {
        if (!res.ok) {
          return res.text().then((msg) => {
            throw new Error(msg);
          });
        }
        alert("Datos actualizados correctamente");
      })
      .catch((err) => alert("Error al actualizar: " + err.message));
  };

  if (!user) return <p>Cargando datos del usuario...</p>;

  return (
    <div>
      <Header />
      <div className="edit-user-page">
        <form onSubmit={handleSubmit} className="edit-user-form">
          <h1>
            EDITAR USUARIO<span></span>
          </h1>
          <div className="form-group">
            <label>Nombre</label>
            <input
              type="text"
              name="nombre"
              value={formData.nombre}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label>Apellidos</label>
            <input
              type="text"
              name="apellidos"
              value={formData.apellidos}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label>Correo Electrónico</label>
            <input
              type="email"
              name="correoElectronico"
              value={formData.correoElectronico}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label>Fecha de Nacimiento</label>
            <input
              type="date"
              name="fechaNacimiento"
              value={formData.fechaNacimiento}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label>Imagen de Perfil (URL)</label>
            <input
              type="text"
              name="imagenPerfil"
              value={formData.imagenPerfil}
              onChange={handleChange}
            />
          </div>

          <button type="submit" className="boton">
            Guardar Cambios
          </button>
        </form>
      </div>
      <Footer />
    </div>
  );
};

export default EditUserPage;
