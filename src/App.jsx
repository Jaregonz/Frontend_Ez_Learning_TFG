import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import './styles/style.css';
import './styles/footer.css';
import './styles/header.css';
import LandingPage from './components/LandingPage';
import HomePage from './components/HomePage';
import RegisterPage from './components/RegisterPage';
import TestsPage from './components/TestsPage';
import ProfilePage from './components/ProfilePage';
import ProfesorHomePage from './components/ProfesorHomePage';
function App() {
  return (
    <Router>
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/home" element={<HomePage />} />
      <Route path="/register" element={<RegisterPage />} />
      <Route path="/tests" element={<TestsPage />} />
      <Route path="/profile" element={<ProfilePage />} />
      <Route path="/teacher-dashboard" element={<ProfesorHomePage />} />
    </Routes>
  </Router>
  );
}

export default App;
