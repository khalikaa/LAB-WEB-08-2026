// Bukti koneksi: node --env-file=.env.local scripts/cek-db.mjs  (atau: npm run cek-db)
import pg from "pg";

const pool = new pg.Pool({ connectionString: process.env.DATABASE_URL });

try {
  const hasil = await pool.query("SELECT id, judul FROM buku ORDER BY id");
  console.log(`Terhubung ke PostgreSQL. Jumlah buku: ${hasil.rowCount}`);
  hasil.rows.forEach((b) => console.log(`${b.id}. ${b.judul}`));
} catch (error) {
  console.error("Gagal terhubung / membaca data:", error.message);
  process.exitCode = 1;
} finally {
  await pool.end();
}
