import { kategoriBuku } from "@/lib/kategori";


export function validasiBuku(formData) {
  const values = {
    judul: String(formData.get("judul") ?? "").trim(),
    penulis: String(formData.get("penulis") ?? "").trim(),
    kategori: String(formData.get("kategori") ?? "").trim(),
    tahun: String(formData.get("tahun") ?? "").trim(),
    tersedia: String(formData.get("tersedia") ?? "").trim(),
    sinopsis: String(formData.get("sinopsis") ?? "").trim(),
  };

  const errors = {};
  const tahunSekarang = new Date().getFullYear();

  if (values.judul === "") errors.judul = "Judul wajib diisi.";
  else if (values.judul.length > 200) errors.judul = "Judul maksimal 200 karakter.";

  if (values.penulis === "") errors.penulis = "Penulis wajib diisi.";
  else if (values.penulis.length > 150) errors.penulis = "Penulis maksimal 150 karakter.";

  if (!kategoriBuku.includes(values.kategori)) {
    errors.kategori = "Pilih salah satu kategori yang tersedia.";
  }

  if (!/^\d{1,4}$/.test(values.tahun)) {
    errors.tahun = "Tahun terbit harus berupa angka bulat.";
  } else if (Number(values.tahun) < 1000 || Number(values.tahun) > tahunSekarang) {
    errors.tahun = `Tahun terbit harus antara 1000 dan ${tahunSekarang}.`;
  }

  if (values.tersedia !== "true" && values.tersedia !== "false") {
    errors.tersedia = "Pilih status ketersediaan.";
  }

  if (values.sinopsis === "") errors.sinopsis = "Sinopsis wajib diisi.";

  const valid = Object.keys(errors).length === 0;
  const data = valid
    ? {
        judul: values.judul,
        penulis: values.penulis,
        kategori: values.kategori,
        tahun: Number(values.tahun),
        tersedia: values.tersedia === "true",
        sinopsis: values.sinopsis,
      }
    : null;

  return { values, errors, valid, data };
}
