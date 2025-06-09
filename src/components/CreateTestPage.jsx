// CreateTestPage.js
import React, { useState } from "react";
import "../styles/style.css";
import Header from "./Header";
import Footer from "./Footer";
import "../App.css";
import { useNavigate } from "react-router-dom";

const CreateTestPage = () => {
  const [titulo, setTitulo] = useState("");
  const [dificultad, setDificultad] = useState("");
  const [tipo, setTipo] = useState("");
  const [tiempo, setTiempo] = useState("");
  const [pregunta, setPregunta] = useState("");
  const [opciones, setOpciones] = useState(["", "", "", ""]);
  const [correcta, setCorrecta] = useState("1");
  const [preguntas, setPreguntas] = useState([]);
  const [errores, setErrores] = useState({});

  const navigate = useNavigate();

  const handleOpcionChange = (index, value) => {
    const nuevasOpciones = [...opciones];
    nuevasOpciones[index] = value;
    setOpciones(nuevasOpciones);
  };

  const resetearFormularioPregunta = () => {
    setPregunta("");
    setOpciones(["", "", "", ""]);
    setCorrecta("1");
  };

  const validarPregunta = () => {
    const nuevosErrores = { ...errores };

    // Eliminamos errores antiguos relacionados con pregunta y opciones
    Object.keys(nuevosErrores).forEach((key) => {
      if (key.startsWith("pregunta") || key.startsWith("opcion")) {
        delete nuevosErrores[key];
      }
    });

    if (!pregunta.trim()) {
      nuevosErrores.pregunta = "La pregunta no puede estar vacía.";
    }
    opciones.forEach((op, idx) => {
      if (!op.trim()) {
        nuevosErrores[`opcion${idx}`] = `La opción ${
          idx + 1
        } no puede estar vacía.`;
      }
    });

    setErrores(nuevosErrores);

    // Retornamos true si NO hay errores de pregunta/opción
    return !Object.keys(nuevosErrores).some(
      (key) => key.startsWith("pregunta") || key.startsWith("opcion")
    );
  };

  const handleAñadirPregunta = () => {
    if (!validarPregunta()) return;
    const nuevaPregunta = {
      texto: pregunta,
      opciones: [...opciones],
      correcta,
    };
    setPreguntas([...preguntas, nuevaPregunta]);
    resetearFormularioPregunta();
    // Eliminamos errores relacionados con la pregunta al añadir
    const nuevosErrores = { ...errores };
    Object.keys(nuevosErrores).forEach((key) => {
      if (key.startsWith("pregunta") || key.startsWith("opcion")) {
        delete nuevosErrores[key];
      }
    });
    setErrores(nuevosErrores);
  };

  const eliminarPregunta = (index) => {
    const nuevas = preguntas.filter((_, i) => i !== index);
    setPreguntas(nuevas);
  };

  const validarTest = () => {
    const nuevosErrores = { ...errores };

    // Eliminamos errores antiguos relacionados con test general
    ["titulo", "dificultad", "tipo", "tiempo", "preguntas"].forEach((campo) => {
      delete nuevosErrores[campo];
    });

    if (!titulo.trim()) {
      nuevosErrores.titulo = "El título es obligatorio.";
    }
    if (!dificultad) nuevosErrores.dificultad = "Selecciona una dificultad.";
    if (!tipo) nuevosErrores.tipo = "Selecciona un tipo.";
    if (!tiempo || tiempo < 1 || tiempo > 30) {
      nuevosErrores.tiempo = "El tiempo debe estar entre 1 y 30 minutos.";
    }
    if (preguntas.length === 0) {
      nuevosErrores.preguntas = "Debes añadir al menos una pregunta.";
    } else if (preguntas.length > 20) {
      nuevosErrores.preguntas = "No puedes añadir más de 20 preguntas.";
    }

    setErrores(nuevosErrores);

    // Retorna true si no hay errores de test (ignora errores de pregunta/opción)
    return !Object.keys(nuevosErrores).some((key) =>
      ["titulo", "dificultad", "tipo", "tiempo", "preguntas"].includes(key)
    );
  };

  const handleCrearTest = async () => {
    if (!validarTest()) return;

    const usuarioId = 1;
    const test = {
      usuarioId,
      tipo,
      titulo,
      dificultad,
      cantidadPreguntas: preguntas.length,
      tiempo: parseInt(tiempo),
      preguntas: preguntas.map((p) => ({
        contenidoPregunta: p.texto,
        respuestas: p.opciones.map((opcion, idx) => ({
          contenido: opcion,
          esCorrecta: parseInt(p.correcta) - 1 === idx,
        })),
      })),
    };
    const token = sessionStorage.getItem("token");
    try {
      const response = await fetch("http://localhost:8080/tests/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(test),
      });
      if (!response.ok) throw new Error("Error en el registro");
      alert("Test creado con éxito");
      navigate("/teacher-dashboard");
    } catch (error) {
      alert("Hubo un error en el registro, inténtalo de nuevo.");
      console.error(error);
    }
  };

  return (
    <div className="CreateTestPage">
      <Header />
      <main className="main-create-test">
        <div className="create-test-container">
          <h1>CREAR TEST</h1>

          <label>TÍTULO</label>
          <input
            className={errores.titulo ? "input-error" : ""}
            type="text"
            value={titulo}
            onChange={(e) => setTitulo(e.target.value)}
          />
          {errores.titulo && <p className="error-msg">{errores.titulo}</p>}

          <div className="fila-selects">
            <div>
              <label>DIFICULTAD</label>
              <select
                className={errores.dificultad ? "input-error" : ""}
                value={dificultad}
                onChange={(e) => setDificultad(e.target.value)}
              >
                <option value="">Seleccionar</option>
                <option value="B1">B1</option>
                <option value="B2">B2</option>
                <option value="C1">C1</option>
              </select>
              {errores.dificultad && (
                <p className="error-msg">{errores.dificultad}</p>
              )}
            </div>
            <div>
              <label>TIPO</label>
              <select
                className={errores.tipo ? "input-error" : ""}
                value={tipo}
                onChange={(e) => setTipo(e.target.value)}
              >
                <option value="">Seleccionar</option>
                <option value="GRAMMAR">GRAMMAR</option>
                <option value="VOCABULARY">VOCABULARY</option>
                <option value="LISTENING">LISTENING</option>
              </select>
              {errores.tipo && <p className="error-msg">{errores.tipo}</p>}
            </div>
            <div>
              <label>
                TIEMPO <small>(max 30 minutos)</small>
              </label>
              <input
                className={errores.tiempo ? "input-error" : ""}
                type="number"
                min="1"
                max="30"
                value={tiempo}
                onChange={(e) => setTiempo(e.target.value)}
              />
              {errores.tiempo && <p className="error-msg">{errores.tiempo}</p>}
            </div>
          </div>

          <label>PREGUNTA</label>
          <input
            className={errores.pregunta ? "input-error" : ""}
            type="text"
            value={pregunta}
            onChange={(e) => setPregunta(e.target.value)}
          />
          {errores.pregunta && <p className="error-msg">{errores.pregunta}</p>}

          {opciones.map((op, idx) => (
            <div key={idx}>
              <label>OPCIÓN {idx + 1}</label>
              <input
                className={errores[`opcion${idx}`] ? "input-error" : ""}
                type="text"
                value={op}
                onChange={(e) => handleOpcionChange(idx, e.target.value)}
              />
              {errores[`opcion${idx}`] && (
                <p className="error-msg">{errores[`opcion${idx}`]}</p>
              )}
            </div>
          ))}

          <label>OPCIÓN CORRECTA</label>
          <select
            className="select-opcion-correcta"
            value={correcta}
            onChange={(e) => setCorrecta(e.target.value)}
          >
            <option value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
            <option value="4">4</option>
          </select>

          <button className="boton" onClick={handleAñadirPregunta}>
            AÑADIR PREGUNTA
          </button>

          <div className="preguntas-container">
            <h3>PREGUNTAS</h3>
            <div className="preguntas">
              {preguntas.map((p, i) => (
                <div key={i} className="pregunta-preview">
                  <p>
                    {i + 1}. {p.texto}
                  </p>
                  <button
                    className="delete-btn"
                    onClick={() => eliminarPregunta(i)}
                  >
                    ✖
                  </button>
                </div>
              ))}
              {errores.preguntas && (
                <p className="error-msg">{errores.preguntas}</p>
              )}
            </div>
          </div>

          <div className="botones-crear-test">
            <button className="boton" onClick={handleCrearTest}>
              CREAR TEST
            </button>
            <button className="boton" onClick={() => navigate("/")}>
              VOLVER
            </button>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default CreateTestPage;
