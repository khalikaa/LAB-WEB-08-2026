# Pustaka Senja (Praktikum 9: Next.js + PostgreSQL)

Aplikasi ruang baca komunitas dengan Next.js App Router, Tailwind CSS, dan PostgreSQL
(driver `pg`, raw SQL, tanpa ORM).

## Menjalankan

1. Buat database di PostgreSQL, misalnya `pustaka_senja`.
2. Buka `database/schema.sql` di pgAdmin (Query Tool pada database tersebut) lalu jalankan.
   Ini membuat tabel `buku` dan mengisi 9 data awal.
3. Edit `.env.local` di root proyek, isi `DATABASE_URL` sesuai PostgreSQL kamu:
   `postgresql://USER:PASSWORD@localhost:5432/pustaka_senja`
4. Jalankan:

```bash
npm install
npm run cek-db   # bukti koneksi: menampilkan 9 buku dari PostgreSQL
npm run dev
```

Buka http://localhost:3000

`.env.local` tidak boleh di-commit (sudah masuk `.gitignore`). Gunakan `.env.example` sebagai contoh.

## Halaman

| URL | Isi |
| --- | --- |
| `/` | Beranda: Hero + statistik dari database |
| `/katalog` | Daftar buku (SELECT), filter kategori, Edit & Hapus |
| `/katalog/tambah` | Form tambah buku (INSERT lewat Server Action) |
| `/katalog/[id]` | Detail buku (SELECT ... WHERE id = $1) |
| `/katalog/[id]/edit` | Form ubah buku (UPDATE ... WHERE id = $7) |

Hapus buku (DELETE ... WHERE id = $1) memakai `TombolHapus` dengan konfirmasi.

## Struktur penting

- `src/lib/db.js` : `Pool` koneksi (server-only)
- `src/lib/buku.js` : query SELECT (semua, per id, statistik)
- `src/lib/validasi.js` : validasi input form
- `src/app/katalog/actions.js` : Server Actions (INSERT, UPDATE, DELETE + `revalidatePath`)
- `src/components/TombolHapus.jsx`, `FormBuku.jsx`, `BukuCard.jsx`, `KatalogDaftar.jsx` : Client Component
