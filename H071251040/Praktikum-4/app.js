const dataPraktikan = [
  { nama: "Budi", nilaiTugas: [80, 85, 90] },
  { nama: "Siti", nilaiTugas: [60, 60, 60] },
  { nama: "Andi", nilaiTugas: [90, 90, 90] },
  { nama: "Dewi", nilaiTugas: [75, 75, 75] },
  { nama: "Eko", nilaiTugas: [45, 45, 45] },
];

const BATAS_LULUS = 75;

//LOGIKA 
const hitungRataRata = (nilai) => nilai.reduce((a, b) => a + b, 0) / nilai.length;

const tentukanStatus = (rata) => (rata >= BATAS_LULUS ? "Lulus" : "Tidak Lulus");

const prosesData = (data) =>
  data.map((p) => {
    const rata = Math.round(hitungRataRata(p.nilaiTugas) * 100) / 100;
    return { ...p, rataRata: rata, status: tentukanStatus(rata) };
  });

// RENDER 
const renderKartu = (p) => {
  const warna = p.status === "Lulus" ? "emerald" : "rose";
  document.write(
    `<div class="flex items-center justify-between gap-4 bg-white rounded-2xl shadow p-5 border-l-8 border-${warna}-500 transition duration-200 hover:-translate-y-1 hover:shadow-xl hover:bg-${warna}-50">
      <div>
        <h3 class="text-lg font-bold">${p.nama}</h3>
        <p class="text-sm text-slate-500">Nilai: ${p.nilaiTugas.join(" • ")}</p>
      </div>
      <div class="text-right">
        <p class="text-3xl font-extrabold text-${warna}-600">${p.rataRata}</p>
        <span class="px-3 py-1 rounded-full text-xs font-semibold bg-${warna}-100 text-${warna}-700">${p.status}</span>
      </div>
    </div>`
  );
};

//PROGRAM UTAMA
const asisten = prompt("Verifikasi Asisten Lab\nMasukkan nama Anda:");

if (!asisten) {
  document.write('<h1 class="text-center text-2xl font-bold text-rose-600 p-20">Akses ditolak: nama asisten kosong.</h1>');
} else {
  const hasil = prosesData(dataPraktikan);
  const jumlahLulus = hasil.filter((p) => p.status === "Lulus").length;

  document.write(
    `<header class="bg-indigo-700 text-white p-8 text-center">
      <h1 class="text-3xl font-extrabold">Laporan Evaluasi Praktikum</h1>
      <p class="text-indigo-200 mt-1">Asisten: ${asisten} • ${jumlahLulus} dari ${hasil.length} praktikan lulus (batas ${BATAS_LULUS})</p>
    </header>
    <main class="max-w-2xl mx-auto p-6 flex flex-col gap-4">`
  );
  hasil.forEach(renderKartu);
  document.write("</main>");

  console.log(hasil);
}