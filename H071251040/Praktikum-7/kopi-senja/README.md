# Kedai Kopi Senja

Halaman pemesanan mandiri untuk Kedai Kopi Senja. Dibuat dengan React (Vite) dan Tailwind CSS.

## Menjalankan

```bash
npm install
npm run dev
```

Buka alamat yang tampil di terminal (biasanya http://localhost:5173).

## Struktur state

- `App.jsx`: `kategoriAktif` dan `pesanan` (daftar `{ id, jumlah }`). Jumlah item dan total harga dihitung dari `pesanan`, sehingga angka di Navbar dan Ringkasan selalu sama.
- `MenuCard.jsx`: `terbuka` (detail menu), terpisah untuk tiap kartu.
- `FormPesan.jsx`: `nama`, `meja`, `galat`, `terkirim`.
