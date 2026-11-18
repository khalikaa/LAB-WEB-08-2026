# Pustaka Senja (Praktikum 9: Next.js + PostgreSQL)

Lanjutan Praktikum 8. Koleksi buku kini disimpan di **PostgreSQL** dan diakses dengan driver **pg**
memakai **raw SQL** (tanpa ORM). Dibangun dengan Next.js App Router, JavaScript, dan Tailwind CSS.

## Cara menjalankan

1. **Buat database.** Di pgAdmin (terhubung ke database `postgres`) jalankan:
   `CREATE DATABASE pustaka_senja;`
2. **Buat tabel dan isi 9 buku awal.** Buka Query Tool pada database `pustaka_senja`, lalu jalankan seluruh
   isi `database/pustaka_senja.sql` **sekali saja**.
3. **Atur koneksi.** Salin `.env.example` menjadi `.env.local` di root proyek, lalu isi `DATABASE_URL`
   dengan user, password, dan port PostgreSQL milikmu. Berkas ini tidak boleh diunggah ke repositori
   (sudah masuk `.gitignore`).
4. Pasang dan jalankan:

```bash
npm install
npm run cek-db   # bukti koneksi: mencetak 9 buku yang terbaca dari PostgreSQL
npm run dev      # buka http://localhost:3000
```

## Halaman

| URL | Fungsi |
| --- | --- |
| `/` | Beranda, statistik (total, tersedia, dipinjam) dihitung PostgreSQL |
| `/katalog` | Daftar buku dari database, filter kategori lewat URL (`?kategori=Fiksi`) |
| `/katalog/[id]` | Detail satu buku, tombol Edit dan Hapus |
| `/katalog/tambah` | Form tambah buku (Create) |
| `/katalog/[id]/edit` | Form ubah buku (Update), terisi data tersimpan |
| `/usulan` | Form usulan buku (tetap dari Praktikum 8) |

## Struktur kode

```
.env.local                     (dibuat sendiri, tidak diunggah)
database/pustaka_senja.sql     CREATE TABLE + 9 INSERT awal
scripts/cek-koneksi.mjs        bukti koneksi (npm run cek-db)
src/lib/db.js                  Pool pg (server-only), membaca DATABASE_URL
src/lib/buku.js                query SELECT (server-only)
src/lib/validasi.js            parseId dan validasi form
src/lib/kategori.js            daftar kategori dan nomor panggil (fungsi murni)
src/app/katalog/actions.js     Server Actions: INSERT, UPDATE, DELETE
src/components/TombolHapus.jsx konfirmasi hapus (Client Component)
```

## Pemetaan ke persyaratan

- **Raw SQL + parameterized query**: seluruh query memakai `pool.query(teksSQL, [nilai])`. Nilai dari form
  atau URL hanya masuk lewat `$1, $2, ...`, tidak pernah digabung ke string SQL.
- **Read**: `SELECT` di `src/lib/buku.js`, dipanggil dari Server Component. Halaman yang membaca database
  memakai `export const dynamic = "force-dynamic"` agar data selalu terbaru dan build tidak butuh database.
- **Create / Update / Delete**: `INSERT INTO`, `UPDATE ... WHERE id = $7`, `DELETE ... WHERE id = $1` di
  `actions.js` (`"use server"`), masing-masing diikuti `revalidatePath()` lalu `redirect()`.
- **Validasi**: `validasi.js` memeriksa judul, penulis, kategori, tahun (bilangan bulat 1000 sampai tahun
  depan), ketersediaan, dan sinopsis. Id dari URL divalidasi `parseId()`; id tidak valid atau buku tidak
  ada menampilkan halaman 404 dengan tautan kembali ke katalog.
- **Server vs Client**: `db.js` dan `buku.js` memakai `import "server-only"`, sehingga build gagal bila ada
  Client Component yang mengimpornya. `"use client"` hanya dipakai di `Navbar`, `FormBuku`
  (`useActionState`), `TombolHapus` (konfirmasi), `TombolSimpan` (favorit), `usulan/page.jsx` (state form),
  dan `error.jsx` (syarat Next.js untuk batas error).
- **Kredensial**: hanya ada di `.env.local` (diabaikan git); tidak ada di source code.

## Catatan

- Buku "Filosofi Teras" (id 9) kolom ketersediaannya kosong pada soal Praktikum 8, diisi `TRUE`
  di `database/pustaka_senja.sql`.
- Tombol "Simpan" (favorit) di kartu hanya state tampilan di browser dan tidak masuk database.
- `src/data/dataBuku.js` sudah dihapus; tidak ada halaman yang membaca array lagi.
