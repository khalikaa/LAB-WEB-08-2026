"use client";

import { useActionState } from "react";
import Link from "next/link";
import { daftarKategori } from "@/lib/kategori";

const stateAwal = { errors: {}, values: null };

const labelClass = "font-mono text-xs uppercase tracking-[0.18em] text-ink-soft";
const fieldClass =
  "mt-1 w-full border-0 border-b-2 border-ink/40 bg-transparent px-1 py-2 text-lg text-ink focus:border-ember focus:outline-none aria-invalid:border-stamp";
const errorClass = "mt-1 font-mono text-xs text-stamp";

// Form bersama untuk Tambah dan Edit. `action` adalah Server Action (tambahBuku atau ubahBuku
// yang sudah di-bind dengan id). `awal` berisi data tersimpan saat mengedit.
export default function FormBuku({ action, awal, labelTombol, hrefBatal }) {
  const [state, formAction, sedangMengirim] = useActionState(action, stateAwal);
  const { errors } = state;

  // Setelah validasi gagal, isian pengguna dikembalikan dari server agar tidak perlu mengetik ulang.
  const nilai = state.values ?? {
    judul: awal?.judul ?? "",
    penulis: awal?.penulis ?? "",
    kategori: awal?.kategori ?? daftarKategori[0],
    tahun: awal ? String(awal.tahun) : "",
    tersedia: awal ? String(awal.tersedia) : "true",
    sinopsis: awal?.sinopsis ?? "",
  };

  return (
    <form
      action={formAction}
      noValidate
      className="space-y-6 border border-ink/20 bg-card px-6 py-7 shadow-[0_1px_0_rgba(0,0,0,0.06),0_18px_28px_-16px_rgba(60,30,20,0.55)] sm:px-10"
    >
      {errors.form && (
        <p role="alert" className="border-l-4 border-stamp bg-stamp/10 px-4 py-2 font-mono text-sm text-stamp">
          {errors.form}
        </p>
      )}

      <div>
        <label htmlFor="judul" className={labelClass}>Judul</label>
        <input
          id="judul"
          name="judul"
          type="text"
          defaultValue={nilai.judul}
          aria-invalid={errors.judul ? "true" : undefined}
          aria-describedby={errors.judul ? "err-judul" : undefined}
          className={fieldClass}
        />
        {errors.judul && <p id="err-judul" className={errorClass}>{errors.judul}</p>}
      </div>

      <div>
        <label htmlFor="penulis" className={labelClass}>Penulis</label>
        <input
          id="penulis"
          name="penulis"
          type="text"
          defaultValue={nilai.penulis}
          aria-invalid={errors.penulis ? "true" : undefined}
          aria-describedby={errors.penulis ? "err-penulis" : undefined}
          className={fieldClass}
        />
        {errors.penulis && <p id="err-penulis" className={errorClass}>{errors.penulis}</p>}
      </div>

      <div className="grid gap-6 sm:grid-cols-3">
        <div>
          <label htmlFor="kategori" className={labelClass}>Kategori</label>
          <select
            id="kategori"
            name="kategori"
            defaultValue={nilai.kategori}
            aria-invalid={errors.kategori ? "true" : undefined}
            aria-describedby={errors.kategori ? "err-kategori" : undefined}
            className={fieldClass}
          >
            {daftarKategori.map((kategori) => (
              <option key={kategori} value={kategori}>
                {kategori}
              </option>
            ))}
          </select>
          {errors.kategori && <p id="err-kategori" className={errorClass}>{errors.kategori}</p>}
        </div>

        <div>
          <label htmlFor="tahun" className={labelClass}>Tahun Terbit</label>
          <input
            id="tahun"
            name="tahun"
            type="text"
            inputMode="numeric"
            defaultValue={nilai.tahun}
            aria-invalid={errors.tahun ? "true" : undefined}
            aria-describedby={errors.tahun ? "err-tahun" : undefined}
            className={fieldClass}
          />
          {errors.tahun && <p id="err-tahun" className={errorClass}>{errors.tahun}</p>}
        </div>

        <div>
          <label htmlFor="tersedia" className={labelClass}>Ketersediaan</label>
          <select
            id="tersedia"
            name="tersedia"
            defaultValue={nilai.tersedia}
            aria-invalid={errors.tersedia ? "true" : undefined}
            aria-describedby={errors.tersedia ? "err-tersedia" : undefined}
            className={fieldClass}
          >
            <option value="true">Tersedia</option>
            <option value="false">Sedang Dipinjam</option>
          </select>
          {errors.tersedia && <p id="err-tersedia" className={errorClass}>{errors.tersedia}</p>}
        </div>
      </div>

      <div>
        <label htmlFor="sinopsis" className={labelClass}>Sinopsis</label>
        <textarea
          id="sinopsis"
          name="sinopsis"
          rows={5}
          defaultValue={nilai.sinopsis}
          aria-invalid={errors.sinopsis ? "true" : undefined}
          aria-describedby={errors.sinopsis ? "err-sinopsis" : undefined}
          className="garis-tulis mt-1 w-full resize-y border-0 border-b-2 border-ink/40 px-1 text-lg text-ink focus:border-ember focus:outline-none aria-invalid:border-stamp"
        />
        {errors.sinopsis && <p id="err-sinopsis" className={errorClass}>{errors.sinopsis}</p>}
      </div>

      <div className="flex flex-wrap items-center gap-3">
        <button
          type="submit"
          disabled={sedangMengirim}
          className="border-b-4 border-gold bg-dusk px-7 py-2.5 font-mono text-sm uppercase tracking-[0.16em] text-paper transition-colors hover:bg-dusk-soft disabled:opacity-60"
        >
          {sedangMengirim ? "Menyimpan..." : labelTombol}
        </button>
        <Link
          href={hrefBatal}
          className="border-2 border-dusk px-6 py-[8px] font-mono text-sm uppercase tracking-[0.16em] text-dusk transition-colors hover:bg-paper-deep"
        >
          Batal
        </Link>
      </div>
    </form>
  );
}
