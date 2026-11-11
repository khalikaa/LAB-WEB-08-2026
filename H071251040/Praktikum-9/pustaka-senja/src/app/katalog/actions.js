"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import pool from "@/lib/db";
import { idValid } from "@/lib/buku";
import { validasiBuku } from "@/lib/validasi";

// ---------- CREATE ----------
export async function tambahBuku(stateLama, formData) {
  const { values, errors, valid, data } = validasiBuku(formData);
  const percobaan = stateLama.percobaan + 1;

  if (!valid) {
    return { errors, values, percobaan, pesan: "" };
  }

  try {
    await pool.query(
      `INSERT INTO buku (judul, penulis, kategori, tahun, tersedia, sinopsis)
       VALUES ($1, $2, $3, $4, $5, $6)`,
      [data.judul, data.penulis, data.kategori, data.tahun, data.tersedia, data.sinopsis]
    );
  } catch (error) {
    console.error("Gagal menambah buku:", error.message);
    return {
      errors: {},
      values,
      percobaan,
      pesan: "Buku gagal disimpan ke database. Silakan coba lagi.",
    };
  }

  revalidatePath("/katalog");
  revalidatePath("/");
  redirect("/katalog");
}

// ---------- UPDATE ----------
export async function ubahBuku(id, stateLama, formData) {
  const { values, errors, valid, data } = validasiBuku(formData);
  const percobaan = stateLama.percobaan + 1;

  if (!idValid(id)) {
    return { errors: {}, values, percobaan, pesan: "ID buku tidak valid." };
  }
  if (!valid) {
    return { errors, values, percobaan, pesan: "" };
  }

  let hasil;
  try {
    hasil = await pool.query(
      `UPDATE buku
       SET judul = $1, penulis = $2, kategori = $3, tahun = $4, tersedia = $5, sinopsis = $6
       WHERE id = $7`,
      [data.judul, data.penulis, data.kategori, data.tahun, data.tersedia, data.sinopsis, id]
    );
  } catch (error) {
    console.error("Gagal mengubah buku:", error.message);
    return {
      errors: {},
      values,
      percobaan,
      pesan: "Perubahan gagal disimpan ke database. Silakan coba lagi.",
    };
  }

  if (hasil.rowCount === 0) {
    return { errors: {}, values, percobaan, pesan: "Buku tidak ditemukan (mungkin sudah dihapus)." };
  }

  revalidatePath("/katalog");
  revalidatePath(`/katalog/${id}`);
  revalidatePath("/");
  redirect(`/katalog/${id}`);
}

// ---------- DELETE ----------
export async function hapusBuku(id) {
  if (idValid(id)) {
    await pool.query("DELETE FROM buku WHERE id = $1", [id]);
  }

  revalidatePath("/katalog");
  revalidatePath("/");
  redirect("/katalog");
}
