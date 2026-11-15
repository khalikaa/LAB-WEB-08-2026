"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import pool from "@/lib/db";
import { alamatKembaliAman, parseId, validasiBuku } from "@/lib/validasi";

export async function tambahBuku(formData) {
  const { kode, data } = validasiBuku(formData);
  if (kode) redirect(`/katalog/tambahbuku?error=${kode}`);

  let gagal = false;
  try {
    await pool.query(
      `INSERT INTO buku (judul, penulis, kategori, tahun, tersedia, sinopsis, gambar)
       VALUES ($1, $2, $3, $4, $5, $6, $7)`,
      [data.judul, data.penulis, data.kategori, data.tahun, data.tersedia, data.sinopsis, data.gambar]
    );
  } catch (err) {
    console.error("Gagal INSERT buku:", err.message);
    gagal = true;
  }
  if (gagal) redirect("/katalog/tambahbuku?error=gagal");

  revalidatePath("/katalog");
  revalidatePath("/");
  redirect("/katalog?pesan=ditambah");
}

export async function ubahBuku(formData) {
  const id = parseId(formData.get("id"));
  if (id === null) redirect("/katalog?error=notfound");

  const { kode, data } = validasiBuku(formData);
  if (kode) redirect(`/katalog/${id}/edit?error=${kode}`);

  let jumlahBaris = 0;
  let gagal = false;
  try {
    const hasil = await pool.query(
      `UPDATE buku
       SET judul = $1, penulis = $2, kategori = $3, tahun = $4,
           tersedia = $5, sinopsis = $6, gambar = $7
       WHERE id = $8`,
      [data.judul, data.penulis, data.kategori, data.tahun, data.tersedia, data.sinopsis, data.gambar, id]
    );
    jumlahBaris = hasil.rowCount;
  } catch (err) {
    console.error("Gagal UPDATE buku:", err.message);
    gagal = true;
  }
  if (gagal) redirect(`/katalog/${id}/edit?error=gagal`);
  if (jumlahBaris === 0) redirect(`/katalog/${id}/edit?error=notfound`);

  revalidatePath("/katalog");
  revalidatePath(`/katalog/${id}`);
  revalidatePath("/");
  redirect(`/katalog/${id}?pesan=diubah`);
}

export async function hapusBuku(formData) {
  const id = parseId(formData.get("id"));
  const kembali = alamatKembaliAman(formData.get("kembali"));

  if (id !== null) {
    await pool.query("DELETE FROM buku WHERE id = $1", [id]);
    revalidatePath("/katalog");
    revalidatePath("/");
  }

  redirect(kembali);
}