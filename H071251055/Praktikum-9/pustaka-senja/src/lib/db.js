import "server-only"; // build gagal bila berkas ini ikut diimpor oleh Client Component
import { Pool } from "pg";


const globalUntukPg = globalThis;

export const pool =
  globalUntukPg.poolPustakaSenja ??
  new Pool({ connectionString: process.env.DATABASE_URL });

if (!globalUntukPg.poolPustakaSenja) {
  pool.on("error", (err) => {
    console.error("Koneksi PostgreSQL yang menganggur bermasalah:", err.message);
  });
}

if (process.env.NODE_ENV !== "production") {
  globalUntukPg.poolPustakaSenja = pool;
}
