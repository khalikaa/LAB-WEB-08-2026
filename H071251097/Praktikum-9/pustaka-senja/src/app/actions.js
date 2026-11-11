"use server";

import pool from "@/lib/db";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export async function tambahBuku(formData) {
  const judul = formData.get("judul")?.trim();
  const penulis = formData.get("penulis")?.trim();
  const kategori = formData.get("kategori")?.trim();
  const tahunInput = formData.get("tahun");
  const sinopsis = formData.get("sinopsis")?.trim();
  const tersedia = formData.get("tersedia") === "true";

  if (!judul || !penulis || !kategori || !tahunInput || !sinopsis) {
    throw new Error("Semua kolom wajib diisi!");
  }

  const tahun = parseInt(tahunInput, 10);
  const tahunSekarang = new Date().getFullYear();

  if (isNaN(tahun) || tahun < 1000 || tahun > tahunSekarang) {
    throw new Error(
      `Tahun terbit tidak valid! Harus berupa angka antara 1000 hingga ${tahunSekarang}.`
    );
  }

  await pool.query(
    `INSERT INTO buku (judul, penulis, kategori, tahun, sinopsis, tersedia)
     VALUES ($1, $2, $3, $4, $5, $6)`,
    [judul, penulis, kategori, tahun, sinopsis, tersedia]
  );

  revalidatePath("/katalog");
  revalidatePath("/");
  
  redirect("/katalog");
}

export async function editBuku(id, formData) {
  const judul = formData.get("judul")?.trim();
  const penulis = formData.get("penulis")?.trim();
  const kategori = formData.get("kategori")?.trim();
  const tahunInput = formData.get("tahun");
  const sinopsis = formData.get("sinopsis")?.trim();
  const tersedia = formData.get("tersedia") === "true";

  if (!judul || !penulis || !kategori || !tahunInput || !sinopsis) {
    throw new Error("Semua kolom wajib diisi!");
  }

  const tahun = parseInt(tahunInput, 10);
  const tahunSekarang = new Date().getFullYear();

  if (isNaN(tahun) || tahun < 1000 || tahun > tahunSekarang) {
    throw new Error(`Tahun terbit tidak valid!`);
  }

  await pool.query(
    `UPDATE buku 
     SET judul = $1, penulis = $2, kategori = $3, tahun = $4, sinopsis = $5, tersedia = $6
     WHERE id = $7`,
    [judul, penulis, kategori, tahun, sinopsis, tersedia, id]
  );

  revalidatePath("/katalog");
  revalidatePath(`/katalog/${id}`);
  revalidatePath("/");
  
  redirect(`/katalog/${id}`);
}

export async function hapusBuku(id) {
  await pool.query("DELETE FROM buku WHERE id = $1", [id]);

  revalidatePath("/katalog");
  revalidatePath("/");
  
  redirect("/katalog");
}