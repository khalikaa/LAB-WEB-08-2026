import { useState } from "react";

function FormPesan({ jumlahItem, onKirim }) {
  const [nama, setNama] = useState("");
  const [meja, setMeja] = useState("");
  const [galat, setGalat] = useState({});
  const [terimaKasih, setTerimaKasih] = useState("");

  function ubahNama(e) {
    setNama(e.target.value);
    setTerimaKasih("");
    setGalat({ ...galat, nama: "", pesanan: "" });
  }

  function ubahMeja(e) {
    setMeja(e.target.value);
    setTerimaKasih("");
    setGalat({ ...galat, meja: "", pesanan: "" });
  }

  function kirim(e) {
    e.preventDefault();
    const baru = {};
    if (nama.trim().length < 2) baru.nama = "Nama diisi minimal 2 huruf.";
    if (!/^\d+$/.test(meja.trim()) || Number(meja) < 1 || Number(meja) > 30)
      baru.meja = "Nomor meja berupa angka 1 sampai 30.";
    if (jumlahItem === 0) baru.pesanan = "Pesanan masih kosong. Tambahkan menu dulu.";

    if (Object.keys(baru).length > 0) {
      setGalat(baru);
      setTerimaKasih("");
      return;
    }

    setTerimaKasih(nama.trim());
    setNama("");
    setMeja("");
    setGalat({});
    onKirim();
  }

  const kolom =
    "mt-1 w-full rounded-lg border-2 bg-malam px-3 py-2 text-kertas shadow-lekuk placeholder:text-kertas/35";

  return (
    <section className="rounded-2xl border border-kertas/10 bg-senja p-6 shadow-tebal" aria-label="Form pemesan">
      <h2 className="font-judul text-2xl">Kirim ke dapur</h2>

      {terimaKasih && (
        <p role="status" className="mt-3 rounded-lg bg-emas px-4 py-3 font-medium text-tinta shadow-tombol-emas">
          Terima kasih, {terimaKasih}! Pesananmu sedang disiapkan.
        </p>
      )}

      <form onSubmit={kirim} noValidate className="mt-4 flex flex-col gap-4">
        <div>
          <label htmlFor="nama" className="text-sm font-medium">Nama</label>
          <input
            id="nama"
            value={nama}
            onChange={ubahNama}
            placeholder="Nama panggilanmu"
            aria-invalid={Boolean(galat.nama)}
            className={`${kolom} ${galat.nama ? "border-rona" : "border-kertas/15"}`}
          />
          {galat.nama && <p className="mt-1 text-sm text-rona">{galat.nama}</p>}
        </div>

        <div>
          <label htmlFor="meja" className="text-sm font-medium">Nomor meja</label>
          <input
            id="meja"
            value={meja}
            onChange={ubahMeja}
            inputMode="numeric"
            placeholder="Contoh: 7"
            aria-invalid={Boolean(galat.meja)}
            className={`${kolom} ${galat.meja ? "border-rona" : "border-kertas/15"}`}
          />
          {galat.meja && <p className="mt-1 text-sm text-rona">{galat.meja}</p>}
        </div>

        {galat.pesanan && <p role="alert" className="text-sm font-medium text-rona">{galat.pesanan}</p>}

        <button
          type="submit"
          className="rounded-full bg-emas py-3 font-bold text-tinta shadow-tombol-emas transition-all duration-100 active:translate-y-[3px] active:shadow-none"
        >
          Kirim pesanan
        </button>
      </form>
    </section>
  );
}

export default FormPesan;