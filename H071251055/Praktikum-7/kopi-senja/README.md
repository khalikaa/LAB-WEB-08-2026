# Kedai Kopi Senja

Halaman pemesanan mandiri untuk Kedai Kopi Senja, dibuat dengan React (Vite), function component, `useState`, dan Tailwind CSS. Tema visual: retro warm / vintage journal (parchment, amber, espresso).

## Menjalankan

```bash
npm install
npm run dev      # buka alamat yang ditampilkan (biasanya http://localhost:5173)
npm run build    # build produksi
```

## Struktur

```
kopi-senja/
├── index.html
├── package.json
├── vite.config.js
├── tailwind.config.js
├── postcss.config.js
├── README.md
└── src/
    ├── main.jsx
    ├── index.css
    ├── App.jsx                 data menu + state utama
    └── components/
        ├── Navbar.jsx          judul, total pesanan, tab kategori
        ├── MenuList.jsx        daftar kartu menu
        ├── MenuCard.jsx        kartu menu (state detail milik sendiri)
        ├── RingkasanPesanan.jsx struk pesanan
        ├── FormPesan.jsx       form nama + nomor meja, validasi
        └── Footer.jsx
```

## Desain state

| State | Lokasi | Keterangan |
| --- | --- | --- |
| `kategoriAktif` | `App` | satu-satunya sumber filter kategori |
| `pesanan` | `App` | objek `{ idMenu: jumlah }` |
| `terkirim` | `App` | `{ nama, meja }` untuk ucapan terima kasih, atau `null` |
| `terbuka` | `MenuCard` | detail tiap kartu independen |
| `nama`, `meja`, `galat` | `FormPesan` | input terkontrol dan pesan validasi |

Jumlah item dan total harga **tidak** disimpan sebagai state: dihitung sekali di `App` dari `pesanan`, lalu dikirim lewat props ke `Navbar` dan `RingkasanPesanan` sehingga angkanya selalu sama.

## Validasi form

- Nama: wajib, minimal 2 karakter, hanya huruf.
- Nomor meja: wajib, angka 1–99.
- Pesanan kosong: ditolak dengan pesan.
- Setelah berhasil: ucapan terima kasih muncul, form dan pesanan dikosongkan.
