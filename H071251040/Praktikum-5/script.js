const API = "https://jsonplaceholder.typicode.com";

const wrapStatusAnggota = document.getElementById("wrapStatusAnggota");
const statusAnggota = document.getElementById("statusAnggota");
const errorAnggota = document.getElementById("errorAnggota");
const daftarAnggota = document.getElementById("daftarAnggota");

const judulTugas = document.getElementById("judulTugas");
const ringkasan = document.getElementById("ringkasan");
const breadcrumb = document.getElementById("breadcrumb");
const wrapProgres = document.getElementById("wrapProgres");
const persen = document.getElementById("persen");
const barProgres = document.getElementById("barProgres");
const infoAwal = document.getElementById("infoAwal");
const wrapStatusTugas = document.getElementById("wrapStatusTugas");
const statusTugas = document.getElementById("statusTugas");
const errorTugas = document.getElementById("errorTugas");
const areaTugas = document.getElementById("areaTugas");
const cariTugas = document.getElementById("cariTugas");
const formTugas = document.getElementById("formTugas");
const inputJudul = document.getElementById("inputJudul");
const tombolSimpan = document.getElementById("tombolSimpan");
const pesanForm = document.getElementById("pesanForm");
const notifikasi = document.getElementById("notifikasi");
const pesanKosong = document.getElementById("pesanKosong");
const daftarTugas = document.getElementById("daftarTugas");

const ITEM_AKTIF = ["bg-lime-300/15", "text-lime-200", "border-lime-300"];
const ITEM_NONAKTIF = ["text-cream-100/70", "border-transparent", "hover:bg-white/5"];
const BADGE_AKTIF = ["bg-lime-300", "text-forest-950"];
const BADGE_NONAKTIF = ["bg-white/10", "text-cream-100/60"];
const KELAS_SELESAI = ["line-through", "text-gray-400"];

let anggotaAktifId = null;
let timerNotifikasi = null;

function tampilkanPesan(elemen, teks) {
  elemen.textContent = teks;
  elemen.classList.toggle("hidden", teks === "");
}

function buatSlug(nama) {
  return nama.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "");
}

/* ---------- F1: Daftar anggota ---------- */
async function muatAnggota() {
  statusAnggota.textContent = "Memuat anggota...";
  wrapStatusAnggota.classList.remove("hidden");
  tampilkanPesan(errorAnggota, "");
  try {
    const respons = await fetch(API + "/users");
    if (!respons.ok) {
      throw new Error("Status " + respons.status);
    }
    const anggota = await respons.json();
    anggota.forEach((orang, i) => {
      const btn = document.createElement("button");
      btn.type = "button";
      btn.dataset.id = orang.id;
      btn.className = "muncul w-full flex items-center gap-3 rounded-lg border-l-2 px-2 py-2 text-left text-sm transition";
      btn.style.animationDelay = i * 35 + "ms";
      btn.classList.add(...ITEM_NONAKTIF);

      const badge = document.createElement("span");
      badge.dataset.badge = "1";
      badge.className = "shrink-0 w-7 h-6 rounded-md flex items-center justify-center font-mono text-[11px] font-bold";
      badge.classList.add(...BADGE_NONAKTIF);
      badge.textContent = String(i + 1).padStart(2, "0");

      const nama = document.createElement("span");
      nama.className = "truncate";
      nama.textContent = orang.name;

      btn.appendChild(badge);
      btn.appendChild(nama);
      btn.addEventListener("click", () => pilihAnggota(orang, btn));
      daftarAnggota.appendChild(btn);
    });
  } catch (error) {
    tampilkanPesan(errorAnggota, "Gagal memuat anggota: " + error.message);
  } finally {
    statusAnggota.textContent = "";
    wrapStatusAnggota.classList.add("hidden");
  }
}

/* ---------- F2: Tugas anggota ---------- */
async function pilihAnggota(orang, tombol) {
  anggotaAktifId = orang.id;

  daftarAnggota.querySelectorAll("button").forEach((b) => {
    const badge = b.querySelector("[data-badge]");
    b.classList.remove(...ITEM_AKTIF);
    b.classList.add(...ITEM_NONAKTIF);
    badge.classList.remove(...BADGE_AKTIF);
    badge.classList.add(...BADGE_NONAKTIF);
  });
  const badgeAktif = tombol.querySelector("[data-badge]");
  tombol.classList.remove(...ITEM_NONAKTIF);
  tombol.classList.add(...ITEM_AKTIF);
  badgeAktif.classList.remove(...BADGE_NONAKTIF);
  badgeAktif.classList.add(...BADGE_AKTIF);

  judulTugas.textContent = "Tugas " + orang.name;
  breadcrumb.textContent = "tim-marsha / " + buatSlug(orang.name);
  ringkasan.textContent = "";
  wrapProgres.classList.add("hidden");
  infoAwal.classList.add("hidden");
  tampilkanPesan(errorTugas, "");
  statusTugas.textContent = "Memuat tugas...";
  wrapStatusTugas.classList.remove("hidden");
  areaTugas.classList.add("hidden");
  daftarTugas.innerHTML = "";
  cariTugas.value = "";
  inputJudul.value = "";
  pesanForm.textContent = "";
  notifikasi.textContent = "";
  pesanKosong.textContent = "";

  try {
    const respons = await fetch(API + "/todos?userId=" + orang.id);
    if (!respons.ok) {
      throw new Error("Status " + respons.status);
    }
    const tugas = await respons.json();
    if (anggotaAktifId !== orang.id) return; // sudah pindah anggota

    tugas.forEach((t) => daftarTugas.appendChild(buatItemTugas(t)));
    areaTugas.classList.remove("hidden");
    wrapProgres.classList.remove("hidden");
    perbaruiTampilan();
  } catch (error) {
    if (anggotaAktifId !== orang.id) return;
    tampilkanPesan(errorTugas, "Gagal memuat tugas: " + error.message);
  } finally {
    if (anggotaAktifId === orang.id) {
      statusTugas.textContent = "";
      wrapStatusTugas.classList.add("hidden");
    }
  }
}

function aturIkon(ikon, selesai) {
  ikon.textContent = "";
  if (selesai) {
    ikon.className = "shrink-0 w-5 h-5 rounded-md bg-forest-800 flex items-center justify-center";
    const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
    svg.setAttribute("viewBox", "0 0 20 20");
    svg.setAttribute("class", "w-3 h-3 text-lime-300");
    const path = document.createElementNS("http://www.w3.org/2000/svg", "path");
    path.setAttribute("d", "M5 10.5l3.2 3.2L15 7");
    path.setAttribute("fill", "none");
    path.setAttribute("stroke", "currentColor");
    path.setAttribute("stroke-width", "2.5");
    path.setAttribute("stroke-linecap", "round");
    path.setAttribute("stroke-linejoin", "round");
    svg.appendChild(path);
    ikon.appendChild(svg);
  } else {
    ikon.className = "shrink-0 w-5 h-5 rounded-md border-2 border-forest-900/30 bg-white";
  }
}

function buatItemTugas(tugas) {
  const li = document.createElement("li");
  li.className = "muncul flex items-center gap-3 px-3 py-3 border-l-2 border-transparent hover:border-green-600 hover:bg-cream-100/70 transition";
  li.dataset.done = tugas.completed ? "true" : "false";

  const ikon = document.createElement("span");
  aturIkon(ikon, tugas.completed);
  li.appendChild(ikon);

  const judul = document.createElement("span");
  judul.dataset.judul = "1";
  judul.className = "flex-1 min-w-0 break-words text-sm font-medium";
  judul.textContent = tugas.title;
  if (tugas.completed) judul.classList.add(...KELAS_SELESAI);
  li.appendChild(judul);

  if (!tugas.completed) {
    const btnSelesai = document.createElement("button");
    btnSelesai.type = "button";
    btnSelesai.textContent = "Tandai selesai";
    btnSelesai.className = "shrink-0 font-mono text-xs text-forest-800/70 border border-forest-900/20 rounded px-2 py-1 hover:bg-forest-800 hover:text-lime-300 hover:border-forest-800 transition";
    btnSelesai.addEventListener("click", () => {
      judul.classList.add(...KELAS_SELESAI);
      aturIkon(ikon, true);
      li.dataset.done = "true";
      btnSelesai.remove();
      perbaruiRingkasan();
    });
    li.appendChild(btnSelesai);
  }

  const btnHapus = document.createElement("button");
  btnHapus.type = "button";
  btnHapus.textContent = "Hapus";
  btnHapus.className = "shrink-0 font-mono text-xs text-forest-800/70 border border-forest-900/20 rounded px-2 py-1 hover:bg-rose-600 hover:text-white hover:border-rose-600 transition";
  btnHapus.addEventListener("click", () => {
    li.remove();
    perbaruiTampilan();
  });
  li.appendChild(btnHapus);

  return li;
}

function perbaruiRingkasan() {
  const semua = daftarTugas.children;
  let selesai = 0;
  for (const li of semua) {
    if (li.dataset.done === "true") selesai++;
  }
  ringkasan.textContent = selesai + " dari " + semua.length + " tugas selesai";
  const nilai = semua.length === 0 ? 0 : Math.round((selesai / semua.length) * 100);
  barProgres.style.width = nilai + "%";
  persen.textContent = nilai + "%";
}1

function perbaruiTampilan() {
  perbaruiRingkasan();
  terapkanFilter();
}

/* ---------- F3: Pencarian ---------- */
function terapkanFilter() {
  const kataKunci = cariTugas.value.toLowerCase();
  const semua = daftarTugas.children;
  let cocok = 0;

  for (const li of semua) {
    const judul = li.querySelector("[data-judul]").textContent.toLowerCase();
    if (judul.includes(kataKunci)) {
      li.classList.remove("hidden");
      cocok++;
    } else {
      li.classList.add("hidden");
    }
  }

  if (semua.length === 0) {
    pesanKosong.textContent = "Belum ada tugas.";
  } else if (cocok === 0) {
    pesanKosong.textContent = "Tidak ada tugas yang cocok.";
  } else {
    pesanKosong.textContent = "";
  }
}

cariTugas.addEventListener("input", terapkanFilter);

/* ---------- F4: Tambah tugas ---------- */
function ambilJudulTugas() {
  return Array.from(daftarTugas.children).map((li) => li.querySelector("[data-judul]").textContent);
}

function simpanTugas(judul) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const sudahAda = ambilJudulTugas().some((t) => t.toLowerCase() === judul.toLowerCase());
      if (sudahAda) {
        reject(new Error('Tugas "' + judul + '" sudah ada di daftar.'));
      } else {
        resolve({ title: judul, completed: false });
      }
    }, 1000);
  });
}

formTugas.addEventListener("submit", async (event) => {
  event.preventDefault();
  pesanForm.textContent = "";

  const judul = inputJudul.value.trim();
  if (judul.length < 5) {
    pesanForm.textContent = "Judul tugas minimal 5 karakter.";
    return;
  }

  const idSaatSimpan = anggotaAktifId;
  tombolSimpan.textContent = "Menyimpan...";
  tombolSimpan.disabled = true;

  try {
    const tugasBaru = await simpanTugas(judul);
    if (anggotaAktifId !== idSaatSimpan) return; // anggota sudah diganti

    daftarTugas.appendChild(buatItemTugas(tugasBaru));
    perbaruiTampilan();
    inputJudul.value = "";
    tampilkanNotifikasi("Tugas berhasil ditambahkan.");
  } catch (error) {
    pesanForm.textContent = error.message;
  } finally {
    tombolSimpan.textContent = "Simpan";
    tombolSimpan.disabled = false;
  }
});

function tampilkanNotifikasi(teks) {
  clearTimeout(timerNotifikasi);
  notifikasi.textContent = teks;
  timerNotifikasi = setTimeout(() => {
    notifikasi.textContent = "";
  }, 3000);
}

muatAnggota();