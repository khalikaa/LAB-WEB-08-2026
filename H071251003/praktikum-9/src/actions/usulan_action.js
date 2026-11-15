"use server";

import pool from "@/lib/db";
import { revalidatePath } from "next/cache";

// Kapitalisasi tiap kata pada judul buku
function capitalizeWords(str) {
  return str
    .toLowerCase()
    .split(/\s+/)
    .filter(Boolean)
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
}

export async function tambahUsulan(formData) {
  const ambil = (nama) => String(formData.get(nama) ?? "").trim();

  const namaPengusul = ambil("namaPengusul");
  const judulBuku = ambil("judulBuku");
  const kategoriSelect = ambil("kategori");
  const kategoriLainnya = ambil("kategoriLainnya");
  const alasan = ambil("alasan");

  // Validasi sisi server (atribut `required` di browser bisa dilewati)
  if (!namaPengusul || !judulBuku || !kategoriSelect || !alasan) {
    console.error("Usulan ditolak: ada field wajib yang kosong.");
    return;
  }

  // Logika kategori "Lainnya" & fallback jika kosong
  let kategoriFinal = kategoriSelect;
  if (kategoriSelect === "Lainnya") {
    kategoriFinal = kategoriLainnya ? `Lainnya: ${kategoriLainnya}` : "Lainnya: Tidak Diketahui";
  }

  const judulFinal = capitalizeWords(judulBuku);

  try {
    await pool.query(
      `INSERT INTO usulan (nama_pengusul, buku_usulan, kategori_usulan, alasan_usulan)
       VALUES ($1, $2, $3, $4)`,
      [namaPengusul, judulFinal, kategoriFinal, alasan]
    );
  } catch (error) {
    console.error("Gagal menyimpan usulan:", error);
    return;
  }

  revalidatePath("/usulan");
}
