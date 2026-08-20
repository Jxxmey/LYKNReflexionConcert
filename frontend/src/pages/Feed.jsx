import React, { useEffect } from 'react';

const Feed = () => {
  useEffect(() => {
    // โหลด Script ของ Elfsight เมื่อเข้ามาหน้านี้
    const scriptId = "elfsight-platform-script";
    
    // ป้องกันการโหลดสคริปต์ซ้ำซ้อน
    if (!document.getElementById(scriptId)) {
      const script = document.createElement("script");
      script.id = scriptId;
      script.src = "https://elfsightcdn.com/platform.js";
      script.async = true;
      document.body.appendChild(script);
    }
  }, []);

  return (
    <div className="min-h-[calc(100dvh-80px)] w-full flex flex-col items-center py-10 px-4 relative overflow-hidden bg-slate-950">
      
      {/* Background Effect */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[500px] bg-blue-900/20 rounded-full blur-[150px] pointer-events-none"></div>

      <div className="relative z-10 w-full max-w-4xl mx-auto flex flex-col items-center">
        
        {/* หัวข้อหน้า */}
        <h2 className="text-3xl md:text-5xl font-black text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-indigo-300 tracking-widest drop-shadow-md mb-2 uppercase flex items-center gap-3">
          <svg viewBox="0 0 24 24" fill="currentColor" className="w-8 h-8 md:w-10 md:h-10 text-blue-400">
            <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"></path>
          </svg>
          SOCIAL FEED
        </h2>
        <p className="text-slate-400 text-sm md:text-base mb-8 md:mb-10 uppercase tracking-widest text-center">
          อัปเดตข่าวสารล่าสุดจาก LYKN Official
        </p>

        {/* ปุ่มลิงก์ไปหน้า X */}
        <a 
          href="https://twitter.com/LYKNofficial" 
          target="_blank" 
          rel="noopener noreferrer"
          className="mb-8 px-6 py-2.5 bg-blue-600/20 text-blue-400 border border-blue-500/50 rounded-full text-sm font-bold hover:bg-blue-600 hover:text-white transition-all flex items-center gap-2 shadow-[0_0_15px_rgba(59,130,246,0.3)] hover:shadow-[0_0_20px_rgba(59,130,246,0.5)]"
        >
          View on X (Twitter)
        </a>

        {/* กล่องแสดงฟีด Elfsight | Reflexion */}
        <div className="w-full bg-[#0c0f1a]/80 backdrop-blur-sm rounded-3xl border border-slate-800 p-2 sm:p-4 shadow-[0_10px_40px_rgba(0,0,0,0.5)] min-h-[600px] flex justify-center overflow-hidden">
          <div className="w-full">
            {/* วิดเจ็ตของ Elfsight */}
            <div className="elfsight-app-36f8bf05-5569-4b5f-ba36-e078dbe76add" data-elfsight-app-lazy="true"></div>
          </div>
        </div>

      </div>
    </div>
  );
};

export default Feed;