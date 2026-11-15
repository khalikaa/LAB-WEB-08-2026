// Mengembalikan null jika tidak valid, sehingga query tidak pernah error karena tipe data.
export function parseId(value) {
  const teks = String(value ?? "").trim();
  if (!/^\d+$/.test(teks)) return null;

  const angka = Number(teks);
  if (!Number.isSafeInteger(angka) || angka < 1 || angka > 2147483647) return null;

  return angka;
}
