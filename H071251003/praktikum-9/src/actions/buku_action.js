"use server";

import pool from "@/lib/db";
import { parseId } from "@/lib/utils";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

function bacaDanValidasi(formData) {
  const ambil = (nama) => String(formData.get(nama) ?? "").trim();

  const nilai = {
    judul: ambil("judul"),
    penulis: ambil("penulis"),
    id_kategori: ambil("id_kategori"),
    tahun: ambil("tahun"),
    tersedia: ambil("tersedia"),
    sinopsis: ambil("sinopsis"),
    gambar: ambil("gambar"),
  };

  const tahunIni = new Date().getFullYear();
  let error = null;

  if (!nilai.judul || !nilai.penulis || !nilai.sinopsis) {
    error = "Judul, penulis, dan sinopsis wajib diisi.";
  } else if (nilai.judul.length > 200) {
    error = "Judul maksimal 200 karakter.";
  } else if (nilai.penulis.length > 100) {
    error = "Nama penulis maksimal 100 karakter.";
  } else if (nilai.sinopsis.length > 2000) {
    error = "Sinopsis maksimal 2000 karakter.";
  } else if (parseId(nilai.id_kategori) === null) {
    error = "Pilih kategori buku.";
  } else if (!/^\d{4}$/.test(nilai.tahun) || Number(nilai.tahun) < 1000 || Number(nilai.tahun) > tahunIni) {
    error = `Tahun terbit harus berupa angka 4 digit (1000 - ${tahunIni}).`;
  } else if (nilai.tersedia !== "true" && nilai.tersedia !== "false") {
    error = "Status ketersediaan tidak valid.";
  } else if (nilai.gambar && !/^[\w.-]+\.(jpg|jpeg|png|webp|gif)$/i.test(nilai.gambar)) {
    error = "Nama file sampul tidak valid (contoh: laskar-pelangi.jpg).";
  }

  return { nilai, error };
}

function pesanErrorDb(err) {
  console.error("Kesalahan database:", err);
  if (err?.code === "23503") return "Kategori yang dipilih tidak ditemukan.";
  return "Terjadi kesalahan saat menyimpan ke database. Coba lagi.";
}

export async function tambahBuku(prevState, formData) {
  const { nilai, error } = bacaDanValidasi(formData);
  if (error) return { error, nilai };

  try {
    await pool.query(
      `INSERT INTO buku (judul, penulis, id_kategori, tahun_rilis, tersedia, sinopsis, gambar)
       VALUES ($1, $2, $3, $4, $5, $6, $7)`,
      [
        nilai.judul,
        nilai.penulis,
        Number(nilai.id_kategori),
        Number(nilai.tahun),
        nilai.tersedia === "true",
        nilai.sinopsis,
        nilai.gambar || null,
      ]
    );
  } catch (err) {
    return { error: pesanErrorDb(err), nilai };
  }

  revalidatePath("/katalog");
  revalidatePath("/");
  redirect("/katalog"); // redirect() harus di luar try/catch
}

// ---------- UPDATE ----------
// Dipakai dengan .bind(null, id) + useActionState: (id, prevState, formData)
export async function ubahBuku(id, prevState, formData) {
  const idBuku = parseId(id);
  const { nilai, error } = bacaDanValidasi(formData);

  if (idBuku === null) return { error: "ID buku tidak valid.", nilai };
  if (error) return { error, nilai };

  let ditemukan = false;
  try {
    const hasil = await pool.query(
      `UPDATE buku
       SET judul = $1, penulis = $2, id_kategori = $3, tahun_rilis = $4,
           tersedia = $5, sinopsis = $6, gambar = $7
       WHERE id_buku = $8`,
      [
        nilai.judul,
        nilai.penulis,
        Number(nilai.id_kategori),
        Number(nilai.tahun),
        nilai.tersedia === "true",
        nilai.sinopsis,
        nilai.gambar || null,
        idBuku,
      ]
    );
    ditemukan = hasil.rowCount > 0;
  } catch (err) {
    return { error: pesanErrorDb(err), nilai };
  }

  if (!ditemukan) return { error: "Buku tidak ditemukan (mungkin sudah dihapus).", nilai };

  revalidatePath("/katalog");
  revalidatePath(`/katalog/${idBuku}`);
  revalidatePath("/");
  redirect(`/katalog/${idBuku}`);
}

// ---------- DELETE ----------
// Dipakai dengan .bind(null, id) pada <form action>
export async function hapusBuku(id) {
  const idBuku = parseId(id);
  if (idBuku === null) return;

  try {
    await pool.query("DELETE FROM buku WHERE id_buku = $1", [idBuku]);
  } catch (err) {
    console.error("Gagal menghapus buku:", err);
    return;
  }

  revalidatePath("/katalog");
  revalidatePath("/");
}
