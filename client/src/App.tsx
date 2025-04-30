import './App.css';
import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Landing from './pages/Landing'; 

function App() {
  return (
    // wrap in context provided so all included parts have  context
    <Routes>
      <Route path="/" element={<Landing/>} />
      <Route path="/:id" element={<Home/>} />
    </Routes>
  );
}

export default App;
