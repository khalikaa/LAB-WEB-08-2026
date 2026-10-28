import { useState } from "react";

function FormPesan({ totalItem, onKirim }) {
  const [nama, setNama] = useState("");
  const [meja, setMeja] = useState("");
  const [galat, setGalat] = useState({});
  const [terkirim, setTerkirim] = useState(false);

  function handleSubmit(e) {
    e.preventDefault();
    const hasil = {};
    const noMeja = Number(meja);

    if (nama.trim().length < 3) {
      hasil.nama = "Nama minimal 3 karakter.";
    }
    if (meja === "" || !Number.isInteger(noMeja) || noMeja < 1 || noMeja > 20) {
      hasil.meja = "Nomor meja harus berupa angka 1 sampai 20.";
    }
    if (totalItem === 0) {
      hasil.pesanan = "Pesanan masih kosong. Pilih menu terlebih dahulu.";
    }

    setGalat(hasil);
    setTerkirim(false);
    if (Object.keys(hasil).length > 0) return;

    onKirim();
    setNama("");
    setMeja("");
    setTerkirim(true);
  }

  const kelasInput =
    "w-full rounded border bg-white px-3 py-2 text-sm outline-none focus:border-kopi-karamel";

  return (
    <form onSubmit={handleSubmit} noValidate className="mt-6 space-y-4 border-t border-[#d4c5ba] pt-5">
      <h3 className="font-jost text-xl font-light text-kopi-tua">Data Pemesan</h3>

      {/* Nama */}
      <div>
        <label htmlFor="nama" className="mb-1 block text-sm font-medium text-stone-700">
          Nama
        </label>
        <input
          id="nama"
          type="text"
          placeholder="Nama pemesan"
          value={nama}
          onChange={(e) => setNama(e.target.value)}
          className={`${kelasInput} ${galat.nama ? "border-red-400" : "border-stone-300"}`}
        />
        {galat.nama && (
          <p className="mt-1 text-xs text-red-600">{galat.nama}</p>
        )}
      </div>

      {/* Nomor Meja */}
      <div>
        <label htmlFor="meja" className="mb-1 block text-sm font-medium text-stone-700">
          Nomor Meja
        </label>
        <input
          id="meja"
          type="number"
          min="1"
          max="20"
          placeholder="1 – 20"
          value={meja}
          onChange={(e) => setMeja(e.target.value)}
          className={`${kelasInput} ${galat.meja ? "border-red-400" : "border-stone-300"}`}
        />
        {galat.meja && (
          <p className="mt-1 text-xs text-red-600">{galat.meja}</p>
        )}
      </div>

      {/* Pesanan error */}
      {galat.pesanan && totalItem === 0 && (
        <p className="rounded-lg border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-700">
          {galat.pesanan}
        </p>
      )}

      {/* Submit */}
      <button
        type="submit"
        className="w-full rounded-lg bg-kopi-tua py-2.5 font-semibold text-white shadow transition-colors hover:bg-kopi-sedang active:scale-[0.98]"
      >
        Kirim Pesanan
      </button>

      {/* Success */}
      {terkirim && (
        <p className="rounded-lg border border-green-200 bg-green-50 px-3 py-2 text-sm text-green-800">
          Terima kasih! Pesananmu sudah terkirim dan segera kami siapkan.
        </p>
      )}
    </form>
  );
}

export default FormPesan;
