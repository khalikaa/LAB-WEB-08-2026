import { daftarKategori } from "@/lib/kategori";

const ID_MAKS = 2147483647; // batas tipe INTEGER / SERIAL di PostgreSQL

// Mengubah id dari URL atau form menjadi angka. Mengembalikan null bila tidak valid,
// sehingga nilai sembarang ("abc", "-1", "1e3", angka raksasa) tidak pernah sampai ke query.
export function parseId(nilai) {
  const teks = String(nilai ?? "").trim();
  if (!/^\d+$/.test(teks)) return null;
  const angka = Number(teks);
  if (!Number.isSafeInteger(angka) || angka < 1 || angka > ID_MAKS) return null;
  return angka;
}

const ambilTeks = (formData, nama) => String(formData.get(nama) ?? "").trim();

// Memvalidasi isian form buku (dipakai oleh Create dan Update).
// Hasil: { errors, values, data }. `values` selalu berupa teks mentah untuk mengisi ulang form,
// `data` berisi nilai bertipe benar (tahun = integer, tersedia = boolean) dan siap dikirim ke SQL.
export function validasiBuku(formData) {
  const values = {
    judul: ambilTeks(formData, "judul"),
    penulis: ambilTeks(formData, "penulis"),
    kategori: ambilTeks(formData, "kategori"),
    tahun: ambilTeks(formData, "tahun"),
    tersedia: ambilTeks(formData, "tersedia"),
    sinopsis: ambilTeks(formData, "sinopsis"),
  };
  const errors = {};

  if (!values.judul) errors.judul = "Judul wajib diisi.";
  else if (values.judul.length > 150) errors.judul = "Judul maksimal 150 karakter.";

  if (!values.penulis) errors.penulis = "Penulis wajib diisi.";
  else if (values.penulis.length > 100) errors.penulis = "Penulis maksimal 100 karakter.";

  if (!daftarKategori.includes(values.kategori)) {
    errors.kategori = "Pilih salah satu kategori yang tersedia.";
  }

  const tahunMaks = new Date().getFullYear() ;
  const tahun = /^\d{1,4}$/.test(values.tahun) ? Number(values.tahun) : NaN;
  if (!values.tahun) errors.tahun = "Tahun terbit wajib diisi.";
  else if (!Number.isInteger(tahun)) errors.tahun = "Tahun terbit harus berupa angka bulat.";
  else if (tahun < 1000 || tahun > tahunMaks) {
    errors.tahun = `Tahun terbit harus antara 1000 dan ${tahunMaks}.`;
  }

  if (values.tersedia !== "true" && values.tersedia !== "false") {
    errors.tersedia = "Pilih status ketersediaan.";
  }

  if (!values.sinopsis) errors.sinopsis = "Sinopsis wajib diisi.";
  else if (values.sinopsis.length < 10) errors.sinopsis = "Sinopsis minimal 10 karakter.";
  else if (values.sinopsis.length > 2000) errors.sinopsis = "Sinopsis maksimal 2000 karakter.";

  const data = {
    judul: values.judul,
    penulis: values.penulis,
    kategori: values.kategori,
    tahun,
    tersedia: values.tersedia === "true",
    sinopsis: values.sinopsis,
  };

  return { errors, values, data };
}
