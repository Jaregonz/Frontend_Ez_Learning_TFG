import React, { useState } from "react";
import "../styles/style.css";
import Header from "./Header";
import Footer from "./Footer";
import "../App.css";

const CreateTestPage = () => {
  const [titulo, setTitulo] = useState("");
  const [dificultad, setDificultad] = useState("");
  const [tipo, setTipo] = useState("");
  const [tiempo, setTiempo] = useState("");
  const [pregunta, setPregunta] = useState("");
  const [opciones, setOpciones] = useState(["", "", "", ""]);
  const [correcta, setCorrecta] = useState("1");
  const [preguntas, setPreguntas] = useState([]);

  const handleOpcionChange = (index, value) => {
    const nuevasOpciones = [...opciones];
    nuevasOpciones[index] = value;
    setOpciones(nuevasOpciones);
  };

  const añadirPregunta = () => {
    if (!pregunta.trim()) return;

    const nuevaPregunta = {
      texto: pregunta,
      opciones,
      correcta,
    };

    setPreguntas([...preguntas, nuevaPregunta]);
    setPregunta("");
    setOpciones(["", "", "", ""]);
    setCorrecta("1");
  };

  const eliminarPregunta = (index) => {
    const nuevas = preguntas.filter((_, i) => i !== index);
    setPreguntas(nuevas);
  };

  const handleCrearTest = async () => {
    const usuarioId = 1;
  
    const test = {
      usuarioId,
      tipo,
      titulo,
      dificultad,
      cantidadPreguntas: preguntas.length,
      tiempo: parseInt(tiempo),
      preguntas: preguntas.map(p => ({
        contenidoPregunta: p.texto,
        respuestas: p.opciones.map((opcion, idx) => ({
          contenido: opcion,
          esCorrecta: parseInt(p.correcta) === idx + 1
        }))
      }))
    };
    const token = sessionStorage.getItem("token");
    try {
        console.log("Test a crear:", test);
        const response = await fetch("http://localhost:8080/tests/", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`
          },
          body: JSON.stringify(test),
        });
      
        if (!response.ok) {
          throw new Error("Error en el registro");
        }
      
        alert("Test creado con éxito");
      } catch (error) {
        alert("Hubo un error en el registro, inténtalo de nuevo.");
        console.error(error);
      }
    }
  return (
    <div className="CreateTestPage">
      <Header />
      <main className="main-create-test">
        <div className="create-test-container">
        <h1>CREAR TEST<span></span></h1>

          <label>TÍTULO</label>
          <input value={titulo} onChange={(e) => setTitulo(e.target.value)} />

          <div className="fila-selects">
            <div>
              <label>DIFICULTAD</label>
              <select
                value={dificultad}
                onChange={(e) => setDificultad(e.target.value)}
              >
                <option value="">Seleccionar</option>
                <option value="B1">B1</option>
                <option value="B2">B2</option>
                <option value="C1">C1</option>
              </select>
            </div>
            <div>
              <label>TIPO</label>
              <select value={tipo} onChange={(e) => setTipo(e.target.value)}>
                <option value="">Seleccionar</option>
                <option value="GRAMMAR">GRAMMAR</option>
                <option value="VOCABULARY">VOCABULARY</option>
                <option value="LISTENING">LISTENING</option>
              </select>
            </div>
            <div>
              <label>
                TIEMPO <small>(max 30 minutos)</small>
              </label>
              <input
                type="number"
                min="1"
                max="30"
                value={tiempo}
                onChange={(e) => setTiempo(e.target.value)}
              />
            </div>
          </div>


          <label>PREGUNTA</label>
          <input
            value={pregunta}
            onChange={(e) => setPregunta(e.target.value)}
          />

          {opciones.map((op, idx) => (
            <div key={idx}>
              <label>OPCIÓN {idx + 1}</label>
              <input
                value={op}
                onChange={(e) => handleOpcionChange(idx, e.target.value)}
              />
            </div>
          ))}

          <label>OPCIÓN CORRECTA</label>
          <select
            value={correcta}
            onChange={(e) => setCorrecta(e.target.value)}
          >
            <option value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
            <option value="4">4</option>
          </select>

          <button className="boton" onClick={añadirPregunta}>
            AÑADIR PREGUNTA
          </button>

          <div className="preguntas-container">
            <h3>PREGUNTAS</h3>
            <div className="preguntas">
              {preguntas.map((p, i) => (
                <p key={i}>
                  {i + 1}. {p.texto}

                  <button
                    className="delete-btn"
                    onClick={() => eliminarPregunta(i)}
                  >
                    ✖
                  </button>
                </p>
              ))}
            </div>
          </div>

          <div className="botones-crear-test">
            <button className="boton" onClick={handleCrearTest}>
              CREAR TEST
            </button>
            <button className="boton">VOLVER</button>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default CreateTestPage;
