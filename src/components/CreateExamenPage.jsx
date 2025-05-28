import React, { useState } from "react";
import Header from "./Header";
import Footer from "./Footer";
import "../styles/style.css";

const CreateExamenPage = () => {
  const [titulo, setTitulo] = useState("");
  const [fechaCierre, setFechaCierre] = useState("");
  const [archivo, setArchivo] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("titulo", titulo);
    formData.append("fechaCierre", fechaCierre);
    if (archivo) formData.append("archivo", archivo);

    const token = sessionStorage.getItem("token");

    await fetch("http://localhost:8080/examenes", {
      method: "POST",
      body: formData,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    alert("Examen creado con éxito");
  };

  return (
    <div className="CreateExamenPage">
      <Header />
      <main className="main-create-examen">
        <div className="create-examen-container">
          <h1 className="titulo-examenes">
            CREAR NUEVO EXAMEN<span></span>
          </h1>

          <form onSubmit={handleSubmit} className="crear-examen-form">
            <label for="titulo">Título</label>
            <input
              type="text"
              placeholder="Título"
              value={titulo}
              onChange={(e) => setTitulo(e.target.value)}
              required
            />

            <label for="fechaCierre">Fecha de Cierre</label>
            <input
              type="date"
              value={fechaCierre}
              onChange={(e) => setFechaCierre(e.target.value)}
              required
            />
            <label for="archivo">Archivo</label>
            <input
              type="file"
              accept="application/pdf"
              onChange={(e) => setArchivo(e.target.files?.[0] || null)}
              required
            />
            <button className="boton" type="submit">
              Crear
            </button>
          </form>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default CreateExamenPage;
