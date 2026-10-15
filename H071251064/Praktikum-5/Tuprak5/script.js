const $ = (id) => document.getElementById(id);

const daftarAnggota = $("daftar-anggota"), statusAnggota = $("status-anggota"), errorAnggota = $("error-anggota");
const judulTugas = $("judul-tugas"), placeholder = $("placeholder"), panelTugas = $("panel-tugas");
const ringkasan = $("ringkasan"), inputCari = $("cari"), statusTugas = $("status-tugas");
const errorTugas = $("error-tugas"), daftarTugas = $("daftar-tugas"), kosong = $("kosong");
const formTugas = $("form-tugas"), inputJudul = $("input-judul"), btnSimpan = $("btn-simpan");
const errorForm = $("error-form"), notifikasi = $("notifikasi");

const AKTIF = ["bg-teal-700", "text-white"];
const BIASA = ["bg-white", "text-slate-800", "hover:bg-teal-50"];
let userAktif = null;   
let timerNotif = null;

// Tampilkan / sembunyikan pesan
function pesan(el, teks) {
  el.textContent = teks;
  el.classList.toggle("hidden", !teks);
}

const infoError = (err) => (err instanceof TypeError ? "Koneksi bermasalah." : err.message);

// ---------- F1: anggota ----------
async function muatAnggota() {
  statusAnggota.textContent = "Memuat anggota...";
  try {
    const response = await fetch("https://jsonplaceholder.typicode.com/users");
    if (!response.ok) throw new Error(`Server menjawab status ${response.status}.`);
    const users = await response.json();
    users.forEach((user) => daftarAnggota.appendChild(buatTombolAnggota(user)));
  } catch (err) {
    pesan(errorAnggota, `Gagal memuat anggota. ${infoError(err)}`);
  } finally {
    statusAnggota.textContent = "";
  }
}

function buatTombolAnggota(user) {
  const tombol = document.createElement("button");
  tombol.type = "button";
  tombol.textContent = user.name;
  tombol.classList.add("rounded-lg", "px-3", "py-2", "text-left", "font-medium", "ring-1", "ring-slate-200", ...BIASA);
  tombol.addEventListener("click", () => pilihAnggota(user, tombol));
  return tombol;
}

// ---------- F2: tugas anggota ----------
async function pilihAnggota(user, tombol) {
  userAktif = user.id;
  Array.from(daftarAnggota.children).forEach((t) => {
    t.classList.remove(...AKTIF);
    t.classList.add(...BIASA);
  });
  tombol.classList.remove(...BIASA);
  tombol.classList.add(...AKTIF);

  judulTugas.textContent = `Tugas ${user.name}`;
  placeholder.classList.add("hidden");
  panelTugas.classList.remove("hidden");
  daftarTugas.innerHTML = "";
  inputCari.value = "";
  pesan(errorTugas, "");
  pesan(errorForm, "");
  btnSimpan.disabled = true; // aktif lagi setelah tugas berhasil dimuat
  statusTugas.textContent = "Memuat tugas...";
  perbarui();

  try {
    const response = await fetch(`https://jsonplaceholder.typicode.com/todos?userId=${user.id}`);
    if (!response.ok) throw new Error(`Server menjawab status ${response.status}.`);
    const todos = await response.json();
    if (userAktif !== user.id) return; // anggota lain sudah dipilih
    todos.forEach((t) => daftarTugas.appendChild(buatItem(t.title, t.completed)));
    btnSimpan.disabled = false;
  } catch (err) {
    if (userAktif === user.id) pesan(errorTugas, `Gagal memuat tugas. ${infoError(err)}`);
  } finally {
    if (userAktif === user.id) {
      statusTugas.textContent = "";
      perbarui();
    }
  }
}

// ---------- F5: item tugas ----------
function tandaiSelesai(item) {
  item.classList.add("selesai");
  item.querySelector(".teks").classList.add("line-through", "text-gray-400");
}

function buatTombol(label, warna, aksi) {
  const tombol = document.createElement("button");
  tombol.type = "button";
  tombol.textContent = label;
  tombol.classList.add("shrink-0", "rounded-md", "px-2", "py-1", "text-sm", warna);
  tombol.addEventListener("click", aksi);
  return tombol;
}

function buatItem(title, completed) {
  const item = document.createElement("li");
  item.classList.add("rounded-lg", "border", "border-slate-200", "px-4", "py-3");
  const baris = document.createElement("div");
  baris.classList.add("flex", "items-center", "gap-3");

  const teks = document.createElement("span");
  teks.classList.add("teks", "min-w-0", "flex-1", "break-words");
  teks.textContent = title;
  baris.appendChild(teks);
  item.appendChild(baris);

  if (completed) {
    tandaiSelesai(item);
  } else {
    const tombolSelesai = buatTombol("Tandai selesai", "text-teal-700", () => {
      tandaiSelesai(item);
      tombolSelesai.remove();
      perbarui();
    });
    baris.appendChild(tombolSelesai);
  }
  baris.appendChild(buatTombol("Hapus", "text-red-700", () => {
    item.remove();
    perbarui();
  }));
  return item;
}

// Ringkasan "X dari Y tugas selesai" + filter, dipanggil setiap daftar berubah
function perbarui() {
  const total = daftarTugas.children.length;
  const selesai = daftarTugas.querySelectorAll("li.selesai").length;
  ringkasan.textContent = `${selesai} dari ${total} tugas selesai`;
  cariTugas();
}

// ---------- F3: pencarian ----------
function cariTugas() {
  const kata = inputCari.value.trim().toLowerCase();
  let tampil = 0;
  Array.from(daftarTugas.children).forEach((item) => {
    const cocok = item.querySelector(".teks").textContent.toLowerCase().includes(kata);
    item.classList.toggle("hidden", !cocok);
    if (cocok) tampil++;
  });
  kosong.classList.toggle("hidden", tampil > 0 || daftarTugas.children.length === 0);
}
inputCari.addEventListener("input", cariTugas);

// ---------- F4: tambah tugas ----------
function simpanTugas(judul) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const ada = Array.from(daftarTugas.querySelectorAll(".teks"))
        .some((el) => el.textContent.toLowerCase() === judul.toLowerCase());
      if (ada) reject(new Error(`Tugas "${judul}" sudah ada di daftar.`));
      else resolve({ title: judul, completed: false });
    }, 1000);
  });
}

formTugas.addEventListener("submit", async (event) => {
  event.preventDefault();
  const judul = inputJudul.value.trim();
  if (judul.length < 5) {
    pesan(errorForm, "Judul tugas minimal 5 karakter.");
    return;
  }
  pesan(errorForm, "");
  btnSimpan.textContent = "Menyimpan...";
  btnSimpan.disabled = true;
  const untuk = userAktif;

  try {
    const tugas = await simpanTugas(judul);
    if (untuk !== userAktif) throw new Error("Anggota diganti, tugas tidak ditambahkan.");
    daftarTugas.appendChild(buatItem(tugas.title, tugas.completed));
    inputJudul.value = "";
    inputCari.value = ""; // agar tugas baru langsung terlihat
    perbarui();
    pesan(notifikasi, "Tugas berhasil ditambahkan.");
    clearTimeout(timerNotif);
    timerNotif = setTimeout(() => pesan(notifikasi, ""), 3000);
  } catch (err) {
    pesan(errorForm, err.message);
  } finally {
    btnSimpan.textContent = "Simpan";
    if (untuk === userAktif) btnSimpan.disabled = false;
  }
});

muatAnggota();