import React from 'react';
import MenuCard from './MenuCard';

export default function MenuList({ 
  dataMenu, 
  activeItem, 
  setActiveItem, 
  startIndex, 
  onPrev, 
  onNext,
  kategoriAktif,
  setKategoriAktif
}) {
  const KATEGORI_LIST = ['Semua', 'Kopi', 'Non-Kopi', 'Makanan'];

  return (
    <div className="space-y-3">
      <div className="flex items-center gap-1.5 flex-wrap">
        {KATEGORI_LIST.map((kat) => {
          const isSelected = kategoriAktif === kat;
          return (
            <button
              key={kat}
              type="button"
              onClick={() => setKategoriAktif(kat)}
              className={`px-3 py-1 rounded-full text-[10px] font-extrabold transition-all duration-200 border ${
                isSelected 
                  ? 'bg-[#522E19] text-white border-[#522E19] shadow-sm scale-105' 
                  : 'bg-white text-[#522E19] border-[#D7C4B7] hover:bg-[#F4ECE6]'
              }`}
            >
              {kat}
            </button>
          );
        })}
      </div>

      <div>
        <p className="text-[11px] font-black text-[#8297B0] uppercase tracking-wider mb-2">
          Pilih Menu
        </p>

        <div className="flex items-center gap-2">
          <button 
            type="button"
            onClick={onPrev}
            disabled={startIndex === 0}
            className={`w-9 h-9 rounded-full bg-slate-100 flex items-center justify-center font-black text-xs text-[#0B1528] transition-all shrink-0 z-20 ${
              startIndex === 0 ? 'opacity-30 cursor-not-allowed' : 'hover:bg-[#FF6B00] hover:text-white shadow-md active:scale-95'
            }`}
          >
            ◀
          </button>

          <div className="w-[320px] sm:w-90 overflow-hidden py-3 px-2">
            <div 
              className="flex items-center gap-3.5 transition-transform duration-500 ease-in-out"
              style={{ transform: `translateX(-${startIndex * 128}px)` }}
            >
              {dataMenu.map((item) => (
                <MenuCard 
                  key={item.id}
                  item={item}
                  isSelected={activeItem.id === item.id}
                  onClick={() => setActiveItem(item)}
                />
              ))}
            </div>
          </div>
          
          <button 
            type="button"
            onClick={onNext}
            disabled={startIndex >= dataMenu.length - 3}
            className={`w-9 h-9 rounded-full bg-slate-100 flex items-center justify-center font-black text-xs text-[#0B1528] transition-all shrink-0 z-20 ${
              startIndex >= dataMenu.length - 3 ? 'opacity-30 cursor-not-allowed' : 'hover:bg-[#FF6B00] hover:text-white shadow-md active:scale-95'
            }`}
          >
            ▶
          </button>
        </div>
      </div>
    </div>
  );
}