"use server";

import pool from "@/lib/db";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export async function tambahBuku(formData) {
    const judul = formData.get("judul")?.toString().trim();
    const penulis = formData.get("penulis")?.toString().trim();
    const kategori = formData.get("kategori")?.toString().trim();
    const tahunStr = formData.get("tahun")?.toString().trim();
    const tersediaStr = formData.get("tersedia")?.toString().trim();
    const sinopsis = formData.get("sinopsis")?.toString().trim();

    if (!judul || !penulis || !kategori || !tahunStr || !sinopsis) {
        throw new Error("Semua kolom formulir wajib diisi!");
    }

    const tahun = parseInt(tahunStr, 10);
    const tersedia = tersediaStr === "true";

    await pool.query(
        `INSERT INTO buku (judul, penulis, kategori, tahun, tersedia, sinopsis)
        VALUES ($1, $2, $3, $4, $5, $6);`,
        [judul, penulis, kategori, tahun, tersedia, sinopsis]
    );

    revalidatePath("/katalog");
    revalidatePath("/");
    }

    export async function ubahBuku(id, formData) {
    const judul = formData.get("judul")?.toString().trim();
    const penulis = formData.get("penulis")?.toString().trim();
    const kategori = formData.get("kategori")?.toString().trim();
    const tahunStr = formData.get("tahun")?.toString().trim();
    const tersediaStr = formData.get("tersedia")?.toString().trim();
    const sinopsis = formData.get("sinopsis")?.toString().trim();

    if (!judul || !penulis || !kategori || !tahunStr || !sinopsis) {
        throw new Error("Semua kolom formulir wajib diisi!");
    }

    const tahun = parseInt(tahunStr, 10);
    const tersedia = tersediaStr === "true";

    await pool.query(
        `UPDATE buku 
        SET judul = $1, penulis = $2, kategori = $3, tahun = $4, tersedia = $5, sinopsis = $6
        WHERE id = $7;`,
        [judul, penulis, kategori, tahun, tersedia, sinopsis, id]
    );

    revalidatePath("/katalog");
    revalidatePath(`/katalog/${id}`);
    revalidatePath("/");

    redirect(`/katalog/${id}?status=sukses`);
    }

    export async function hapusBuku(id) {
    await pool.query("DELETE FROM buku WHERE id = $1;", [id]);

    revalidatePath("/katalog");
    revalidatePath("/");
}