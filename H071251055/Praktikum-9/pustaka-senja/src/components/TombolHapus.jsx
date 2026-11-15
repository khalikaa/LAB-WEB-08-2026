'use client';

import { useState, useTransition } from 'react';
import { hapusBuku} from '@/app/katalog/actions'; // Sesuaikan path jika menggunakan path relatif (e.g., '../app/katalog/actions')

export default function TombolHapus({ id, judul }) {
  const [isOpen, setIsOpen] = useState(false);
  const [isPending, startTransition] = useTransition();

  const handleHapus = () => {
    startTransition(async () => {
      await hapusBuku(id);
      setIsOpen(false);
    });
  };

  return (
    <>
      {/* Tombol Hapus Utama */}
      <button
        type="button"
        onClick={() => setIsOpen(true)}
        className="px-4 py-1.5 bg-[#8c2626] text-white text-xs font-bold tracking-wider uppercase border-2 border-slate-900 shadow-[2px_2px_0px_0px_#0f172a] hover:translate-x-[1px] hover:translate-y-[1px] hover:shadow-none transition-all"
      >
        Hapus
      </button>

      {/* Modal Dialog Konfirmasi Custom */}
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 backdrop-blur-sm p-4 animate-in fade-in duration-150">
          <div className="w-full max-w-md bg-[#f7f4ea] border-2 border-slate-900 p-6 shadow-[6px_6px_0px_0px_#0f172a] text-slate-900 space-y-4">
            
            {/* Header Modal */}
            <div className="border-b-2 border-slate-900 pb-3">
              <span className="text-[10px] font-extrabold tracking-widest text-[#8c2626] uppercase bg-red-100 px-2 py-0.5 border border-[#8c2626] inline-block">
                PERINGATAN
              </span>
              <h3 className="text-xl font-extrabold font-serif text-slate-900 mt-2">
                Hapus dari Koleksi?
              </h3>
            </div>

            {/* Isi Pesan */}
            <p className="text-sm font-medium text-slate-700 leading-relaxed">
              Buku <strong className="text-slate-900 font-bold underline decoration-[#8c2626]">"{judul}"</strong> akan dihapus secara permanen. Tindakan ini tidak dapat dibatalkan.
            </p>

            {/* Tombol Aksi */}
            <div className="flex justify-end gap-3 pt-3 border-t border-slate-300">
              <button
                type="button"
                onClick={() => setIsOpen(false)}
                disabled={isPending}
                className="px-4 py-2 bg-slate-200 text-slate-900 text-xs font-bold tracking-wider uppercase border-2 border-slate-900 shadow-[2px_2px_0px_0px_#0f172a] hover:bg-slate-300 hover:translate-x-[1px] hover:translate-y-[1px] hover:shadow-none transition-all disabled:opacity-50"
              >
                Batal
              </button>

              <button
                type="button"
                onClick={handleHapus}
                disabled={isPending}
                className="px-4 py-2 bg-[#8c2626] text-white text-xs font-bold tracking-wider uppercase border-2 border-slate-900 shadow-[2px_2px_0px_0px_#0f172a] hover:bg-red-900 hover:translate-x-[1px] hover:translate-y-[1px] hover:shadow-none transition-all disabled:opacity-50"
              >
                {isPending ? 'Menghapus...' : 'Ya, Hapus'}
              </button>
            </div>

          </div>
        </div>
      )}
    </>
  );
}