import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import circleLogo from '../assets/logo.png'; 

const Navbar = () => {
  const location = useLocation();

  const isActive = (path) => location.pathname === path;

  return (
    <nav className="fixed top-0 w-full z-50 bg-slate-950/80 backdrop-blur-md border-b border-slate-800 transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 md:h-20">
          
          <Link to="/" className="flex-shrink-0 flex items-center gap-3 group">
            <img 
              src={circleLogo} 
              alt="Logo" 
              className="w-10 h-10 object-contain group-hover:scale-110 transition-transform duration-300" 
            />
            <span className="font-black tracking-widest text-lg text-white hidden sm:block">
              REFLEXION
            </span>
          </Link>
          
          {/* เมนูลิงก์นำทาง */}
          <div className="flex space-x-4 sm:space-x-6 md:space-x-10">
            <Link 
              to="/" 
              className={`text-xs sm:text-sm md:text-base font-bold tracking-wider transition-all duration-200 ${
                isActive('/') 
                  ? 'text-purple-400 drop-shadow-[0_0_8px_rgba(168,85,247,0.5)]' 
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              HOME
            </Link>
            <Link 
              to="/seatmap" 
              className={`text-xs sm:text-sm md:text-base font-bold tracking-wider transition-all duration-200 ${
                isActive('/seatmap') 
                  ? 'text-purple-400 drop-shadow-[0_0_8px_rgba(168,85,247,0.5)]' 
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              SEAT MAP
            </Link>
            {/* เพิ่มเมนูไพ่ทาโรต์ตรงนี้ */}
            <Link 
              to="/tarot" 
              className={`text-xs sm:text-sm md:text-base font-bold tracking-wider transition-all duration-200 ${
                isActive('/tarot') 
                  ? 'text-indigo-400 drop-shadow-[0_0_8px_rgba(99,102,241,0.5)]' 
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              TAROT
            </Link>

            <Link 
              to="/Artists" 
              className={`text-xs sm:text-sm md:text-base font-bold tracking-wider transition-all duration-200 ${
                isActive('/tarot') 
                  ? 'text-indigo-400 drop-shadow-[0_0_8px_rgba(99,102,241,0.5)]' 
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              ARTISTS
            </Link>     

            <Link 
              to="/Feed" 
              className={`text-xs sm:text-sm md:text-base font-bold tracking-wider transition-all duration-200 ${
                isActive('/tarot') 
                  ? 'text-indigo-400 drop-shadow-[0_0_8px_rgba(99,102,241,0.5)]' 
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              FEEDS
            </Link>                  
          </div>

        </div>
      </div>
    </nav>
  );
};

export default Navbar;