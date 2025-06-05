import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/style.css";
import "../styles/footer.css";
import "../styles/header.css";
import Header from "./Header";
import Footer from "./Footer";

const EditUserPage = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [imagenFile, setImagenFile] = useState(null);

  const [formData, setFormData] = useState({
    nombre: "",
    apellidos: "",
    correoElectronico: "",
    fechaNacimiento: "",
    nivel: "",
    imagenPerfil: "",
  });

  const userId = sessionStorage.getItem("userId");

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await fetch(`http://localhost:8080/usuarios/id/${userId}`, {
          method: "GET",
          headers: {
            Authorization: `Bearer ${sessionStorage.getItem("token")}`,
          },
        });

        if (!response.ok) throw new Error("Error al cargar datos del usuario");

        const data = await response.json();
        setUser(data);
        setFormData({
          nombre: data.nombre || "",
          apellidos: data.apellidos || "",
          correoElectronico: data.correoElectronico || "",
          fechaNacimiento: data.fechaNacimiento?.split(" ")[0] || "",
          nivel: data.nivel || "",
          imagenPerfil: data.imagenPerfil || "",
        });
      } catch (error) {
        console.error(error);
        alert("No se pudo cargar el usuario");
      }
    };

    if (userId) {
      fetchUser();
    }
  }, [userId  ]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const userEditado = new FormData();
    userEditado.append("nombre", formData.nombre);
    userEditado.append("apellidos", formData.apellidos);
    userEditado.append("correoElectronico", formData.correoElectronico);
    userEditado.append("fechaNacimiento", formData.fechaNacimiento);
    userEditado.append("nivel", formData.nivel);

    if (imagenFile) {
      userEditado.append("imagenPerfil", imagenFile);
    }

    try {
      const response = await fetch(`http://localhost:8080/usuarios/${userId}`, {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${sessionStorage.getItem("token")}`,
        },
        body: userEditado,
      });

      if (!response.ok) throw new Error("Error al actualizar");

      alert("Perfil actualizado");
      navigate("/profile");
    } catch (error) {
      alert("Error al actualizar el perfil");
      console.error(error);
    }
  };

  if (!user) return <p>Cargando datos del usuario...</p>;

  return (
    <div className="EditUserPage">
      <Header />
      <div className="edit-user-page">
        <form onSubmit={handleSubmit} className="edit-user-form">
          <h1>EDITAR USUARIO</h1>

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
            <label>Imagen de Perfil</label>
            <input
              type="file"
              name="imagenPerfil"
              accept="image/*"
              onChange={(e) => setImagenFile(e.target.files?.[0] || null)}
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
