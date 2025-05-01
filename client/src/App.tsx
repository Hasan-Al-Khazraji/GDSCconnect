import './App.css';
import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Landing from './pages/Landing'; 
import Register from './pages/Register';

function App() {
  return (
    // wrap in context provided so all included parts have  context
    <Routes>
      <Route path="/" element={<Landing/>} />
      <Route path="/:id" element={<Home/>} />
      <Route path="/register/:id" element={<Register/>} />
    </Routes>
  );
}

export default App;
