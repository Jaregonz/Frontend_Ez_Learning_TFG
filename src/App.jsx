import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import './styles/style.css';
import './styles/footer.css';
import './styles/header.css';
import LandingPage from './components/LandingPage';
import HomePage from './components/HomePage';
import RegisterPage from './components/RegisterPage';

function App() {
  return (
    <Router>
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/home" element={<HomePage />} />
      <Route path="/register" element={<RegisterPage />} />
    </Routes>
  </Router>
  );
}

export default App;
