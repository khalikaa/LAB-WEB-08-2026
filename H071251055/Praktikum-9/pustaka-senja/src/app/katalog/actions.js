"use server";

import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { pool } from "@/lib/db";
import { parseId, validasiBuku } from "@/lib/validasi";



const PESAN_GAGAL = "Data belum dapat disimpan karena ada kendala pada database. Silakan coba lagi.";


export async function tambahBuku(_stateSebelumnya, formData) {
  const { errors, values, data } = validasiBuku(formData);
  if (Object.keys(errors).length > 0) return { errors, values };

  try {
    await pool.query(
      `INSERT INTO buku (judul, penulis, kategori, tahun, tersedia, sinopsis)
       VALUES ($1, $2, $3, $4, $5, $6)`,
      [data.judul, data.penulis, data.kategori, data.tahun, data.tersedia, data.sinopsis]
    );
  } catch (err) {
    console.error("INSERT buku gagal:", err.message);
    return { errors: { form: PESAN_GAGAL }, values };
  }

  revalidatePath("/");
  revalidatePath("/katalog");
  redirect("/katalog");
}

// UPDATE: id diikat dari halaman edit lewat .bind(null, id), jadi bentuknya (id, stateSebelumnya, formData).
export async function ubahBuku(id, _stateSebelumnya, formData) {
  const idBuku = parseId(id);
  const { errors, values, data } = validasiBuku(formData);
  if (idBuku === null) {
    return { errors: { form: "ID buku tidak valid." }, values };
  }
  if (Object.keys(errors).length > 0) return { errors, values };

  let hasil;
  try {
    hasil = await pool.query(
      `UPDATE buku
          SET judul = $1, penulis = $2, kategori = $3, tahun = $4, tersedia = $5, sinopsis = $6
        WHERE id = $7`,
      [data.judul, data.penulis, data.kategori, data.tahun, data.tersedia, data.sinopsis, idBuku]
    );
  } catch (err) {
    console.error("UPDATE buku gagal:", err.message);
    return { errors: { form: PESAN_GAGAL }, values };
  }

  if (hasil.rowCount === 0) {
    return { errors: { form: "Buku tidak ditemukan. Mungkin sudah dihapus." }, values };
  }

  revalidatePath("/");
  revalidatePath("/katalog");
  revalidatePath(`/katalog/${idBuku}`);
  redirect(`/katalog/${idBuku}`);
}

// DELETE: hanya menghapus satu baris (WHERE id = $1). Konfirmasi dilakukan di TombolHapus.
export async function hapusBuku(id) {
  const idBuku = parseId(id);

  if (idBuku !== null) {
    await pool.query("DELETE FROM buku WHERE id = $1", [idBuku]);
  }

  revalidatePath("/");
  revalidatePath("/katalog");
  redirect("/katalog");
}
