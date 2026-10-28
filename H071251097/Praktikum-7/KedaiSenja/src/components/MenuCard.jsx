import React from 'react';

export default function MenuCard({ item, isSelected, onClick }) {
  return (
    <button
      onClick={onClick}
      type="button"
      className={`relative transition-all duration-300 outline-none shrink-0 ${
        isSelected 
          ? 'scale-105 z-10' 
          : 'scale-95 hover:scale-100 opacity-80'
      }`}
    >
      <div className={`w-28 sm:w-32 h-36 sm:h-40 rounded-3xl overflow-hidden p-1.5 bg-white border-4 transition-all duration-300 ${
        isSelected 
          ? 'border-[#FF6B00] ring-4 ring-[#FF6B00]/30 shadow-xl' 
          : 'border-slate-200 shadow-md'
      }`}>
        <img 
          src={item.gambar} 
          alt={item.nama} 
          className="w-full h-full object-cover rounded-2xl"
        />
      </div>
    </button>
  );
}