// data awal
const dataPraktikan = [
    { nama: "Budi", nilaiTugas: [80, 85, 90] },
    { nama: "Siti", nilaiTugas: [60, 60, 60] },
    { nama: "Andi", nilaiTugas: [90, 90, 90] },
    { nama: "Dewi", nilaiTugas: [75, 75, 75] },
    { nama: "Eko", nilaiTugas: [45, 45, 45] }
];

// prompt
let namaAsisten = prompt("Masukkan Nama Asisten Lab untuk Verifikasi Kehadiran:");

if (!namaAsisten || namaAsisten.trim() == "") {
    namaAsisten = "Asisten Pengawas";
}

// rata rata
function hitungRataRata(daftarNilai) {
    let total = 0;
    let jumlahTugas = daftarNilai.length;

    for (let i = 0; i < jumlahTugas; i++) {
    total = total + daftarNilai[i];
    }

    let hasilBagi = total / jumlahTugas;

    let teksDesimal = hasilBagi.toFixed(1);
    let hasilAkhir = Number(teksDesimal);

    return hasilAkhir;
}

// kategori
function tentukanGrade(rataRata) {
    if (rataRata >= 85) {
    return "A";
    } else if (rataRata >= 75) {
    return "B";
    } else if (rataRata >= 60) {
    return "C";
    } else if (rataRata >= 50) {
    return "D";
    } else {
    return "E";
    }
}

function prosesData(data) {
    const hasil = [];

    for (let i = 0; i < data.length; i++) {
        const praktikan = data[i];
        const rata = hitungRataRata(praktikan.nilaiTugas);

    let status;
        if (rata >= 75) {
            status = "LULUS";
        } else {
            status = "TIDAK LULUS";
        }

        const grade = tentukanGrade(rata);

    hasil.push({
        nama: praktikan.nama,
        nilaiTugas: praktikan.nilaiTugas,
        rataRata: rata,
        status: status,
        grade: grade
        });
    }

    return hasil;
}


//total lulus
const hasilEvaluasi = prosesData(dataPraktikan);

let jumlahLulus = 0;
let jumlahTidakLulus = 0;

for (let i = 0; i < hasilEvaluasi.length; i++) {
    if (hasilEvaluasi[i].status == "LULUS") {
    jumlahLulus++;
    } else {
    jumlahTidakLulus++;
    }
}

//document.write
//dashboard
document.write(`
    <div style="max-width: 1100px; margin: 0 auto; box-sizing: border-box;">
    
    <!-- head -->
    <div style="background-color: #ffffff; border-radius: 12px; padding: 28px; border: 1px solid #e2e8f0; box-shadow: 0 2px 4px rgba(0, 0, 0, 0.04); margin-bottom: 32px;">
        <div style="display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 16px; margin-bottom: 24px;">
        <div>
            <span style="display: inline-block; background-color: #eef2ff; color: #4f46e5; font-size: 12px; font-weight: 700; padding: 4px 12px; border-radius: 20px; margin-bottom: 8px;">
            Laboratorium Pemrograman Web
            </span>
            <h1 style="font-size: 24px; color: #1e293b; font-weight: 800; margin: 0;">
            Sistem Laporan Praktikum
            </h1>
            <p style="font-size: 14px; color: #64748b; margin: 4px 0 0 0;">
            Rekapitulasi otomatis nilai akhir tugas praktikan
            </p>
        </div>
        <div style="background-color: #4f46e5; color: #ffffff; padding: 14px 20px; border-radius: 10px; text-align: right;">
            <div style="font-size: 11px; letter-spacing: 0.5px; opacity: 0.85;">Selamat datang Asisten</div>
            <div style="font-size: 18px; font-weight: 700;">${namaAsisten}</div>
        </div>
        </div>

        <!-- stat -->
        <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 16px; border-top: 1px solid #f1f5f9; padding-top: 20px;">
        <div style="padding: 16px; border-radius: 8px; border: 1px solid #e2e8f0; background-color: #f8fafc;">
            <div style="font-size: 12px; font-weight: 600; color: #64748b;">Total Praktikan</div>
            <div style="font-size: 24px; font-weight: 800; margin-top: 4px; color: #1e293b;">${hasilEvaluasi.length}</div>
        </div>
        <div style="padding: 16px; border-radius: 8px; border: 1px solid #a7f3d0; background-color: #ecfdf5; color: #065f46;">
            <div style="font-size: 12px; font-weight: 600; color: #047857;">Jumlah Lulus (&ge; 75)</div>
            <div style="font-size: 24px; font-weight: 800; margin-top: 4px;">${jumlahLulus}</div>
        </div>
        <div style="padding: 16px; border-radius: 8px; border: 1px solid #fecdd3; background-color: #fff1f2; color: #9f1239;">
            <div style="font-size: 12px; font-weight: 600; color: #be123c;">Belum Lulus (&lt; 75)</div>
            <div style="font-size: 24px; font-weight: 800; margin-top: 4px;">${jumlahTidakLulus}</div>
        </div>
        </div>
    </div>

    <!-- judul -->
    <div style="font-size: 18px; font-weight: 700; color: #334155; margin-bottom: 16px;">
        Kartu Evaluasi Praktikan
    </div>
    
    <!-- grid -->
    <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); gap: 24px;">
`);

//praktikan
for (let i = 0; i < hasilEvaluasi.length; i++) {
    const p = hasilEvaluasi[i];
    const isLulus = p.status === "LULUS";

    const statusStyle = isLulus
    ? "background-color: #d1fae5; color: #065f46; border: 1px solid #a7f3d0;"
    : "background-color: #ffe4e6; color: #9f1239; border: 1px solid #fecdd3;";

    const gradeBg = isLulus ? "#10b981" : "#f43f5e";

    let badgeNilaiTugas = "";
    for (let j = 0; j < p.nilaiTugas.length; j++) {
    badgeNilaiTugas += `
        <span style="background-color: #f1f5f9; color: #475569; font-size: 12px; font-family: monospace; padding: 3px 8px; border-radius: 6px; border: 1px solid #e2e8f0;">
        T${j + 1}: ${p.nilaiTugas[j]}
        </span>
    `;
    }

    document.write(`
    <div style="background-color: #ffffff; border-radius: 12px; border: 1px solid #e2e8f0; box-shadow: 0 2px 4px rgba(0, 0, 0, 0.03); display: flex; flex-direction: column; justify-content: space-between; overflow: hidden;">
        <div style="padding: 20px;">
        <div style="display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 16px;">
            <div>
            <div style="font-size: 18px; font-weight: 700; color: #1e293b;">${p.nama}</div>
            <div style="font-size: 12px; color: #94a3b8;">Praktikan #${i + 1}</div>
            </div>
            <span style="font-size: 11px; font-weight: 700; padding: 4px 10px; border-radius: 9999px; ${statusStyle}">
            ${p.status}
            </span>
        </div>

        <div style="font-size: 12px; color: #64748b; margin-bottom: 8px; font-weight: 600;">Daftar Nilai Tugas:</div>
        <div style="display: flex; flex-wrap: wrap; gap: 6px;">
            ${badgeNilaiTugas}
        </div>
        </div>

        <!-- Footer Tiap Kartu -->
        <div style="background-color: #f8fafc; border-top: 1px solid #f1f5f9; padding: 14px 20px; display: flex; justify-content: space-between; align-items: center;">
        <div>
            <span style="display: block; font-size: 11px; color: #94a3b8;">Rata-Rata</span>
            <span style="font-size: 20px; font-weight: 800; color: #1e293b;">${p.rataRata}</span>
        </div>
        <div>
            <span style="display: block; font-size: 11px; color: #94a3b8; text-align: right;">Predikat</span>
            <span style="display: inline-block; font-size: 12px; font-weight: 700; padding: 3px 10px; border-radius: 6px; color: #ffffff; background-color: ${gradeBg};">
            Grade ${p.grade}
            </span>
        </div>
        </div>
    </div>
    `);
}

document.write(`
    </div>
    <footer style="text-align: center; margin-top: 40px; font-size: 12px; color: #94a3b8;">
        &copy; 2026 Praktikum Pemrograman Web - Universitas Hasanuddin
    </footer>
    </div>
`);

//konsol
console.log("=== LAPORAN EVALUASI PRAKTIKAN ===");
console.log("Asisten:", namaAsisten);
console.log("Data Rekapitulasi (Array of Objects):", hasilEvaluasi);
console.table(hasilEvaluasi);