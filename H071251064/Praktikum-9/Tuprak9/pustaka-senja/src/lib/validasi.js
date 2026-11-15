export const DAFTAR_KATEGORI = ["Teknologi", "Fiksi", "Pengembangan Diri"];

const PESAN_ERROR = {
  kosong: "Judul, penulis, kategori, tahun, dan sinopsis wajib diisi.",
  panjang: "Judul maksimal 200, penulis maksimal 150, dan sinopsis maksimal 2000 karakter.",
  kategori: "Kategori tidak valid.",
  tahun: "Tahun terbit harus angka 4 digit dan tidak melebihi tahun ini.",
  status: "Status ketersediaan tidak valid.",
  url: "Link gambar harus berupa URL http/https yang valid.",
  gagal: "Gagal menyimpan ke database. Silakan coba lagi.",
  notfound: "Buku tidak ditemukan.",
};

export function ambilPesanError(kode) {
  return typeof kode === "string" && Object.hasOwn(PESAN_ERROR, kode)
    ? PESAN_ERROR[kode]
    : null;
}
export function parseId(nilai) {
  const teks = String(nilai ?? "").trim();
  if (!/^\d+$/.test(teks)) return null;
  const angka = Number(teks);
  return angka >= 1 && angka <= 2147483647 ? angka : null;
}

export function alamatKembaliAman(nilai) {
  const teks = String(nilai ?? "");
  return /^\/katalog(\?[^\s#]*)?$/.test(teks) ? teks : "/katalog";
}

export function validasiBuku(formData) {
  const ambil = (nama) => String(formData.get(nama) ?? "").trim();

  const judul = ambil("judul");
  const penulis = ambil("penulis");
  const kategori = ambil("kategori");
  const tahunTeks = ambil("tahun");
  const tersedia = ambil("tersedia");
  const sinopsis = ambil("sinopsis");
  const gambar = ambil("gambar");

  if (!judul || !penulis || !kategori || !tahunTeks || !sinopsis) return { kode: "kosong" };
  if (judul.length > 200 || penulis.length > 150 || sinopsis.length > 2000) return { kode: "panjang" };
  if (!DAFTAR_KATEGORI.includes(kategori)) return { kode: "kategori" };

  const tahun = Number(tahunTeks);
  if (!/^\d{4}$/.test(tahunTeks) || tahun < 1000 || tahun > new Date().getFullYear()) {
    return { kode: "tahun" };
  }
  if (tersedia !== "true" && tersedia !== "false") return { kode: "status" };

  if (gambar) {
    let sah = false;
    try {
      const url = new URL(gambar);
      sah = (url.protocol === "http:" || url.protocol === "https:") && gambar.length <= 500;
    } catch {
      sah = false;
    }
    if (!sah) return { kode: "url" };
  }

  return {
    kode: null,
    data: {
      judul,
      penulis,
      kategori,
      tahun,
      tersedia: tersedia === "true",
      sinopsis,
      gambar: gambar || null,
    },
  };
}