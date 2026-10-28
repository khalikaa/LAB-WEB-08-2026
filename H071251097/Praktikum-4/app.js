// Data awal praktikan
const dataPraktikan = [
  { nama: "Andi", nilaiTugas: [80, 85, 90] },
  { nama: "Siti", nilaiTugas: [60, 60, 60] },
  { nama: "Ayla", nilaiTugas: [90, 90, 90] },
  { nama: "Dewi", nilaiTugas: [75, 75, 75] },
  { nama: "Eko", nilaiTugas: [45, 45, 45] }
];

// 1. Verification Prompt Asisten Lab
const namaAsisten = prompt("Masukkan nama Anda (Asisten Lab):") || "Asisten Lab";
 
// 2. Pemrosesan Data & Sorting (Lulus di atas, Tidak Lulus di bawah)
// acc = accumulator(penampung data sementara), curr = current value(nilai tugas saat ini)
function prosesDataPraktikan(data) {
  const hasil = data.map((praktikan) => {
    const totalNilai = praktikan.nilaiTugas.reduce((acc, curr) => acc + curr, 0);
    const rataRata = (totalNilai / praktikan.nilaiTugas.length).toFixed(1); // membulatkan rata-rata ke 1 desimal
    const status = rataRata >= 75 ? "Lulus" : "Tidak Lulus";

    return {
      nama: praktikan.nama,
      nilaiTugas: praktikan.nilaiTugas,
      rataRata: parseFloat(rataRata), // mengubah string ke number
      status: status
    };
  });

  // Urutan Lulus di atas, Tidak Lulus di bawah
  return hasil.sort((a, b) => {
    if (a.status === "Lulus" && b.status !== "Lulus") return -1;
    if (a.status !== "Lulus" && b.status === "Lulus") return 1;
    return b.rataRata - a.rataRata; // jika status sama, diurutkan berdasarkan rata-rata tertinggi
  });
}

const hasilEvaluasi = prosesDataPraktikan(dataPraktikan);
// Ringkasan Statistik Kelas
const totalPraktikan = hasilEvaluasi.length;
const totalLulus = hasilEvaluasi.filter(p => p.status === "Lulus").length;
const totalTidakLulus = totalPraktikan - totalLulus;
const rataRataKelas = (hasilEvaluasi.reduce((acc, p) => acc + p.rataRata, 0) / totalPraktikan).toFixed(1);

// 3. Render Laporan Menggunakan document.write()
document.write(`
  <div class="min-h-screen bg-sky-100/70 text-slate-800 font-sans p-6 md:p-10 flex justify-center">
    <div class="w-full max-w-5xl space-y-6"> <!-- kotak putih ditengah --!> 
      
      <!-- HEADER DASHBOARD -->
      <header class="bg-white border-2 border-slate-200/90 rounded-2xl p-6 shadow-md flex flex-col md:flex-row md:items-center justify-between gap-6"> <!-- kotak putih paling atas--!>
        <div>
          <span class="text-xs font-semibold text-sky-700 bg-sky-50 px-2.5 py-1 rounded-md border border-sky-200"> <!-- sisi  kiri atas--!>
            Laporan Praktikum
          </span>
          <h1 class="text-2xl font-bold text-slate-900 mt-2">Sistem Evaluasi Praktikan</h1>
          <p class="text-xs text-slate-500 mt-0.5">Penilaian otomatis & status kelulusan</p>
        </div>

        <div class="bg-sky-50 border border-sky-200 px-3.5 py-2.5 rounded-xl flex items-center gap-3 self-start md:self-center shadow-xs">
          <!-- Foto Profil Real Mahasiswa (Asisten Lab) -->
          <img src="https://i.pinimg.com/736x/6a/fc/53/6afc531387f03d939c455eee8fec3927.jpg" alt="Foto Asisten" class="w-10 h-10 rounded-full border-2 border-sky-400 object-cover shadow-sm">
          <div>
            <p class="text-[10px] text-sky-700 font-semibold uppercase">Asisten Lab Bertugas</p>
            <p class="text-xs font-bold text-slate-800">${namaAsisten}</p>
          </div>
        </div>
      </header>

      <!-- STATISTIK RINGKASAN -->
      <section class="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div class="bg-white border-2 border-slate-200 rounded-xl p-4 text-center shadow-md">
          <p class="text-xs font-semibold text-slate-500 uppercase tracking-wider">Total Praktikan</p>
          <p class="text-2xl font-bold text-slate-900 mt-1">${totalPraktikan}</p>
        </div>
        <div class="bg-emerald-50 border-2 border-emerald-300 rounded-xl p-4 text-center shadow-md">
          <p class="text-xs font-semibold text-emerald-800 uppercase tracking-wider">Praktikan Lulus</p>
          <p class="text-2xl font-bold text-emerald-600 mt-1">${totalLulus}</p>
        </div>
        <div class="bg-rose-50 border-2 border-rose-300 rounded-xl p-4 text-center shadow-md">
          <p class="text-xs font-semibold text-rose-800 uppercase tracking-wider">Tidak Lulus</p>
          <p class="text-2xl font-bold text-rose-600 mt-1">${totalTidakLulus}</p>
        </div>
        <div class="bg-white border-2 border-slate-200 rounded-xl p-4 text-center shadow-md">
          <p class="text-xs font-semibold text-sky-700 uppercase tracking-wider">Rata-Rata Kelas</p>
          <p class="text-2xl font-bold text-sky-600 mt-1">${rataRataKelas}</p>
        </div>
      </section>

      <!-- DAFTAR HASIL BELAJAR -->
      <main class="space-y-4">
        <div class="flex items-center justify-between px-2">
          <h2 class="text-xl font-bold text-slate-800">Hasil Evaluasi Belajar</h2>
          <span class="text-xs font-semibold text-slate-600 bg-white/80 border border-slate-300 px-3 py-1 rounded-full shadow-xs">
            Batas Kelulusan: 75
          </span>
        </div>

        <div class="space-y-4">
`);

// Loop render setiap kartu praktikan
hasilEvaluasi.forEach((p) => {
  const isLulus = p.status === "Lulus";

  const cardBorder = isLulus // card border
    ? 'border-emerald-300' 
    : 'border-rose-300';

  const badgeStyle = isLulus // latar belakang
    ? 'bg-emerald-100 text-emerald-800 border-emerald-300'
    : 'bg-rose-100 text-rose-800 border-rose-300';

  const scoreColor = isLulus 
  ? 'text-emerald-600' 
  : 'text-rose-600';

  document.write(`
    <div class="bg-white border-2 ${cardBorder} rounded-2xl p-6 shadow-md hover:shadow-lg hover:-translate-y-0.5 transition-all duration-200 flex flex-col md:flex-row md:items-center justify-between gap-6">
      
      <!-- 1. Identitas Nama + Foto Real Mahasiswa -->
      <div class="flex items-center gap-4 min-w-[180px]">
        <img src="https://i.pinimg.com/1200x/c0/9a/3e/c09a3e69b54b46b7f1769c1a68d10a1f.jpg" alt="Foto ${p.nama}" class="w-12 h-12 rounded-full border-2 border-slate-200 object-cover shadow-sm shrink-0"> <!-- foto tetap bundar sempurna --!>
        <div>
          <h3 class="text-xl font-bold text-slate-900">${p.nama}</h3>
          <span class="inline-block md:hidden px-2.5 py-0.5 text-xs font-bold rounded-md border ${badgeStyle} mt-1"> <!-- badge status di hp --!>
            ${p.status}
          </span>
        </div>
      </div>

      <!-- 2. Nilai Tugas Harian -->
      <div class="flex-1 max-w-md">
        <p class="text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-2 text-center">NILAI TUGAS HARIAN</p>
        <div class="grid grid-cols-3 gap-3">
          ${p.nilaiTugas.map((n, i) => ` <!-- map berfungsi untuk menampilkan nilai tugas yang ada --!>
            <div class="bg-slate-50 border border-slate-200 rounded-xl p-3 text-center shadow-2xs">
              <span class="block text-[11px] font-medium text-slate-400">Tugas ${i + 1}</span>
              <span class="text-lg font-bold text-slate-800 mt-1 block">${n}</span>
            </div>
          `).join('')} <!-- menggabungkan seluruh potongan elemen array menjadi satu baris -->
        </div>
      </div>

      <!-- 3. Rata-Rata & Badge Status -->
      <div class="flex items-center justify-between md:justify-end gap-6 border-t md:border-t-0 pt-4 md:pt-0 border-slate-100 min-w-[200px]">
        <div class="text-left md:text-center">
          <span class="block text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-1">NILAI RATA-RATA</span>
          <span class="text-3xl font-black ${scoreColor}">${p.rataRata}</span>
        </div>

        <div class="hidden md:block text-right">
          <span class="px-4 py-2 text-xs font-bold rounded-xl border ${badgeStyle}">
            ${p.status}
          </span>
        </div>
      </div>

    </div>
  `);
});

document.write(`
        </div>
      </main>

      <!-- FOOTER -->
      <footer class="text-center pt-4 text-xs font-medium text-slate-500">
        Sistem Laporan Praktikum Diproses dengan JavaScript
      </footer>

    </div>
  </div>
`);

console.log("=== DATA HASIL EVALUASI PRAKTIKAN ===");
console.table(hasilEvaluasi);