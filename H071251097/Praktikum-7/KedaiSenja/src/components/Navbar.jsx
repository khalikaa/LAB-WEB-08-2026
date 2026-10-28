import React from 'react';

export default function Navbar({ totalJumlah }) {
  return (
    <header className="px-8 pt-4 pb-3 flex items-center justify-between z-30 border-b border-slate-100">
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 rounded-full bg-[#522E19] flex items-center justify-center text-white font-black text-lg shadow-md border-2 border-[#FF6B00]">
          ☕
        </div>
        <div>
          <span className="font-black text-lg tracking-tight text-[#0B1528] block leading-tight">
            KEDAI KOPI SENJA
          </span>
          <span className="text-[12px] font-black text-[#FF6B00] tracking-widest">
            Aylala's coffe
          </span>
        </div>
      </div>

      <div className="flex items-center gap-5 text-[#0B1528]">
        <div className="relative">
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.2" d="M16 11V7a4 4 0 00-8 0v4M5 11h14l1 12H4L5 11z" />
          </svg>
          {totalJumlah > 0 && (
            <span className="absolute -top-1.5 -right-2 bg-[#FF6B00] text-white text-[10px] font-black w-4 h-4 rounded-full flex items-center justify-center border-2 border-white">
              {totalJumlah}
            </span>
          )}
        </div>
        <svg className="w-6 h-6 cursor-pointer" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z" />
        </svg>
      </div>
    </header>
  );
}