// Konstanta dan fungsi murni (tanpa akses database) yang aman dipakai di server maupun client.

export const daftarKategori = ["Teknologi", "Fiksi", "Pengembangan Diri"];

const kodeKategori = { Teknologi: "TEK", Fiksi: "FIK", "Pengembangan Diri": "PGD" };

// Nomor panggil gaya kartu katalog, contoh: "TEK 001"
export function nomorPanggil(kategori, id) {
  return `${kodeKategori[kategori] ?? "UMM"} ${String(id).padStart(3, "0")}`;
}
