import { BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import './App.css';
import AdminPage from './page/AdminPage';
import LoginPage from './page/LoginPage';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<AdminPage />} />
        <Route path="/signin" element={<LoginPage />} />
      </Routes>
    </Router>
  );
}

export default App;
