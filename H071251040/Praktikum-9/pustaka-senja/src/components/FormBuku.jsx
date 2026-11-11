"use client";

import { useActionState } from "react";
import { kategoriBuku } from "@/lib/kategori";

const gayaInput = "w-full border-2 border-black bg-white/60 px-3 py-2 text-sm";

function Pesan({ id, teks }) {
  if (!teks) return null;
  return (
    <p id={id} className="mt-1 text-xs font-bold text-red-700">
      {teks}
    </p>
  );
}

// Form dipakai bersama oleh halaman Tambah dan Edit.
// `action` adalah Server Action; `nilaiAwal` mengisi form (kosong untuk tambah,
// data dari database untuk edit).
function FormBuku({ action, nilaiAwal, labelTombol }) {
  const [state, formAction, pending] = useActionState(action, {
    errors: {},
    values: nilaiAwal,
    percobaan: 0,
    pesan: "",
  });
  const { errors, values } = state;

  return (
    <form action={formAction} noValidate className="space-y-4">
      {/* key berubah setiap percobaan agar isian form tetap terisi setelah error */}
      <div key={state.percobaan} className="space-y-4">
        <div>
          <label htmlFor="judul" className="mb-1 block text-sm font-bold">
            Judul buku
          </label>
          <input
            id="judul"
            name="judul"
            type="text"
            defaultValue={values.judul}
            aria-describedby="err-judul"
            className={gayaInput}
          />
          <Pesan id="err-judul" teks={errors.judul} />
        </div>

        <div>
          <label htmlFor="penulis" className="mb-1 block text-sm font-bold">
            Penulis
          </label>
          <input
            id="penulis"
            name="penulis"
            type="text"
            defaultValue={values.penulis}
            aria-describedby="err-penulis"
            className={gayaInput}
          />
          <Pesan id="err-penulis" teks={errors.penulis} />
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          <div>
            <label htmlFor="kategori" className="mb-1 block text-sm font-bold">
              Kategori
            </label>
            <select
              id="kategori"
              name="kategori"
              defaultValue={values.kategori}
              aria-describedby="err-kategori"
              className={gayaInput}
            >
              <option value="">Pilih kategori</option>
              {kategoriBuku.map((item) => (
                <option key={item} value={item}>
                  {item}
                </option>
              ))}
            </select>
            <Pesan id="err-kategori" teks={errors.kategori} />
          </div>

          <div>
            <label htmlFor="tahun" className="mb-1 block text-sm font-bold">
              Tahun terbit
            </label>
            <input
              id="tahun"
              name="tahun"
              type="number"
              inputMode="numeric"
              defaultValue={values.tahun}
              aria-describedby="err-tahun"
              className={gayaInput}
            />
            <Pesan id="err-tahun" teks={errors.tahun} />
          </div>
        </div>

        <div>
          <label htmlFor="tersedia" className="mb-1 block text-sm font-bold">
            Status ketersediaan
          </label>
          <select
            id="tersedia"
            name="tersedia"
            defaultValue={values.tersedia}
            aria-describedby="err-tersedia"
            className={gayaInput}
          >
            <option value="true">Tersedia</option>
            <option value="false">Sedang Dipinjam</option>
          </select>
          <Pesan id="err-tersedia" teks={errors.tersedia} />
        </div>

        <div>
          <label htmlFor="sinopsis" className="mb-1 block text-sm font-bold">
            Sinopsis
          </label>
          <textarea
            id="sinopsis"
            name="sinopsis"
            rows={5}
            defaultValue={values.sinopsis}
            aria-describedby="err-sinopsis"
            className={gayaInput}
          />
          <Pesan id="err-sinopsis" teks={errors.sinopsis} />
        </div>
      </div>

      {state.pesan && (
        <p role="alert" className="border-2 border-black bg-red-300 p-3 text-sm">
          {state.pesan}
        </p>
      )}

      <button
        type="submit"
        disabled={pending}
        className="w-full border-2 border-black bg-oranye py-2.5 text-sm font-bold hover:bg-kuning disabled:opacity-60"
      >
        {pending ? "Menyimpan..." : labelTombol}
      </button>
    </form>
  );
}

export default FormBuku;
