import "server-only";
import pool from "@/lib/db";


export function idValid(id) {
  return /^\d+$/.test(String(id)) && Number(id) > 0 && Number(id) <= 2147483647;
}

export async function getSemuaBuku() {
  const hasil = await pool.query(
    `SELECT id, judul, penulis, kategori, tahun, tersedia, sinopsis
     FROM buku
     ORDER BY id ASC`
  );
  return hasil.rows;
}

export async function getBukuById(id) {
  if (!idValid(id)) return null;

  const hasil = await pool.query(
    `SELECT id, judul, penulis, kategori, tahun, tersedia, sinopsis
     FROM buku
     WHERE id = $1`,
    [id]
  );
  return hasil.rows[0] ?? null;
}

export async function getStatistik() {
  const hasil = await pool.query(
    `SELECT
       COUNT(*)::int                          AS total,
       COUNT(*) FILTER (WHERE tersedia)::int  AS tersedia,
       COUNT(*) FILTER (WHERE NOT tersedia)::int AS dipinjam
     FROM buku`
  );
  return hasil.rows[0];
}
