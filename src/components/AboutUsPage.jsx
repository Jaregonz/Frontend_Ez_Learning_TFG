import React from "react";
import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";
import "../styles/style.css";
import "../styles/footer.css";
import "../styles/header.css";
import Header from "./Header";
import Footer from "./Footer";

const AboutUsPage = () => {
  return (
    <div className="AboutUsPage">
    <Header />
    <div className="sobre-nosotros-container">
      <section class="intro-section">
      <div class="intro-text">
        <h2>¿QUÉ ES EZLEARNING?</h2>
        <p>
          EzLearning es una innovadora plataforma educativa diseñada para hacer del
          aprendizaje una experiencia interactiva, accesible y altamente efectiva. Pensada
          especialmente para quienes se preparan para certificados oficiales de inglés, ofrece
          herramientas prácticas y dinámicas tanto para estudiantes como para profesores.
        </p>
        <p>
          Gracias a EzLearning, los docentes pueden guiar a sus alumnos en su preparación
          para las pruebas de forma personalizada y eficiente, optimizando el proceso de enseñanza.
          Nuestro objetivo es transformar la educación aprovechando todo el potencial de la tecnología.
        </p>
      </div>
      <div class="intro-image">
        <img src="../img/Icono EzLearning.png" alt="Logo EzLearning"/>
      </div>
    </section>

    <section class="about-me">
      <div class="profile-photo">
        <img src="../img/foto_jacinto.png" alt="Foto del desarrollador"/>
      </div>
      <div class="about-text">
        <h2>SOBRE MÍ</h2>
        <p>
          Soy un desarrollador comprometido con la creación de experiencias educativas innovadoras.
          Actualmente estoy trabajando en EzLearning, una plataforma que combina tecnología y pedagogía
          para ofrecer una forma accesible, interactiva y efectiva de preparar exámenes de inglés u otros
          contenidos académicos.
        </p>
        <p>
          Mi enfoque se centra tanto en el backend —utilizando Spring Boot y Gradle para construir una arquitectura
          sólida— como en el frontend, donde desarrollo interfaces modernas e intuitivas con React.
          He diseñado EzLearning pensando en alumnos y profesores, integrando funcionalidades como creación de tests,
          seguimiento de puntuaciones, exámenes con entregas evaluables y perfiles personalizados.
        </p>
        <p>
          Creo firmemente que la tecnología puede ser una herramienta poderosa para mejorar el aprendizaje,
          y mi objetivo es seguir construyendo soluciones que marquen una diferencia real en la educación.
        </p>
      </div>
    </section>

      <section className="donate-section">
        <h2 className="section-title">¿QUIERES APOYARME EN MI PROYECTO?</h2>
        <p className="donate-subtext">
          ¿Te gusta EzLearning? Ayúdanos a seguir creciendo con tu donativo. Cada aporte cuenta para seguir mejorando. ¡Gracias por tu apoyo!
        </p>

        <PayPalScriptProvider options={{ "client-id": "AVE65qOUFcQJp5UvBwjIIFia7WM-9RTFzGk_Ywz8jrk2h8XZ4XEOFVn0dFJKZ0YNBqzgMHAdo2pk81SK" }}>
        <div className="botones-paypal">
          <PayPalButtons
            style={{ layout: "vertical", color: "blue", shape: "pill", label: "donate",width: 200 }}
            createOrder={(data, actions) => {
              return actions.order.create({
                purchase_units: [
                  {
                    amount: {
                      value: "5.00",
                    },
                  },
                ],
              });
            }}
            onApprove={(data, actions) => {
              return actions.order.capture().then((details) => {
                alert(`¡Gracias por tu donación, ${details.payer.name.given_name}!`);
              });
            }}
          />
        </div>
        </PayPalScriptProvider>
      </section>
    </div>
    <Footer />
    </div>
  );
};

export default AboutUsPage;
