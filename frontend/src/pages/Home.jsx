import React, { useState, useEffect } from 'react';

// นำเข้ารูปภาพ (นำโลโก้วงกลมออก ใช้แค่ Reflexion และ Poster ตามที่แจ้งครับ)
import reflexionLogo from '../assets/Reflexion.png';
import posterImg from '../assets/Poster.jpg';

const Home = () => {
  // วันที่เป้าหมายเปิดขายบัตร: 22 สิงหาคม 2569 เวลา 10:00 น.
  const targetDate = new Date('2026-08-22T10:00:00+07:00').getTime();

  const [timeLeft, setTimeLeft] = useState({
    days: 0, hours: 0, minutes: 0, seconds: 0,
  });
  const [isSaleOpen, setIsSaleOpen] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      const now = new Date().getTime();
      const distance = targetDate - now;

      if (distance < 0) {
        clearInterval(interval);
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
        setIsSaleOpen(true);
      } else {
        setTimeLeft({
          days: Math.floor(distance / (1000 * 60 * 60 * 24)),
          hours: Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
          minutes: Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)),
          seconds: Math.floor((distance % (1000 * 60)) / 1000),
        });
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [targetDate]);

  const formatTime = (time) => (time < 10 ? `0${time}` : time);

  return (
    // ใช้ dvh เพื่อให้พอดีกับจอมือถือจริงๆ และหักลบ Navbar + Footer ประมาณ 160px ออกเพื่อไม่ให้ทะลุจอ
    <div className="h-[calc(100dvh-150px)] w-full flex flex-col items-center justify-between px-4 py-2 md:py-4 relative overflow-hidden">
      
      {/* Background Effect */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] md:w-[700px] md:h-[700px] bg-purple-900/20 rounded-full blur-[100px] pointer-events-none"></div>

      {/* 1. โลโก้ Reflexion (บนสุด) - จำกัดความสูงแบบ % เพื่อไม่ให้กินพื้นที่มากเกินไป */}
      <div className="relative z-10 w-full flex justify-center shrink-0 max-h-[10vh] md:max-h-[12vh] mt-2">
        <img 
          src={reflexionLogo} 
          alt="LYKN Reflexion Concert" 
          className="h-full w-auto object-contain drop-shadow-xl animate-fade-in"
        />
      </div>

      {/* 2. โปสเตอร์ (ตรงกลาง) - ให้พื้นที่ยืดหยุ่นที่สุด ย่อ/ขยายตามจอภาพ */}
      <div className="relative z-10 w-full flex justify-center min-h-0 max-h-[35vh] md:max-h-[45vh] my-3 md:my-4">
        <img 
          src={posterImg} 
          alt="Concert Poster" 
          className="h-full w-auto object-contain rounded-xl shadow-[0_10px_30px_rgba(0,0,0,0.6)] border border-slate-800"
        />
      </div>

      {/* 3. วันที่จัดแสดง */}
      <div className="relative z-10 bg-slate-900/60 border border-slate-700/50 backdrop-blur-md rounded-xl py-2 px-6 md:py-3 md:px-8 w-full max-w-xs md:max-w-sm shadow-xl flex flex-col items-center text-center shrink-0 mb-3 md:mb-4">
        <h2 className="text-purple-400 font-semibold tracking-widest text-[10px] md:text-xs mb-1 uppercase">
          Concert Date
        </h2>
        <p className="text-xl sm:text-2xl md:text-3xl font-black text-white tracking-wide">
          24 - 25 OCT 2026
        </p>
      </div>

      {/* 4. นับถอยหลัง (ใช้ flex เพื่อให้ตัวนับเวลาชิดกันสวยงาม) */}
      <div className="relative z-10 flex flex-col items-center w-full shrink-0 mb-3 md:mb-4">
        <h3 className="text-slate-300 font-medium mb-2 text-xs md:text-sm">
          {isSaleOpen ? "Ticket sale is now open!" : "เปิดจำหน่ายบัตรในอีก"}
        </h3>
        
        <div className="flex items-center justify-center gap-2 md:gap-4">
          {[
            { label: 'DAYS', val: timeLeft.days },
            { label: 'HOURS', val: timeLeft.hours },
            { label: 'MINS', val: timeLeft.minutes },
            { label: 'SECS', val: timeLeft.seconds, isSec: true }
          ].map((item, idx) => (
            <React.Fragment key={item.label}>
              <div className="flex flex-col items-center">
                <div className={`w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 bg-slate-800 border border-slate-600 rounded-lg flex items-center justify-center text-lg sm:text-xl md:text-2xl font-black text-white shadow-lg ${item.isSec ? 'text-purple-400' : ''}`}>
                  {formatTime(item.val)}
                </div>
                <span className="text-slate-400 text-[9px] md:text-[10px] mt-1 font-medium tracking-wider">{item.label}</span>
              </div>
              {idx < 3 && <span className="text-lg md:text-2xl font-black text-slate-600 mb-4">:</span>}
            </React.Fragment>
          ))}
        </div>
        
        {!isSaleOpen && (
          <p className="text-slate-500 text-[10px] md:text-xs mt-2">
            22 สิงหาคม 2569 เวลา 10:00 น.
          </p>
        )}
      </div>

      {/* 5. ปุ่ม Get Tickets (ล่างสุดก่อนถึง Footer) */}
      <div className="relative z-10 shrink-0 pb-2">
        <a 
          href="https://www.thaiticketmajor.com/concert/lykn-reflexion-concert.html" 
          target="_blank" 
          rel="noopener noreferrer"
          className="group relative inline-flex items-center justify-center px-6 py-3 md:px-8 md:py-4 text-xs md:text-sm font-black tracking-wide text-white transition-all duration-200 bg-gradient-to-r from-purple-600 to-blue-600 rounded-full hover:from-purple-500 hover:to-blue-500 shadow-[0_0_15px_rgba(147,51,234,0.4)] hover:shadow-[0_0_25px_rgba(147,51,234,0.6)] hover:-translate-y-1"
        >
          GET TICKETS
          <svg className="w-4 h-4 md:w-5 md:h-5 ml-2 transition-transform duration-200 group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path>
          </svg>
        </a>
      </div>

    </div>
  );
};

export default Home;