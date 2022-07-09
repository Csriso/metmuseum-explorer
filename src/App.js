import './App.css';
import Index from './pages/Index';
import { Route, Routes } from "react-router"
import Navbar from './components/Navbar';
import Search from './pages/Search';

function App() {
  return (
    <div className="App">
      <Navbar />
      <Routes>
        <Route path="/" element={<Index />} />
        <Route path="/search" element={<Search />} />
      </Routes>
    </div>
  );
}

export default App;
