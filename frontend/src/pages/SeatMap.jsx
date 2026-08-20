import React, { useState, useMemo } from 'react';
import mapData from '../data/mapData.json';
import sheetData from '../data/sheetData.json';

const SeatMap = () => {
  const [selectedZone, setSelectedZone] = useState(null);

  // 1. ตรรกะราคาและสี (อิงตามโปสเตอร์ล่าสุด)
  const PRICING = {
    6900: { color: '#2D2356', name: '6,900 THB' },
    5900: { color: '#4A6FA5', name: '5,900 THB' },
    5500: { color: '#74BBE4', name: '5,500 THB' },
    5000: { color: '#763E97', name: '5,000 THB' },
    4500: { color: '#EF5B91', name: '4,500 THB' },
    3000: { color: '#768C81', name: '3,000 THB' },
    2000: { color: '#A9B897', name: '2,000 THB' },
    1500: { color: '#D5E0C2', name: '1,500 THB' },
    'No_Sell': { color: '#475569', name: 'Not Available (NS)' }
  };

  const CLICKABLE_ZONES = [
    'C','D','E','F','G','H','I','J','K','L','M','N','O','P','Q','R','S',
    'SB','SC','SD','SE','SF','SG','SH','SI','SJ','SK','SL','SM','SN'
  ];

  // 2. ประมวลผลข้อมูล JSON
  const { allSeats, labelPositions } = useMemo(() => {
    const list = [];
    const positions = {};
    
    const coordMap = {};
    if (mapData && mapData.z) {
      mapData.z.forEach(tier => {
        tier.sc.forEach(zone => {
          zone.r.forEach(row => {
            row.st.forEach((seat, index) => {
               coordMap[`${zone.n}-${row.n}-${index + 1}`] = { x: seat.e.x, y: seat.e.y };
            });
          });
        });
      });
    }

    if (!sheetData || sheetData.length === 0) return { allSeats: list, labelPositions: positions };

    sheetData.forEach((rowObj) => {
      const zoneName = rowObj.Zone;
      if (!CLICKABLE_ZONES.includes(zoneName)) return;

      const rowName = rowObj.Row;
      const price = Number(rowObj.Price); 

      Object.keys(rowObj).forEach((key) => {
        if (key.startsWith("Seat")) {
           const seatValue = String(rowObj[key]).trim().toUpperCase();
           const colIndex = parseInt(key.replace("Seat", ""), 10);
           
           const isBlank = (seatValue === 'X' || seatValue === '');
           const isNoSell = (seatValue === 'NS' || seatValue === '00');
           
           const finalPrice = isNoSell ? 'No_Sell' : price;
           const coords = coordMap[`${zoneName}-${rowName}-${colIndex}`] || { x: colIndex * 10, y: 0 };

           list.push({
             id: `${zoneName}-${rowName}-${colIndex}`,
             zone: zoneName,
             row: rowName,
             colIndex: colIndex, 
             displayNum: isNoSell ? 'NS' : seatValue,
             x: coords.x,
             y: coords.y,
             price: finalPrice,
             color: isBlank ? 'transparent' : (isNoSell ? PRICING['No_Sell'].color : (PRICING[finalPrice]?.color || '#888')),
             isBlank: isBlank,
             isNoSell: isNoSell
           });

           if (!isBlank && !isNoSell && coords.y !== 0) {
             if (!positions[zoneName]) positions[zoneName] = { x: 0, y: 0, count: 0 };
             positions[zoneName].x += coords.x;
             positions[zoneName].y += coords.y;
             positions[zoneName].count += 1;
           }
        }
      });
    });

    Object.keys(positions).forEach(k => {
      positions[k].x /= positions[k].count;
      positions[k].y /= positions[k].count;
    });

    return { allSeats: list, labelPositions: positions };
  }, []);

  // ---------- 3. Render ภาพรวม (Macro Map) ----------
  const renderMacroMap = () => (
    <div className="w-full h-full flex flex-col animate-fade-in">
      <div className="flex-1 w-full bg-[#111111] rounded-2xl shadow-2xl border border-slate-800 p-4 sm:p-6 flex items-center justify-center overflow-hidden min-h-0 relative">
        <svg viewBox="0 0 600 600" className="w-full h-full drop-shadow-lg object-contain">
          <defs>
            <linearGradient id="grad-2price-left" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor={PRICING[2000].color} />
              <stop offset="25%" stopColor={PRICING[2000].color} />
              <stop offset="25%" stopColor={PRICING[3000].color} />
              <stop offset="100%" stopColor={PRICING[3000].color} />
            </linearGradient>
            <linearGradient id="grad-2price-right" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor={PRICING[3000].color} />
              <stop offset="75%" stopColor={PRICING[3000].color} />
              <stop offset="75%" stopColor={PRICING[2000].color} />
              <stop offset="100%" stopColor={PRICING[2000].color} />
            </linearGradient>
            <linearGradient id="grad-2price-down" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor={PRICING[3000].color} />
              <stop offset="75%" stopColor={PRICING[3000].color} />
              <stop offset="75%" stopColor={PRICING[2000].color} />
              <stop offset="100%" stopColor={PRICING[2000].color} />
            </linearGradient>
            <linearGradient id="grad-3price-down" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor={PRICING[3000].color} />
              <stop offset="55%" stopColor={PRICING[3000].color} />
              <stop offset="55%" stopColor={PRICING[2000].color} />
              <stop offset="90%" stopColor={PRICING[2000].color} />
              <stop offset="90%" stopColor={PRICING[1500].color} />
              <stop offset="100%" stopColor={PRICING[1500].color} />
            </linearGradient>
          </defs>

          {mapData.assets && mapData.assets.map((asset, index) => (
            <path key={`asset-${index}`} d={asset.d} fill="#262626" />
          ))}

          <rect x="180" y="50" width="240" height="60" fill="white" rx="4" />
          <text x="300" y="88" fill="black" fontSize="28" fontWeight="900" textAnchor="middle" tracking="2">STAGE</text>

          {mapData.z && mapData.z.map((tier) => 
            tier.sc.map((zone, zIndex) => {
              const zoneName = zone.n;
              if (!CLICKABLE_ZONES.includes(zoneName)) return null;

              let fillUrl = PRICING[4500].color;
              if (['SG','SH','SI'].includes(zoneName)) fillUrl = PRICING[5000].color;
              else if (['C','D','E'].includes(zoneName)) fillUrl = "url(#grad-2price-left)";
              else if (['Q','R','S'].includes(zoneName)) fillUrl = "url(#grad-2price-right)";
              else if (['K'].includes(zoneName)) fillUrl = "url(#grad-2price-down)";
              else if (['F','G','H','I','J','L','M','N','O','P'].includes(zoneName)) fillUrl = "url(#grad-3price-down)";

              return (
                <path 
                  key={`zone-${zoneName}-${zIndex}-${tier.n}`} 
                  d={zone.d} 
                  fill={fillUrl} 
                  stroke="#111" 
                  strokeWidth="1.2"
                  onClick={() => setSelectedZone(zoneName)}
                  className="cursor-pointer hover:brightness-125 hover:drop-shadow-[0_0_8px_rgba(255,255,255,0.4)] transition-all duration-200"
                />
              )
            })
          )}

          {Object.keys(labelPositions).map(zone => (
            <g key={`lbl-${zone}`} className="pointer-events-none drop-shadow-md">
              <text x={labelPositions[zone].x} y={labelPositions[zone].y + 6} fill="white" fontSize="18" fontWeight="900" textAnchor="middle">
                {zone}
              </text>
              {['SB', 'SN'].includes(zone) && (
                <text x={labelPositions[zone].x} y={labelPositions[zone].y + 18} fill="white" fontSize="7" fontWeight="bold" textAnchor="middle" opacity="0.8">
                  RESTRICTED
                </text>
              )}
            </g>
          ))}
        </svg>
      </div>
    </div>
  );

  // ---------- 4. Render ผังที่นั่งย่อย (Micro Map) ----------
  const renderMicroMap = () => {
    const zoneSeats = allSeats.filter(s => s.zone === selectedZone);
    if (zoneSeats.length === 0) return null;

    const columnsWithSeats = new Set();
    zoneSeats.forEach(s => {
      if (!s.isBlank) columnsWithSeats.add(s.colIndex);
    });

    const rowsMap = {};
    zoneSeats.forEach(s => {
      if (!rowsMap[s.row]) rowsMap[s.row] = [];
      rowsMap[s.row].push(s);
    });

    const sortedRows = Object.keys(rowsMap).sort((a, b) => {
      if (a.length !== b.length) return b.length - a.length;
      return a.localeCompare(b);
    });

    return (
      <div className="w-full h-full flex flex-col animate-fade-in">
        <div className="w-full flex justify-between items-center mb-4 px-2 shrink-0">
          <button 
            onClick={() => setSelectedZone(null)} 
            className="px-3 py-2 sm:px-4 sm:py-2 bg-slate-800 hover:bg-slate-700 rounded-lg font-bold text-white transition border border-slate-600 text-xs sm:text-sm shadow-md"
          >
            ← กลับผังรวม
          </button>
          <div className="text-right">
            <h3 className="text-xl sm:text-2xl md:text-3xl font-black text-white leading-none">Zone {selectedZone}</h3>
            <p className="text-[10px] sm:text-xs text-slate-400 mt-1">
              ที่นั่งว่าง: <span className="text-emerald-400 font-bold">
                {zoneSeats.filter(s => !s.isBlank && !s.isNoSell).length}
              </span> ที่นั่ง
            </p>
          </div>
        </div>

        <div className="flex-1 w-full bg-[#111111] rounded-2xl shadow-2xl border border-slate-800 p-4 sm:p-6 flex flex-col items-center overflow-auto min-h-0 relative">
          <div className="w-[180px] sm:w-[220px] h-6 sm:h-7 bg-white rounded-b-xl mb-6 text-[10px] sm:text-xs text-black flex items-center justify-center font-extrabold tracking-widest shadow-md shrink-0">
            STAGE (ด้านหน้า)
          </div>

          <div className="flex flex-col gap-2 w-max pb-4">
            {sortedRows.map(rowName => {
              const seatsInRow = rowsMap[rowName]
                .filter(s => columnsWithSeats.has(s.colIndex))
                .sort((a, b) => a.colIndex - b.colIndex);
              
              const hasVisibleSeat = seatsInRow.some(s => !s.isBlank);
              if (!hasVisibleSeat) return null;

              return (
                <div key={`row-${rowName}`} className="flex items-center gap-1.5 w-full hover:bg-slate-800/40 rounded transition-colors py-1 px-2">
                  <div className="w-6 sm:w-8 flex items-center justify-end pr-1 sm:pr-2">
                    <span className="font-black text-slate-400 text-xs sm:text-sm">
                      {rowName}
                    </span>
                  </div>

                  <div className="flex gap-1 sm:gap-1.5 justify-center flex-1">
                    {seatsInRow.map((seat) => {
                      if (seat.isBlank) {
                        return <div key={seat.id} className="w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8 flex-shrink-0"></div>;
                      }

                      if (seat.isNoSell) {
                         return (
                          <div 
                            key={seat.id} 
                            style={{ backgroundColor: seat.color }}
                            className="w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8 rounded flex-shrink-0 flex items-center justify-center text-[8px] sm:text-[9px] font-bold text-white/50 opacity-60 cursor-not-allowed"
                            title="Not Available"
                          >
                            NS
                          </div>
                        );
                      }

                      return (
                        <button
                          key={seat.id}
                          onClick={() => {
                            alert(`Zone ${seat.zone} | Row ${seat.row} | Seat ${seat.displayNum}\nราคา: ${Number(seat.price).toLocaleString()} บาท`);
                          }}
                          style={{ backgroundColor: seat.color }}
                          className="w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8 rounded flex-shrink-0 flex items-center justify-center text-[9px] sm:text-[10px] md:text-xs font-bold text-white transition-all transform hover:scale-110 hover:ring-2 hover:ring-white shadow-sm"
                          title={`Zone ${seat.zone} | Row ${seat.row} | Seat ${seat.displayNum} | ${Number(seat.price).toLocaleString()} THB`}
                        >
                          {seat.displayNum}
                        </button>
                      );
                    })}
                  </div>

                  <div className="w-6 sm:w-8 flex items-center justify-start pl-1 sm:pl-2">
                    <span className="font-black text-slate-400 text-xs sm:text-sm">
                      {rowName}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>

          <p className="mt-4 text-slate-500 text-[10px] sm:text-xs text-center shrink-0">
            คลิกที่ปุ่มตัวเลขที่นั่งเพื่อดูรายละเอียดราคาและทำรายการจอง (NS = ไม่เปิดจำหน่าย)
          </p>
        </div>
      </div>
    );
  };

  // ---------- ส่วนป้ายราคา ----------
  const renderPricing = () => (
    <div className="flex flex-row lg:flex-col flex-wrap gap-x-4 gap-y-3 justify-center lg:justify-start bg-[#0c0f1a] p-4 lg:p-6 rounded-2xl border border-slate-800 w-full h-full overflow-y-auto shadow-inner">
      <h3 className="w-full text-center lg:text-left text-white font-extrabold tracking-widest mb-1 lg:mb-3 text-sm lg:text-base shrink-0">
        PRICING
      </h3>
      <div className="flex flex-row lg:flex-col flex-wrap gap-3 w-full">
        {/* ใช้ราคาชุดใหม่ที่ตรงกับโปสเตอร์ 100% */}
        {[6900, 5900, 5500, 5000, 4500, 3000, 2000, 1500, 'No_Sell'].map(price => (
          <div key={price} className="flex items-center gap-2 lg:gap-3 w-max lg:w-full shrink-0">
            <div className="w-4 h-4 sm:w-5 sm:h-5 rounded shadow-sm border border-white/10 shrink-0" style={{ background: PRICING[price].color }}></div>
            <span className="text-gray-300 font-medium text-[11px] sm:text-xs lg:text-sm whitespace-nowrap">
              {PRICING[price].name}
            </span>
          </div>
        ))}
      </div>
    </div>
  );

  return (
    <div className="lg:h-[calc(100dvh-80px)] min-h-screen lg:min-h-[650px] p-4 md:p-6 bg-slate-950 flex flex-col overflow-y-auto lg:overflow-hidden">
      
      <h2 className="text-2xl md:text-3xl font-extrabold text-center text-white mb-4 lg:mb-6 tracking-widest drop-shadow-md shrink-0">
        MAP & TICKETS
      </h2>
      
      <div className="flex flex-col lg:flex-row gap-4 lg:gap-6 w-full max-w-[1400px] mx-auto flex-1 min-h-0">
        
        <div className="flex-1 flex flex-col min-h-[500px] lg:min-h-0 w-full overflow-hidden">
          {!selectedZone ? renderMacroMap() : renderMicroMap()}
        </div>

        <div className="w-full lg:w-64 shrink-0 h-auto lg:h-full flex flex-col">
          {renderPricing()}
        </div>

      </div>

    </div>
  );
};

export default SeatMap;