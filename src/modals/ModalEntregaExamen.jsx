import { useState, useEffect } from "react";
import "../styles/style.css";

export default function ModalEntregaExamen({ examen, onClose }) {
  const [archivo, setArchivo] = useState(null);
  const [mensaje, setMensaje] = useState("");
  const [comentario, setComentario] = useState(null);
  const [aprobado, setAprobado] = useState(null);
  const [entrega, setEntrega] = useState(null);
  const [cerrado, setCerrado] = useState(false);

useEffect(() => {
  const fetchEntrega = async () => {
    const token = sessionStorage.getItem("token");
    const user = JSON.parse(sessionStorage.getItem("user"));
    console.log("User:", user);
    const idAlumno = user?.id;

    if (!idAlumno) {
      console.error("No se pudo obtener el ID del alumno.");
      return;
    }

    try {
      const response = await fetch(
        `http://localhost:8080/examenes/entrega-examen/${examen.id}/${idAlumno}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.ok) {
        
        const data = await response.json();
        console.log(examen.id, idAlumno);
        console.log(data);
        setEntrega(data);
        setComentario(data.comentario);
        setAprobado(data.aprobado);
        
      } else {
        console.error("Error al obtener la entrega del examen");
      }
    } catch (error) {
      console.error("Error:", error);
      setEntrega(null);
      setComentario(null);
      setAprobado(null);
    }
  };

  const ahora = new Date();
  const fechaCierre = new Date(examen.fechaCierre);
  if (ahora > fechaCierre) {
    setCerrado(true);
  }

  fetchEntrega();
}, [examen.id]);

  const handleArchivoChange = (e) => {
    setArchivo(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!archivo) {
      setMensaje("Por favor, selecciona un archivo.");
      return;
    }

    const formData = new FormData();
    formData.append("archivo", archivo);

    const token = sessionStorage.getItem("token");
    console.log("Token:", token);

    try {
      const response = await fetch(
        `http://localhost:8080/examenes/${examen.id}/entrega`,
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
          },
          body: formData,
        }
      );

      if (!response.ok) {
        throw new Error("Error al enviar el examen");
      }

      setMensaje("¡Entrega realizada con éxito!");
    } catch (error) {
      console.error("Error:", error);
      setMensaje("Error al enviar el archivo.");
    }
  };

  return (
    <div className="modal-backdrop">
      <div className="modal-contenedor">
        <button className="cerrar-modal" onClick={onClose}>
          ×
        </button>
        <h1 className="titulo-modal">
          {examen.titulo}
          <span></span>
        </h1>
        <p>
          <strong>Fecha límite:</strong>{" "}
          {new Date(examen.fechaCierre).toLocaleDateString()}
        </p>
        <a
          className="descargar-link"
          href={`http://localhost:8080${examen.archivoRuta}`}
          target="_blank"
          rel="noopener noreferrer"
        >
          Descargar examen
        </a>

        <form onSubmit={handleSubmit} className="formulario-entrega">
          {!entrega && (
            <>
              <label>Sube tu archivo:</label>
              <input type="file" onChange={handleArchivoChange} required />
              <button type="submit" className="boton">
                ENTREGAR
              </button>
            </>
          )}

          {entrega && (
            <p className="mensaje">Este examen ya ha sido entregado.</p>
          )}

          {!entrega && cerrado && (
            <p className="mensaje" style={{ color: "red" }}>
              La fecha de entrega ha expirado. No puedes entregar este examen.
            </p>
          )}

          {(comentario || aprobado !== null) && (
            <div className="resultado-entrega">
              {comentario && (
                <div>
                  <p className="strong-modal">Comentario del profesor:</p>{" "}
                  {comentario}
                </div>
              )}
              {aprobado !== null && (
                <div>
                  <p className="strong-modal">Estado:</p>
                  <span style={{ color: aprobado ? "green" : "red" }}>
                    {aprobado ? "Aprobado" : "No aprobado"}
                  </span>
                </div>
              )}
            </div>
          )}
        </form>
        {mensaje && <p className="mensaje">{mensaje}</p>}
      </div>
    </div>
    
  );
}
