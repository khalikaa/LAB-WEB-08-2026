import React from 'react';

export default function RingkasanPesanan({ itemsDipesan }) {
  if (!itemsDipesan || itemsDipesan.length === 0) return null;

  return (
    <div className="flex items-center gap-2 overflow-x-auto pb-0.5 scrollbar-none">
      <span className="text-[10px] font-black text-[#526580] uppercase tracking-wider shrink-0">
        Item Dipesan:
      </span>
      <div className="flex items-center gap-2">
        {itemsDipesan.map((item) => (
          <span 
            key={item.id} 
            className="px-2.5 py-1 bg-white border border-[#B9D5F9] text-[#0B1528] text-[10px] font-black rounded-full shadow-sm shrink-0 flex items-center gap-1.5"
          >
            <span>{item.nama}</span>
            <span className="bg-[#FF6B00] text-white px-1.5 py-0.2 rounded-full text-[9px]">
              {item.qty}x
            </span>
          </span>
        ))}
      </div>
    </div>
  );
}