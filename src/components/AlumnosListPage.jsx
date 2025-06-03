import React, { useEffect, useState } from "react";
import "../styles/style.css";
import Header from "./Header";
import Footer from "./Footer";

function AlumnoListPage() {
  const [alumnos, setAlumnos] = useState([]);
  const [formData, setFormData] = useState({});
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    const user = JSON.parse(sessionStorage.getItem("user"));

    fetch(`http://localhost:8080/usuarios/profesor/${user.id}/alumnos`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${sessionStorage.getItem("token")}`,
      },
    })
      .then((res) => {
        if (!res.ok) throw new Error("Error al obtener alumnos");
        return res.json();
      })
      .then((data) => setAlumnos(data))
      .catch((err) => console.error(err));
  }, []);

  const eliminarAlumno = (id) => {
    if (window.confirm("¿Estás seguro de eliminar este alumno?")) {
      fetch(`http://localhost:8080/usuarios/${id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${sessionStorage.getItem("token")}`,
        },
      })
        .then((res) => {
          if (!res.ok) throw new Error("Error al eliminar alumno");
          setAlumnos(alumnos.filter((a) => a.id !== id));
        })
        .catch((err) => console.error(err));
    }
  };

  const abrirModalEdicion = (alumno) => {
    const fechaISO = alumno.fechaNacimiento
      ? new Date(alumno.fechaNacimiento).toISOString().split("T")[0]
      : "";

    setFormData({ ...alumno, fechaNacimiento: fechaISO });
    setShowModal(true);
  };

  const cerrarModal = () => {
    setShowModal(false);
    setFormData({});
  };

  const guardarCambios = () => {
    console.log("Guardando cambios para:", formData);
    fetch(`http://localhost:8080/usuarios/${formData.id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${sessionStorage.getItem("token")}`,
      },
      body: JSON.stringify(formData),
    })
      .then((res) => {
        if (!res.ok) throw new Error("Error al actualizar alumno");
        return res.json();
      })
      .then((updated) => {
        setAlumnos(alumnos.map((a) => (a.id === updated.id ? updated : a)));
        cerrarModal();
      })
      .catch((err) => console.error(err));
  };

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  return (
    <div className="AlumnosListPage">
      <Header />
      <h2 className="alumnos-title">Listado de Alumnos</h2>
      <table className="tabla-alumnos">
        <thead>
          <tr>
            <th>Nombre</th>
            <th>Apellidos</th>
            <th>Correo</th>
            <th>Nivel</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {alumnos.map((alumno) => (
            <tr key={alumno.id}>
              <td>{alumno.nombre}</td>
              <td>{alumno.apellidos}</td>
              <td>{alumno.correoElectronico}</td>
              <td>{alumno.nivel}</td>
              <td>
                <button
                  className="btn editar"
                  onClick={() => abrirModalEdicion(alumno)}
                >
                  Editar
                </button>
                <button
                  onClick={() => eliminarAlumno(alumno.id)}
                  className="btn eliminar"
                >
                  Eliminar
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {showModal && (
        <div className="modal-overlay">
          <div className="modal">
            <h3 className="modal-title">Editar Alumno</h3>

            <label>Nombre:</label>
            <input
              type="text"
              name="nombre"
              value={formData.nombre || ""}
              onChange={handleChange}
            />

            <label>Apellidos:</label>
            <input
              type="text"
              name="apellidos"
              value={formData.apellidos || ""}
              onChange={handleChange}
            />

            <label>Correo Electrónico:</label>
            <input
              type="email"
              name="correoElectronico"
              value={formData.correoElectronico || ""}
              onChange={handleChange}
            />

            <label>Nivel:</label>
            <select
              name="nivel"
              value={formData.nivel || ""}
              onChange={handleChange}
            >
              <option value="">Selecciona un nivel</option>
              <option value="B1">B1</option>
              <option value="B2">B2</option>
              <option value="C1">C1</option>
            </select>

            <label>Imagen de Perfil (URL):</label>
            <input
              type="text"
              name="imagenPerfil"
              value={formData.imagenPerfil || ""}
              onChange={handleChange}
            />

            <label>Fecha de Nacimiento:</label>
            <input
              type="date"
              name="fechaNacimiento"
              value={formData.fechaNacimiento || ""}
              onChange={handleChange}
            />

            <div className="modal-buttons">
              <button className="boton btn guardar" onClick={guardarCambios}>
                Guardar
              </button>
              <button className="boton btn cancelar" onClick={cerrarModal}>
                Cancelar
              </button>
            </div>
          </div>
        </div>
      )}

      <Footer />
    </div>
  );
}

export default AlumnoListPage;
