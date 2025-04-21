import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import "../App.css";
import "../styles/style.css";
import "../styles/footer.css";
import "../styles/header.css";
import Header from "./Header";
import Footer from "./Footer";

const TestsPage = () => {
  const navigate = useNavigate();
  const [tests, setTests] = useState([]);
  const [titulo, setTitulo] = useState("");
  const [tipo, setTipo] = useState("");
  const [dificultad, setDificultad] = useState("");
  const location = useLocation();

  useEffect(() => {
    const token = sessionStorage.getItem("token");

    if (token) {
      fetch("http://localhost:8080/tests/list", {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
        .then((response) => {
          if (!response.ok) {
            throw new Error("Error al obtener la lista de tests");
          }
          return response.json();
        })
        .then((data) => setTests(data))
        .catch((error) => console.error("Error:", error));
    } else {
      alert(
        "La sesión ha expirado o no se ha iniciado sesión. Por favor, inicie sesión nuevamente."
      );
    }
  }, [location.state]);

  const fetchTests = (filters = {}) => {
    const token = sessionStorage.getItem("token");
    if (!token) {
      alert(
        "La sesión ha expirado o no se ha iniciado sesión. Por favor, inicie sesión nuevamente."
      );
      return;
    }

    let url = "http://localhost:8080/tests/filtrar-tests?";
    if (filters.titulo) url += `titulo=${encodeURIComponent(filters.titulo)}&`;
    if (filters.tipo) url += `tipo=${filters.tipo}&`;
    if (filters.dificultad) url += `dificultad=${filters.dificultad}&`;

    fetch(url, {
      method: "GET",
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((response) => {
        if (!response.ok)
          throw new Error("Error al obtener los tests", response);
        return response.json();
      })
      .then((data) => setTests(data))
      .catch((error) => console.error("Error:", error));
  };

  const handleFilter = () => {
    fetchTests({ titulo, tipo, dificultad });
  };

  return (
    <div className="TestsPage">
      <Header />

      <div className="search-bar">
        <input
          type="text"
          placeholder="Buscar"
          value={titulo}
          onChange={(e) => setTitulo(e.target.value)}
        />
        <select value={tipo} onChange={(e) => setTipo(e.target.value)}>
          <option value="">Tipo</option>
          <option value="GRAMMAR">Grammar</option>
          <option value="LISTENING">Listening</option>
          <option value="VOCABULARY">Vocabulary</option>
        </select>
        <select
          value={dificultad}
          onChange={(e) => setDificultad(e.target.value)}
        >
          <option value="">Nivel</option>
          <option value="B1">B1</option>
          <option value="B2">B2</option>
          <option value="C1">C1</option>
        </select>
        <button onClick={handleFilter}>
          <a className="search-filtro">Filtrar</a>
        </button>
      </div>

      <main className="main-tests">
        {tests.length > 0 ? (
          <table className="test-table">
            <thead>
              <tr>
                <th>TÍTULO</th>
                <th>NIVEL</th>
                <th>TIPO</th>
                <th>FINALIZADO</th>
              </tr>
            </thead>
            <tbody>
              {tests.map((test) => (
                <tr key={test.id}>
                  <td className="test-title">
                    <span
                      onClick={() => {
                        console.log(test);
                        navigate(`/start-test/${test.id}`);
                      }}
                    >
                      {test.titulo}
                    </span>
                  </td>
                  <td>{test.dificultad}</td>
                  <td>{test.tipo}</td>
                  {/*<td>{test.completed ? 'Sí' : 'No'}</td> */}
                  <td>---</td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p>Cargando tests o no hay tests disponibles.</p>
        )}
      </main>
      <Footer />
    </div>
  );
};

export default TestsPage;
