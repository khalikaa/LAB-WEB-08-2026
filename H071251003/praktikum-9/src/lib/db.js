import { Pool } from "pg";

// Simpan pool di globalThis agar tidak dibuat berulang kali saat hot-reload (mode dev).
const globalForPg = globalThis;

const pool =
  globalForPg.pgPool ??
  new Pool({
    connectionString: process.env.DATABASE_URL,
  });

if (process.env.NODE_ENV !== "production") {
  globalForPg.pgPool = pool;
}

export default pool;
