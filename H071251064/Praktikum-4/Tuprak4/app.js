const dataPraktikan = [
  { nama: "Budi", nilaiTugas: [80, 85, 90] },
  { nama: "Siti", nilaiTugas: [60, 60, 60] },
  { nama: "Andi", nilaiTugas: [90, 90, 90] },
  { nama: "Dewi", nilaiTugas: [75, 75, 75] },
  { nama: "Eko", nilaiTugas: [45, 45, 45] },
  { nama: "Lani", nilaiTugas: [80, 80, 80] }
];

const namaAsisten = prompt("Masukkan nama Asisten Lab:");

if (namaAsisten == "Aqilah") {
  const hasilEvaluasi = dataPraktikan.map((p) => {
    const totalNilai = p.nilaiTugas.reduce((nilai1, nilai2) => nilai1 + nilai2, 0);
    const avg = totalNilai / p.nilaiTugas.length;
    
    return { 
      nama: p.nama,
      nilaiTugas: p.nilaiTugas,
      rataRata: Number(avg.toFixed(2)),
      status: avg >= 75 ? "Lulus" : "Tidak Lulus"
    };
  });

  const totalLulus = hasilEvaluasi.filter((p) => p.status === "Lulus").length;
  const totalGagal = hasilEvaluasi.length - totalLulus;

  document.write(`
    <style>
      * { 
        box-sizing: border-box; 
        margin: 0; 
        padding: 0; 
        font-family: system-ui, sans-serif; 
      }
      body { 
        background: #f1f5f9; 
        color: #0f172a; 
        padding: 24px 16px; 
      }
      .container { 
        max-width: 1000px; 
        margin: 0 auto; 
      }
      .header { 
        background: #ffffff; 
        padding: 24px; 
        border-radius: 16px; 
        margin-bottom: 24px; 
        box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.05); 
      }
      .header-top { 
        display: flex; 
        justify-content: space-between; 
        align-items: center; 
        margin-bottom: 20px; 
        border-bottom: 1px solid #e2e8f0; 
        padding-bottom: 16px; 
      }
      .badge { 
        background: #e0e7ff; 
        color: #4338ca; 
        font-size: 11px; 
        font-weight: 700; 
        padding: 4px 10px; 
        border-radius: 20px; 
        text-transform: uppercase; 
      }
      .asisten { 
        font-size: 14px; 
        background: #f8fafc; 
        padding: 8px 14px; 
        border-radius: 10px; 
        border: 1px solid #e2e8f0; 
      }
      .stats { 
        display: grid; 
        grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); 
        gap: 16px; 
      }
      .stat-card { 
        background: #f8fafc; 
        padding: 16px; 
        border-radius: 12px; 
        border: 1px solid #e2e8f0; 
      }
      .stat-card.lulus { 
        background: #ecfdf5; 
        border-color: #a7f3d0; 
        color: #047857; 
      }
      .stat-card.gagal { 
        background: #fef2f2; 
        border-color: #fecaca; 
        color: #b91c1c; 
      }
      .grid { 
        display: grid; 
        grid-template-columns: repeat(auto-fill, minmax(280px, 1fr)); 
        gap: 20px; 
      }
      .card { 
        background: #ffffff; 
        border-radius: 16px; 
        padding: 20px; 
        border: 1px solid #e2e8f0; 
        display: flex; 
        flex-direction: column; 
        justify-content: space-between; 
        transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
      }
      .card.card-lulus:hover {
        border-color: #10b981;
        transform: translateY(-4px);
        box-shadow: 0 10px 20px -3px rgba(16, 185, 129, 0.25);
      }
      .card.card-gagal:hover {
        border-color: #ef4444;
        transform: translateY(-4px);
        box-shadow: 0 10px 20px -3px rgba(239, 68, 68, 0.25);
      }
      .card-top { 
        display: flex; 
        justify-content: space-between; 
        align-items: center; 
        margin-bottom: 16px; 
      }
      .st-badge { 
        font-size: 11px; 
        font-weight: 700; 
        padding: 4px 10px; 
        border-radius: 20px; 
        text-transform: uppercase; 
      }
      .st-lulus { 
        background: #d1fae5; 
        color: #047857; 
      }
      .st-gagal { 
        background: #fee2e2; 
        color: #b91c1c; 
      }
      .nilai-grid { 
        display: flex; 
        gap: 8px; 
        margin: 12px 0 16px; 
      }
      .nilai-item { 
        flex: 1; 
        background: #f8fafc; 
        border: 1px solid #e2e8f0; 
        padding: 6px; 
        border-radius: 8px; 
        text-align: center; 
      }
      .t-num { 
        font-size: 10px; 
        color: #64748b; 
        font-weight: 700; 
        display: block; 
      }
      .t-val { 
        font-size: 14px; 
        font-weight: 700; 
      }
      .card-ft { 
        display: flex; 
        justify-content: space-between; 
        align-items: center; 
        border-top: 1px solid #f1f5f9; 
        padding-top: 12px; 
        font-size: 14px; 
        font-weight: 700; 
      }
    </style>

    <div class="container">
      <div class="header">
        <div class="header-top">
          <div>
            <span class="badge">Sistem Evaluasi</span>
            <h1 style="font-size: 22px; margin-top: 6px;">Dashboard Praktikum</h1>
          </div>
          <div class="asisten">
            Asisten: <b>${namaAsisten}</b>
          </div>
        </div>
        
        <div class="stats">
          <div class="stat-card">
            <small>TOTAL PRAKTIKAN</small>
            <h2 style="margin-top: 4px; font-size: 18px;">${hasilEvaluasi.length} Orang</h2>
          </div>
          <div class="stat-card lulus">
            <small>LULUS (≥ 75)</small>
            <h2 style="margin-top: 4px; font-size: 18px;">${totalLulus} Praktikan</h2>
          </div>
          <div class="stat-card gagal">
            <small>TIDAK LULUS (&lt; 75)</small>
            <h2 style="margin-top: 4px; font-size: 18px;">${totalGagal} Praktikan</h2>
          </div>
        </div>
      </div>

      <h2 style="font-size: 18px; margin-bottom: 16px;">Hasil Evaluasi</h2>
      
      <div class="grid">
        ${hasilEvaluasi
          .map((p) => {
            const isLulus = p.status === "Lulus";
            return `
              <div class="card ${isLulus ? "card-lulus" : "card-gagal"}">
                <div>
                  <div class="card-top">
                    <h3>${p.nama}</h3>
                    <span class="st-badge ${isLulus ? "st-lulus" : "st-gagal"}">
                      ${p.status}
                    </span>
                  </div>
                  <small style="color: #64748b; font-size: 11px; font-weight: 600;">
                    RINCIAN TUGAS:
                  </small>
                  <div class="nilai-grid">
                    ${p.nilaiTugas
                      .map(
                        (n, i) => `
                        <div class="nilai-item">
                          <span class="t-num">T${i + 1}</span>
                          <span class="t-val">${n}</span>
                        </div>
                      `
                      )
                      .join("")}
                  </div>
                </div>
                <div class="card-ft">
                  <span style="color: #64748b; font-weight: 500; font-size: 12px;">
                    Rata-rata
                  </span>
                  <span style="color: ${isLulus ? "#047857" : "#b91c1c"}">
                    ${p.rataRata}
                  </span>
                </div>
              </div>
            `;
          })
          .join("")}
      </div>
    </div>
  `);
  console.table(hasilEvaluasi);
} else {
  document.write(`
    <style>
      body { 
        background: #f1f5f9; 
        font-family: sans-serif; 
        display: flex; 
        justify-content: center; 
        align-items: center; 
        min-height: 90vh; 
      }
      .err { 
        background: #fee2e2; 
        border: 1px solid #fca5a5; 
        padding: 24px; 
        border-radius: 16px; 
        text-align: center; 
        color: #991b1b; 
      }
    </style>
    <div class="err">
      <h2>Akses Ditolak!</h2>
      <p>Verifikasi kehadiran Asisten Lab gagal.</p>
    </div>
  `);
}