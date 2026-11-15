import { Pool } from "pg";

const globalUntukPg = globalThis;

const pool =
  globalUntukPg.poolPustakaSenja ??
  new Pool({ connectionString: process.env.DATABASE_URL });

if (process.env.NODE_ENV !== "production") {
  globalUntukPg.poolPustakaSenja = pool;
}

export default pool;