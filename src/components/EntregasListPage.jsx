import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "../styles/style.css";
import Header from "./Header";
import Footer from "./Footer";

export default function EntregasListPage() {
  const { id } = useParams();
  const [tituloExamen, setTituloExamen] = useState("");
  const [entregas, setEntregas] = useState([]);
  const token = sessionStorage.getItem("token");

  useEffect(() => {
    const fetchEntregas = async () => {
      try {
        const response = await fetch(
          `http://localhost:8080/examenes/${id}/entregas`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (!response.ok) throw new Error("Error al obtener entregas");

        const data = await response.json();
        setEntregas(data);
      } catch (err) {
        console.error("Error:", err);
      }
    };
    const fetchExamen = async () => {
      try {
        const response = await fetch(`http://localhost:8080/examenes/${id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (!response.ok) throw new Error("Error al obtener el examen");

        const examen = await response.json();
        setTituloExamen(examen.titulo);
      } catch (err) {
        console.error("Error:", err);
      }
    };

    fetchEntregas();
    fetchExamen();
  }, [id]);

  const handleComentarioChange = (index, nuevoComentario) => {
    const actualizadas = [...entregas];
    actualizadas[index].comentario = nuevoComentario;
    setEntregas(actualizadas);
  };

  const handleAprobadoChange = (index, aprobado) => {
    const actualizadas = [...entregas];
    actualizadas[index].aprobado = aprobado;
    setEntregas(actualizadas);
  };

  const handleGuardar = async (index) => {
    const entrega = entregas[index];

    try {
      const response = await fetch(
        `http://localhost:8080/examenes/entregas/${entrega.id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            comentario: entrega.comentario,
            aprobado: entrega.aprobado,
          }),
        }
      );

      if (!response.ok) {
        throw new Error("Error al guardar la evaluación");
      }

      alert("Evaluación guardada con éxito");
    } catch (err) {
      console.error("Error:", err);
      alert("Hubo un error al guardar la evaluación");
    }
  };

  return (
    <div className="EntregasListPage">
      <Header />
      <h1 className="titulo-examenes">Entregas ({tituloExamen})</h1>
      <main className="main-entregas">
        <div className="entregas-profesor">
          {entregas.map((entrega, index) => (
            <div key={entrega.id} className="entrega-item">
              <div className="entrega-header">
                <h3 className="nombre-alumno">{entrega.alumnoNombre}</h3>
                {entrega.archivoRespuestaRuta ? (
                  <a
                    className="descargar-link"
                    href={`http://localhost:8080${entrega.archivoRespuestaRuta}`}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Descargar archivo
                  </a>
                ) : (
                  <p className="no-entrega">No ha entregado aún</p>
                )}
              </div>

              <details className="entrega-detalles">
                <summary>Evaluar entrega</summary>

                <div className="entrega-comentario">
                  <label className="label">Comentario:</label>
                  <textarea
                    value={entrega.comentario || ""}
                    onChange={(e) =>
                      handleComentarioChange(index, e.target.value)
                    }
                    rows={2}
                  />
                </div>

                <div className="entrega-aprobado">
                  <label className="label">Aprobado:</label>
                  <div className="radio-group">
                    <label>
                      <input
                        type="radio"
                        name={`aprobado-${entrega.id}`}
                        value="true"
                        checked={entrega.aprobado === true}
                        onChange={() => handleAprobadoChange(index, true)}
                      />
                      Sí
                    </label>
                    <label>
                      <input
                        type="radio"
                        name={`aprobado-${entrega.id}`}
                        value="false"
                        checked={entrega.aprobado === false}
                        onChange={() => handleAprobadoChange(index, false)}
                      />
                      No
                    </label>
                  </div>
                </div>

                <button
                  className="boton guardar-evaluacion"
                  onClick={() => handleGuardar(index)}
                >
                  Guardar evaluación
                </button>
              </details>
            </div>
          ))}
        </div>
      </main>
      <Footer />
    </div>
  );
}
