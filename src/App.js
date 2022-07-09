import logo from './logo.svg';
import './App.css';
import Index from './pages/Index';
import { Route, Routes } from "react-router"

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Index />} />
      </Routes>
    </div>
  );
}

export default App;
