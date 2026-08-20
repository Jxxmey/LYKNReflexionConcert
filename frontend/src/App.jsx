import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

// นำเข้าหน้าต่างๆ
import Navbar from './components/Navbar';
import Home from './pages/Home'; 
import SeatMap from './pages/SeatMap'; 
import Tarot from './pages/Tarot'; 
import Artists from './pages/Artists';
import Feed from './pages/Feed';

function App() {
  return (
    <Router>
      <div className="font-sans min-h-screen bg-slate-950 text-white selection:bg-purple-500 selection:text-white flex flex-col">
        
        <Navbar />

        <main className="flex-grow pt-16 md:pt-20">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/seatmap" element={<SeatMap />} />
            <Route path="/tarot" element={<Tarot />} />
            <Route path="/artists" element={<Artists />} /> {/* 2. เพิ่ม Route ตรงนี้ */}
            <Route path="/Feed" element={<Feed />} />
          </Routes>
        </main>

        <footer className="w-full py-6 text-center border-t border-slate-800/50 mt-auto bg-slate-950 relative z-20">
          <p className="text-slate-500 text-xs font-semibold tracking-widest uppercase">
            Powered by Jaiidees
          </p>
        </footer>

      </div>
    </Router>
  );
}

export default App;