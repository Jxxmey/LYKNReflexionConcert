import React, { useState } from 'react';

// นำเข้าโลโก้ Reflexion สำหรับทำหลังไพ่
import reflexionLogo from '../assets/Reflexion.png';

const Tarot = () => {
  const [selectedCard, setSelectedCard] = useState(null);
  const [isFlipping, setIsFlipping] = useState(false);
  const [isDrawing, setIsDrawing] = useState(false);
  const [error, setError] = useState(null);

  const drawRandomCard = async () => {
    if (isDrawing) return;
    
    setIsDrawing(true);
    setIsFlipping(false);
    setError(null);
    
    try {
      // ดึงข้อมูลจาก FastAPI
      const response = await fetch(`/api/tarot`); 
      if (!response.ok) throw new Error("Network response was not ok");
      const data = await response.json();
      
      // หน่วงเวลา 1.2 วินาที ให้เห็นเอฟเฟกต์สับไพ่และลุ้นระทึก
      setTimeout(() => {
        setSelectedCard({
          name: data.card,
          fileName: data.fileName,
          meaning: data.meaning
        });
        
        // หยุดสับไพ่ และเริ่มพลิกไพ่โชว์ด้านหน้า
        setIsDrawing(false);
        setIsFlipping(true);
        
      }, 1200);

    } catch (err) {
      console.error("Error drawing card:", err);
      setError("ไม่สามารถดึงข้อมูลไพ่ได้ กรุณาลองใหม่อีกครั้ง");
      setIsDrawing(false);
    }
  };

  const resetCard = () => {
    setIsFlipping(false);
    setTimeout(() => {
      setSelectedCard(null);
    }, 400); // รอให้ไพ่พลิกกลับไปก่อนค่อยเคลียร์ข้อมูล
  };

  return (
    <div className="min-h-[calc(100dvh-80px)] w-full flex flex-col items-center justify-center px-4 py-8 relative overflow-hidden bg-slate-950">
      
      {/* ฝัง CSS สำหรับ Animation สับไพ่ */}
      <style>{`
        @keyframes shuffle {
          0%, 100% { transform: translateX(0) rotate(0deg); }
          25% { transform: translateX(-4px) rotate(-3deg); }
          50% { transform: translateX(4px) rotate(3deg); }
          75% { transform: translateX(-4px) rotate(-1deg); }
        }
        .animate-shuffle {
          animation: shuffle 0.2s ease-in-out infinite;
        }
      `}</style>

      {/* Background Effect */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-indigo-900/20 rounded-full blur-[120px] pointer-events-none"></div>

      <div className="relative z-10 w-full max-w-2xl flex flex-col items-center text-center">
        <h2 className="text-3xl md:text-5xl font-black text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-indigo-300 tracking-widest drop-shadow-md mb-2 uppercase">
          Tarot Reading
        </h2>
        <p className="text-slate-400 text-sm md:text-base mb-8 md:mb-10">
          สุ่มไพ่ทาโรต์เช็คดวงการกดบัตรคอนเสิร์ต
        </p>

        {/* Card 3D Container */}
        <div 
          className="relative w-64 h-96 md:w-72 md:h-[430px] mb-8 cursor-pointer" 
          style={{ perspective: '1000px' }}
          onClick={!selectedCard && !isDrawing ? drawRandomCard : null}
        >
          {/* เลเยอร์ที่ 1: สำหรับทำแอนิเมชันสับไพ่ 2D (แยกออกมาไม่ให้ตีกับ 3D) */}
          <div className={`w-full h-full ${isDrawing ? 'animate-shuffle' : ''}`}>
            
            {/* เลเยอร์ที่ 2: ตัวพลิกไพ่ 3D */}
            <div 
              className="w-full h-full relative"
              style={{ 
                transition: 'transform 0.7s cubic-bezier(0.4, 0.2, 0.2, 1)',
                transformStyle: 'preserve-3d',
                transform: isFlipping ? 'rotateY(180deg)' : 'rotateY(0deg)'
              }}
            >
              
              {/* ด้านหลังไพ่ (Backface) - โลโก้ Reflexion */}
              <div 
                className={`absolute inset-0 flex items-center justify-center bg-slate-900 rounded-2xl border-2 transition-all duration-300 ${isDrawing ? 'border-purple-400 shadow-[0_0_50px_rgba(168,85,247,0.8)]' : 'border-indigo-500/40 shadow-[0_0_30px_rgba(99,102,241,0.3)]'}`}
                style={{ 
                  backfaceVisibility: 'hidden', 
                  WebkitBackfaceVisibility: 'hidden', // บังคับซ่อนใน Safari/iOS
                  transform: 'rotateY(0deg)' // ล็อกองศาไว้
                }}
              >
                <div className={`absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] ${isDrawing ? 'from-purple-600/40' : 'from-indigo-600/20'} to-transparent transition-colors duration-300`}></div>
                <img 
                  src={reflexionLogo} 
                  alt="Card Back" 
                  className="w-3/4 h-auto object-contain drop-shadow-[0_0_20px_rgba(168,85,247,0.5)] relative"
                />
              </div>

              {/* ด้านหน้าไพ่ (Frontface) - รูปไพ่ทาโรต์ */}
              <div 
                className="absolute inset-0 rounded-2xl border-2 border-purple-500/50 shadow-[0_0_40px_rgba(168,85,247,0.5)] bg-black overflow-hidden flex flex-col"
                style={{ 
                  backfaceVisibility: 'hidden', 
                  WebkitBackfaceVisibility: 'hidden', // บังคับซ่อนใน Safari/iOS
                  transform: 'rotateY(180deg)' // กลับด้านรอไว้
                }}
              >
                {selectedCard && (
                  <img 
                    src={`/Tarot_Card/${selectedCard.fileName}`}
                    alt={selectedCard.name}
                    className="w-full h-full object-cover"
                  />
                )}
              </div>

            </div>
          </div>
        </div>

        {/* ชื่อไพ่ และ คำทำนาย */}
        <div className="min-h-[120px] mb-8 flex flex-col items-center justify-start w-full max-w-lg px-4">
          {error && <p className="text-red-400 font-medium">{error}</p>}
          
          {isFlipping && selectedCard && (
            <div className="animate-fade-in flex flex-col items-center">
              <h3 className="text-2xl md:text-3xl font-black text-white tracking-wider drop-shadow-[0_0_10px_rgba(255,255,255,0.8)] mb-3">
                {selectedCard.name}
              </h3>
              <p className="text-indigo-200 text-base md:text-lg leading-relaxed font-medium">
                "{selectedCard.meaning}"
              </p>
            </div>
          )}
        </div>

        {/* Button */}
        {!selectedCard || (!isFlipping && !isDrawing) ? (
          <button 
            onClick={drawRandomCard}
            disabled={isDrawing}
            className={`group relative inline-flex items-center justify-center px-8 py-4 text-sm md:text-base font-black tracking-widest text-white transition-all duration-300 bg-gradient-to-r from-indigo-600 to-purple-600 rounded-full hover:from-indigo-500 hover:to-purple-500 shadow-[0_0_20px_rgba(99,102,241,0.4)] ${isDrawing ? 'opacity-90 scale-95 shadow-[0_0_40px_rgba(168,85,247,0.8)] cursor-wait' : 'hover:shadow-[0_0_30px_rgba(99,102,241,0.6)] hover:-translate-y-1'}`}
          >
            {isDrawing ? 'SHUFFLING...' : 'DRAW A CARD'}
          </button>
        ) : (
          <button 
            onClick={resetCard}
            className="px-8 py-3 text-sm md:text-base font-bold tracking-widest text-slate-300 transition-all duration-200 border border-slate-600 rounded-full hover:bg-slate-800 hover:text-white hover:border-slate-400 shadow-md"
          >
            DRAW AGAIN
          </button>
        )}

      </div>
    </div>
  );
};

export default Tarot;