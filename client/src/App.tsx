import './App.css';
import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Landing from './pages/Landing'; 
import Register from './pages/Register';
import { AuthProvider } from './Contexts/AuthContext';

function App() {
  return (
    <AuthProvider>
      <Routes>
        <Route path="/" element={<Landing/>} />
        <Route path="/:id" element={<Home/>} />
        <Route path="/register/:id" element={<Register/>} />
      </Routes>
    </AuthProvider>
  );
}

export default App;
