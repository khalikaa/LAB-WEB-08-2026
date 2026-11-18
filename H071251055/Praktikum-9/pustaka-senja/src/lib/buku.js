import "server-only";
import { pool } from "@/lib/db";

// Query SELECT (Read). Semuanya raw SQL lewat pool.query(); nilai dinamis selalu
// dikirim sebagai parameter ($1, $2, ...) dan tidak pernah digabung ke string SQL.

// Daftar buku untuk Katalog. Bila `kategori` diisi, hanya kategori itu yang diambil.
export async function ambilSemuaBuku(kategori) {
  const hasil = await pool.query(
    `SELECT id, judul, penulis, kategori, tahun, tersedia
       FROM buku
      WHERE ($1::text IS NULL OR kategori = $1::text)
      ORDER BY id ASC`,
    [kategori ?? null]
  );
  return hasil.rows;
}

// Kategori yang benar-benar ada di database, untuk sekat filter pada Katalog.
export async function ambilKategori() {
  const hasil = await pool.query("SELECT DISTINCT kategori FROM buku ORDER BY kategori ASC");
  return hasil.rows.map((baris) => baris.kategori);
}

// Satu buku berdasarkan id (id harus sudah lolos parseId). Mengembalikan null bila tidak ada.
export async function ambilBukuById(id) {
  const hasil = await pool.query(
    `SELECT id, judul, penulis, kategori, tahun, tersedia, sinopsis
       FROM buku
      WHERE id = $1`,
    [id]
  );
  return hasil.rows[0] ?? null;
}

// Statistik koleksi untuk Beranda, dihitung langsung oleh PostgreSQL.
export async function ambilStatistik() {
  const hasil = await pool.query(
    `SELECT COUNT(*)::int AS total,
            COUNT(*) FILTER (WHERE tersedia)::int      AS tersedia,
            COUNT(*) FILTER (WHERE NOT tersedia)::int  AS dipinjam
       FROM buku`
  );
  return hasil.rows[0];
}
