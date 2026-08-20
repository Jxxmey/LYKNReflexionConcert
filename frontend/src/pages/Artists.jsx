import React from 'react';

// 1. นำเข้ารูปภาพศิลปินจากโฟลเดอร์ local (assets/artists/)
import imgWilliam from '../assets/artists/William.jpg';
import imgLego from '../assets/artists/Lego.jpg';
import imgNut from '../assets/artists/Nut.jpg';
import imgHong from '../assets/artists/Hong.jpg';
import imgTui from '../assets/artists/Tui.jpg';

const Artists = () => {
  // 2. ข้อมูลศิลปิน โดยใช้ตัวแปรรูปภาพที่ import มาแทนลิงก์
  const artistsData = [
    {
      id: 'william',
      nameEN: 'WILLIAM : Jakrapatr Kaewpanpong',
      nameTH: 'วิลเลี่ยม : จักรภัทร แก้วพันธุ์พงษ์',
      dob: '14 February 2005',
      weight: '65 kg',
      height: '178 cm',
      image: imgWilliam, // ใช้รูป local
      social: {
        ig: 'https://www.instagram.com/williamjkp',
        igName: 'williamjkp',
        tw: 'https://twitter.com/williamjkp1',
        twName: 'williamjkp1',
        tk: 'https://www.tiktok.com/@jkpwilliam',
        tkName: '@jkpwilliam'
      }
    },
    {
      id: 'lego',
      nameEN: 'LEGO : Rapeepong Supatineekitdecha',
      nameTH: 'เลโก้ : รพีพงศ์ ศุภธินีกิตติ์เดชา',
      dob: '11 February 2006',
      weight: '56 kg',
      height: '170 cm',
      image: imgLego, // ใช้รูป local
      social: {
        ig: 'https://www.instagram.com/le_tsgo_eating',
        igName: 'le_tsgo_eating',
        tw: 'https://twitter.com/realxlg',
        twName: 'realxlg',
        tk: 'https://www.tiktok.com/@lgeat',
        tkName: '@lgeat'
      }
    },
    {
      id: 'nut',
      nameEN: 'NUT : Thanat Danjesda',
      nameTH: 'นัท : ธนัท ด่านเจษฎา',
      dob: '20 April 2003',
      weight: '68 kg',
      height: '178 cm',
      image: imgNut, // ใช้รูป local
      social: {
        ig: 'https://www.instagram.com/nnutdan',
        igName: 'nnutdan',
        tw: 'https://twitter.com/nnutdan',
        twName: 'nnutdan',
        tk: 'https://www.tiktok.com/@nnutdan',
        tkName: '@nnutdan'
      }
    },
    {
      id: 'hong',
      nameEN: 'HONG : Pichetpong Chiradatesakunvong',
      nameTH: 'ฮง : พิเชฐพงศ์ จิรเดชสกุลวงศ์',
      dob: '16 October 2003',
      weight: '68 kg',
      height: '178 cm',
      image: imgHong, // ใช้รูป local
      social: {
        ig: 'https://www.instagram.com/hongshihoshi',
        igName: 'hongshihoshi',
        tw: 'https://twitter.com/hongshihoshi03',
        twName: 'hongshihoshi03',
        tk: 'https://www.tiktok.com/@hongshihoshi',
        tkName: '@hongshihoshi'
      }
    },
    {
      id: 'tui',
      nameEN: 'TUI : Chayatorn Trairattanapradit',
      nameTH: 'ตุ้ย : ชยธร ไตรรัตนประดิษฐ์',
      dob: '24 March 2004',
      weight: '65 kg',
      height: '175 cm',
      image: imgTui, // ใช้รูป local
      social: {
        ig: 'https://www.instagram.com/m.tuiiii',
        igName: 'm.tuiiii',
        tw: 'https://twitter.com/TuiChayatorn',
        twName: 'TuiChayatorn',
        tk: 'https://www.tiktok.com/@m.tuiiii',
        tkName: '@m.tuiiii'
      }
    }
  ];

  // ไอคอน SVG
  const IconIG = () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4">
      <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
      <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
    </svg>
  );

  const IconX = () => (
    <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"></path>
    </svg>
  );

  const IconTikTok = () => (
    <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
      <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z"></path>
    </svg>
  );

  return (
    <div className="min-h-screen w-full flex flex-col items-center py-10 px-4 relative overflow-hidden bg-slate-950">
      
      {/* Background Effect */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-purple-900/20 rounded-full blur-[150px] pointer-events-none"></div>

      <div className="relative z-10 w-full max-w-7xl mx-auto flex flex-col items-center">
        
        {/* หัวข้อหน้า */}
        <h2 className="text-3xl md:text-5xl font-black text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-indigo-300 tracking-widest drop-shadow-md mb-2 uppercase">
          LYKN MEMBERS
        </h2>
        <p className="text-slate-400 text-sm md:text-base mb-10 md:mb-14 uppercase tracking-widest">
          Reflexion Concert Artists
        </p>

        {/* Grid แสดงการ์ดศิลปิน */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6 md:gap-8 w-full">
          {artistsData.map((artist) => (
            <div 
              key={artist.id} 
              className="group flex flex-col bg-[#0c0f1a] rounded-2xl overflow-hidden border border-slate-800 shadow-[0_10px_30px_rgba(0,0,0,0.5)] hover:border-purple-500/50 hover:shadow-[0_0_30px_rgba(168,85,247,0.3)] transition-all duration-300 transform hover:-translate-y-2"
            >
              {/* ส่วนรูปภาพ */}
              <div className="relative w-full aspect-[3/4] overflow-hidden bg-slate-900">
                <div className="absolute inset-0 bg-gradient-to-t from-[#0c0f1a] via-transparent to-transparent z-10 opacity-80"></div>
                <img 
                  src={artist.image} 
                  alt={artist.nameEN} 
                  className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-700 ease-out"
                />
              </div>

              {/* ส่วนเนื้อหาข้อมูล */}
              <div className="relative z-20 flex flex-col flex-1 p-5 -mt-10">
                
                {/* ชื่อ */}
                <div className="text-center mb-4">
                  <h3 className="text-lg font-black text-white leading-tight drop-shadow-md">
                    {artist.nameEN.split(' : ')[0]}
                  </h3>
                  <p className="text-[10px] sm:text-xs text-purple-300 font-medium mt-1 truncate">
                    {artist.nameEN.split(' : ')[1]}
                  </p>
                  <p className="text-[10px] sm:text-xs text-slate-400 mt-1">
                    {artist.nameTH}
                  </p>
                </div>

                {/* ข้อมูลส่วนตัว */}
                <div className="flex flex-col gap-2 text-[11px] sm:text-xs text-slate-300 mb-5 bg-slate-900/50 p-3 rounded-xl border border-slate-800">
                  <div className="flex justify-between border-b border-slate-800 pb-1">
                    <span className="text-slate-500 font-bold">DOB</span>
                    <span>{artist.dob}</span>
                  </div>
                  <div className="flex justify-between border-b border-slate-800 pb-1">
                    <span className="text-slate-500 font-bold">HEIGHT</span>
                    <span>{artist.height}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-500 font-bold">WEIGHT</span>
                    <span>{artist.weight}</span>
                  </div>
                </div>

                {/* ปุ่ม Social Media */}
                <div className="flex flex-col gap-2 mt-auto">
                  <a href={artist.social.ig} target="_blank" rel="noopener noreferrer" className="flex items-center justify-center gap-2 w-full py-2 bg-gradient-to-r from-pink-600 to-purple-600 rounded-lg text-white text-xs font-bold hover:brightness-110 transition-all">
                    <IconIG /> {artist.social.igName}
                  </a>
                  <div className="flex gap-2 w-full">
                    <a href={artist.social.tw} target="_blank" rel="noopener noreferrer" className="flex items-center justify-center gap-1.5 flex-1 py-2 bg-black border border-slate-700 rounded-lg text-white text-[10px] font-bold hover:bg-slate-900 transition-all">
                      <IconX /> {artist.social.twName}
                    </a>
                    <a href={artist.social.tk} target="_blank" rel="noopener noreferrer" className="flex items-center justify-center gap-1.5 flex-1 py-2 bg-black border border-slate-700 rounded-lg text-white text-[10px] font-bold hover:bg-slate-900 transition-all">
                      <IconTikTok /> {artist.social.tkName.replace('@', '')}
                    </a>
                  </div>
                </div>

              </div>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
};

export default Artists;