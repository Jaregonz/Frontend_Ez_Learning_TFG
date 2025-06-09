import React, { useEffect, useState } from "react";
import "../styles/style.css";
import Header from "./Header";
import Footer from "./Footer";

function AlumnoListPage() {
  const [alumnos, setAlumnos] = useState([]);
  const [formData, setFormData] = useState({});
  const [showModal, setShowModal] = useState(false);
  const [imagenFile, setImagenFile] = useState(null);
  const [errores, setErrores] = useState({});

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
  const validarFormulario = () => {
    const nuevosErrores = {};

    if (!formData.nombre || formData.nombre.trim() === "") {
      nuevosErrores.nombre = "El nombre es obligatorio.";
    }

    if (!formData.apellidos || formData.apellidos.trim() === "") {
      nuevosErrores.apellidos = "Los apellidos son obligatorios.";
    }

    if (
      !formData.correoElectronico ||
      !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.correoElectronico)
    ) {
      nuevosErrores.correoElectronico = "Correo electrónico no válido.";
    }

    if (!formData.fechaNacimiento) {
      nuevosErrores.fechaNacimiento = "La fecha de nacimiento es obligatoria.";
    } else if (new Date(formData.fechaNacimiento) > new Date()) {
      nuevosErrores.fechaNacimiento = "La fecha no puede ser futura.";
    }

    if (!formData.nivel) {
      nuevosErrores.nivel = "Selecciona un nivel.";
    }

    setErrores(nuevosErrores);
    return Object.keys(nuevosErrores).length === 0;
  };

  const guardarCambios = () => {
    if (!validarFormulario()) return;

    const form = new FormData();

    form.append("correoElectronico", formData.correoElectronico);
    form.append("nombre", formData.nombre);
    form.append("apellidos", formData.apellidos);
    form.append("fechaNacimiento", formData.fechaNacimiento);
    form.append("nivel", formData.nivel || "");

    if (imagenFile) {
      form.append("imagenPerfil", imagenFile);
    }

    fetch(`http://localhost:8080/usuarios/${formData.id}`, {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${sessionStorage.getItem("token")}`,
      },
      body: form,
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
            {errores.nombre && <p className="error-msg">{errores.nombre}</p>}

            <label>Apellidos:</label>
            <input
              type="text"
              name="apellidos"
              value={formData.apellidos || ""}
              onChange={handleChange}
            />
            {errores.apellidos && <p className="error-msg">{errores.apellidos}</p>}

            <label>Correo Electrónico:</label>
            <input
              type="email"
              name="correoElectronico"
              value={formData.correoElectronico || ""}
              onChange={handleChange}
            />
            {errores.correoElectronico && (
              <p className="error-msg">{errores.correoElectronico}</p>
            )}

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
            {errores.nivel && <p className="error-msg">{errores.nivel}</p>}

            <label>Imagen de Perfil (archivo):</label>
            <input
              type="file"
              name="imagenPerfil"
              accept="image/*"
              onChange={(e) => setImagenFile(e.target.files?.[0] || null)}
            />

            <label>Fecha de Nacimiento:</label>
            <input
              type="date"
              name="fechaNacimiento"
              value={formData.fechaNacimiento || ""}
              onChange={handleChange}
            />
            {errores.fechaNacimiento && (
              <p className="error-msg">{errores.fechaNacimiento}</p>
            )}

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
