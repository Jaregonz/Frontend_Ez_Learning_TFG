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
import CreateTestPage from './components/CreateTestPage';
import StartTestScreen from './components/StartTestScreen';
import TestPage from './components/TestPage';
import EditUserPage from './components/EditUserPage';
import ExamenesPage from './components/ExamenesPage';
import CreateExamenPage from './components/CreateExamenPage';
import EntregasListPage from './components/EntregasListPage';
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
      <Route path="/create-test" element={<CreateTestPage />} />
      <Route path="/start-test/:id" element={<StartTestScreen />} />
      <Route path="/test/:id" element={<TestPage />} />
      <Route path="/edit-user" element={<EditUserPage />} />
      <Route path="/exams" element={<ExamenesPage />} />
      <Route path="/create-exam" element={<CreateExamenPage />} />
      <Route path="/entregas/:id" element={<EntregasListPage />} />

    </Routes>
  </Router>
  );
}

export default App;
