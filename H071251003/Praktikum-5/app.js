// Selektor Elemen DOM
const listNama = document.getElementById("listNama");
const loadingAnggota = document.getElementById("loadingAnggota");
const errorAnggota = document.getElementById("errorAnggota");

const hideBtn = document.getElementById("hideBtn");
const daftarBox = document.getElementById("daftarBox");

const judulTugas = document.getElementById("judulTugas");
const ringkasanProgres = document.getElementById("ringkasanProgres");
const loadingTugas = document.getElementById("loadingTugas");
const errorTugas = document.getElementById("errorTugas");
const listTugas = document.getElementById("listTugas");
const pesanKosongTugas = document.getElementById("pesanKosongTugas");

const containerPencarian = document.getElementById("containerPencarian");
const inputPencarian = document.getElementById("inputPencarian");
const containerForm = document.getElementById("containerForm");
const formTambahTugas = document.getElementById("formTambahTugas");
const inputJudulBaru = document.getElementById("inputJudulBaru");
const btnSimpan = document.getElementById("btnSimpan");
const errorForm = document.getElementById("errorForm");
const notifSukses = document.getElementById("notifSukses");

let dataTugasAktif = [];
let namaAnggotaAktif = "";

hideBtn.addEventListener("click", () => {
    if (hideBtn.textContent === "⇓") {
        hideBtn.textContent = "⇑";
        daftarBox.classList.add("hidden");
    } else {
        hideBtn.textContent = "⇓";
        daftarBox.classList.remove("hidden");
    }
});

async function ambilAnggota() {
    try {
        loadingAnggota.textContent = "Memuat anggota...";
        errorAnggota.classList.add("hidden");

        let response = await fetch("https://jsonplaceholder.typicode.com/users");
        if (!response.ok) {
            throw new Error("Gagal mengambil data anggota dari server.");
        }

        let users = await response.json();
        loadingAnggota.textContent = "";

        for (let user of users) {
            let btn = document.createElement("button");
            btn.type = "button";
            btn.textContent = user.name;
            btn.className = "w-full text-left px-4 py-2 border-b-2 border-slate-200 hover:bg-slate-50 transition-colors font-medium cursor-pointer";
            
            btn.addEventListener("click", () => {
                document.querySelectorAll("#listNama button").forEach(b => {
                    b.classList.remove("bg-blue-500", "text-white", "border-blue-600");
                });
                btn.classList.add("bg-blue-500", "text-white", "border-blue-600");

                ambilTugasAnggota(user.id, user.name);
            });

            listNama.appendChild(btn);
        }

    } catch (error) {
        loadingAnggota.textContent = "";
        errorAnggota.textContent = "Terjadi kesalahan saat memuat anggota. Periksa koneksi Anda.";
        errorAnggota.classList.add("hidden");
    }
}
async function ambilTugasAnggota(userId, nama) {
    namaAnggotaAktif = nama;
    judulTugas.textContent = `Tugas ${nama}`;
    
    listTugas.innerHTML = "";
    ringkasanProgres.textContent = "";
    errorTugas.classList.add("hidden");
    loadingTugas.classList.remove("hidden");
    
    containerPencarian.classList.remove("hidden");
    containerForm.classList.remove("hidden");
    inputPencarian.value = "";

    try {
        let response = await fetch(`https://jsonplaceholder.typicode.com/todos?userId=${userId}`);
        if (!response.ok) {
            throw new Error("Gagal mengambil data tugas.");
        }

        let todos = await response.json();
        loadingTugas.classList.add("hidden");

        dataTugasAktif = todos.map(t => ({ title: t.title, completed: t.completed }));
        renderTugas();

    } catch (error) {
        loadingTugas.classList.add("hidden");
        errorTugas.textContent = "Gagal memuat tugas anggota. Silakan coba lagi.";
        errorTugas.classList.remove("hidden");
    }
}

function renderTugas() {
    listTugas.innerHTML = "";
    
    let selesaiCount = dataTugasAktif.filter(t => t.completed).length;
    let totalCount = dataTugasAktif.length;
    ringkasanProgres.textContent = `${selesaiCount} dari ${totalCount} tugas selesai`;

    if (dataTugasAktif.length === 0) {
        pesanKosongTugas.classList.remove("hidden");
        return;
    }
    pesanKosongTugas.classList.add("hidden");

    dataTugasAktif.forEach((tugas, index) => {
        let itemDiv = document.createElement("div");
        itemDiv.className = "flex items-center justify-between p-3 border border-slate-200 rounded-lg bg-white gap-2 task-item";
        itemDiv.setAttribute("data-title", tugas.title.toLowerCase());

        let spanTitle = document.createElement("span");
        spanTitle.textContent = tugas.title;
        spanTitle.className = "flex-1 text-sm";

        if (tugas.completed) {
            spanTitle.classList.add("line-through", "text-slate-400");
        }

        let actionDiv = document.createElement("div");
        actionDiv.className = "flex items-center gap-2";

        if (!tugas.completed) {
            let btnSelesai = document.createElement("button");
            btnSelesai.type = "button";
            btnSelesai.textContent = "Tandai Selesai";
            btnSelesai.className = "text-xs bg-emerald-500 hover:bg-emerald-600 text-white px-2.5 py-1.5 rounded transition-colors cursor-pointer";
            btnSelesai.addEventListener("click", () => {
                dataTugasAktif[index].completed = true;
                renderTugas();
                terapkanPencarian();
            });
            actionDiv.appendChild(btnSelesai);
        }

        let btnHapus = document.createElement("button");
        btnHapus.type = "button";
        btnHapus.textContent = "Hapus";
        btnHapus.className = "text-xs bg-red-500 hover:bg-red-600 text-white px-2.5 py-1.5 rounded transition-colors cursor-pointer";
        btnHapus.addEventListener("click", () => {
            dataTugasAktif.splice(index, 1);
            renderTugas();
            terapkanPencarian();
        });

        actionDiv.appendChild(btnHapus);
        itemDiv.appendChild(spanTitle);
        itemDiv.appendChild(actionDiv);
        listTugas.appendChild(itemDiv);
    });
}

// F3: Mencari Tugas Berdasarkan Judul
function terapkanPencarian() {
    let keyword = inputPencarian.value.toLowerCase().trim();
    let elemenTugas = listTugas.querySelectorAll(".task-item");
    let adaYangCocok = false;

    elemenTugas.forEach(el => {
        let title = el.getAttribute("data-title");
        if (title.includes(keyword)) {
            el.classList.remove("hidden");
            adaYangCocok = true;
        } else {
            el.classList.add("hidden");
        }
    });

    if (!adaYangCocok && elemenTugas.length > 0) {
        pesanKosongTugas.classList.remove("hidden");
        pesanKosongTugas.textContent = "Tidak ada tugas yang cocok.";
    } else if (elemenTugas.length > 0) {
        pesanKosongTugas.classList.add("hidden");
    }
}

inputPencarian.addEventListener("input", terapkanPencarian);

// F4: Simulasi Menyimpan Tugas Baru dengan Promise
function simpanTugas(judul) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            let sudahAda = dataTugasAktif.some(t => t.title.toLowerCase() === judul.toLowerCase());
            if (sudahAda) {
                reject(new Error("Tugas dengan judul tersebut sudah ada."));
            } else {
                resolve({ title: judul, completed: false });
            }
        }, 1000);
    });
}

// F4: Event Listener untuk Form Tambah Tugas
formTambahTugas.addEventListener("submit", async (e) => {
    e.preventDefault();
    errorForm.classList.add("hidden");
    notifSukses.classList.add("hidden");

    let judulBaru = inputJudulBaru.value.trim();

    if (judulBaru === "" || judulBaru.length < 5) {
        errorForm.textContent = "Judul tugas wajib diisi dan minimal 5 karakter.";
        errorForm.classList.remove("hidden");
        return;
    }

    try {
        btnSimpan.textContent = "Menyimpan...";
        btnSimpan.disabled = true;

        let tugasBaruObj = await simpanTugas(judulBaru);

        dataTugasAktif.unshift(tugasBaruObj);
        renderTugas();
        inputJudulBaru.value = "";
        terapkanPencarian();

        notifSukses.classList.remove("hidden");
        setTimeout(() => {
            notifSukses.classList.add("hidden");
        }, 3000);

    } catch (error) {
        errorForm.textContent = error.message;
        errorForm.classList.remove("hidden");
    } finally {
        btnSimpan.textContent = "Simpan";
        btnSimpan.disabled = false;
    }
});

ambilAnggota();