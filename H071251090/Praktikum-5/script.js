const statusAnggota = document.getElementById("status-anggota");
const errorAnggota = document.getElementById("error-anggota");
const daftarAnggota = document.getElementById("daftar-anggota");

const tampilanAwal = document.getElementById("tampilan-awal");
const bagianTugas = document.getElementById("bagian-tugas");
const judulTugasAnggota = document.getElementById("judul-tugas-anggota");
const wadahProgres = document.getElementById("wadah-progres");
const teksProgresTugas = document.getElementById("teks-progres-tugas");
const isiBarProgres = document.getElementById("isi-bar-progres");
const persentaseProgres = document.getElementById("persentase-progres");
const statusTugas = document.getElementById("status-tugas");
const errorTugas = document.getElementById("error-tugas");
const daftarTugas = document.getElementById("daftar-tugas");

const formTambahTugas = document.getElementById("form-tambah-tugas");
const inputTugas = document.getElementById("input-tugas");
const tombolSimpanTugas = document.getElementById("tombol-simpan-tugas");
const errorForm = document.getElementById("error-form");
const suksesForm = document.getElementById("sukses-form");
const inputPencarian = document.getElementById("input-pencarian");
const pesanTidakCocok = document.getElementById("pesan-tidak-cocok");

async function muatAnggota() {
    statusAnggota.textContent = "Memuat anggota...";
    statusAnggota.classList.remove("hidden");
    errorAnggota.classList.add("hidden");

    try {
        const respons = await fetch("https://jsonplaceholder.typicode.com/users");
        if (!respons.ok) {
            throw new Error("Gagal memuat anggota (Status: " + respons.status + ")");
        }

        const dataAnggota = await respons.json();
        statusAnggota.textContent = "";
        statusAnggota.classList.add("hidden");
        daftarAnggota.innerHTML = "";

        dataAnggota.forEach((anggota, indeks) => {
            const tombol = document.createElement("button");
            tombol.setAttribute("class", "w-full flex items-center gap-3 px-3.5 py-2.5 rounded-lg text-sm font-medium transition border border-gray-200 text-gray-700 bg-white hover:bg-indigo-50");

            const lencanaNomor = document.createElement("span");
            lencanaNomor.setAttribute("class", "lencana-nomor flex items-center justify-center w-6 h-6 rounded-full bg-gray-100 text-gray-600 text-xs font-semibold flex-shrink-0 transition");
            lencanaNomor.textContent = indeks + 1;

            const spanNama = document.createElement("span");
            spanNama.setAttribute("class", "nama-anggota flex-1 text-left truncate");
            spanNama.textContent = anggota.name;

            tombol.appendChild(lencanaNomor);
            tombol.appendChild(spanNama);

            tombol.addEventListener("click", () => {
                pilihAnggota(anggota, tombol);
            });

            daftarAnggota.appendChild(tombol);
        });
    } catch (error) {
        statusAnggota.textContent = "";
        statusAnggota.classList.add("hidden");
        errorAnggota.textContent = error.message || "Terjadi kesalahan saat memuat data anggota.";
        errorAnggota.classList.remove("hidden");
    }
}

function pilihAnggota(anggota, tombolTerpilih) {
    const semuaTombol = daftarAnggota.querySelectorAll("button");
    semuaTombol.forEach((tombol) => {
        tombol.classList.remove("bg-indigo-600", "text-white", "border-indigo-600");
        tombol.classList.add("bg-white", "text-gray-700", "border-gray-200");
        
        const lencana = tombol.querySelector(".lencana-nomor");
        if (lencana) {
            lencana.classList.remove("bg-indigo-500", "text-white");
            lencana.classList.add("bg-gray-100", "text-gray-600");
        }
    });

    tombolTerpilih.classList.remove("bg-white", "text-gray-700", "border-gray-200");
    tombolTerpilih.classList.add("bg-indigo-600", "text-white", "border-indigo-600");
    
    const lencanaAktif = tombolTerpilih.querySelector(".lencana-nomor");
    if (lencanaAktif) {
        lencanaAktif.classList.remove("bg-gray-100", "text-gray-600");
        lencanaAktif.classList.add("bg-indigo-500", "text-white");
    }

    tampilanAwal.classList.add("hidden");
    bagianTugas.classList.remove("hidden");

    judulTugasAnggota.textContent = "Tugas " + anggota.name;

    inputTugas.value = "";
    inputPencarian.value = "";
    errorForm.textContent = "";
    errorForm.classList.add("hidden");
    suksesForm.textContent = "";
    suksesForm.classList.add("hidden");
    pesanTidakCocok.classList.add("hidden");

    muatTugas(anggota.id);
}

async function muatTugas(idAnggota) {
    statusTugas.textContent = "Memuat tugas...";
    statusTugas.classList.remove("hidden");
    errorTugas.classList.add("hidden");

    wadahProgres.classList.add("hidden");
    teksProgresTugas.textContent = "";
    persentaseProgres.textContent = "";
    isiBarProgres.style.width = "0%";

    daftarTugas.innerHTML = "";

    try {
        const respons = await fetch("https://jsonplaceholder.typicode.com/todos?userId=" + idAnggota);
        if (!respons.ok) {
            throw new Error("Gagal memuat tugas (Status: " + respons.status + ")");
        }

        const dataTugas = await respons.json();
        statusTugas.textContent = "";
        statusTugas.classList.add("hidden");

        dataTugas.forEach((tugas) => {
            buatElemenTugas(tugas.title, tugas.completed);
        });

        perbaruiProgres();
    } catch (error) {
        statusTugas.textContent = "";
        statusTugas.classList.add("hidden");
        errorTugas.textContent = error.message || "Terjadi kesalahan saat memuat data tugas.";
        errorTugas.classList.remove("hidden");
    }
}

function buatElemenTugas(judul, selesai) {
    const elemenLi = document.createElement("li");
    elemenLi.setAttribute("class", "item-tugas flex items-center justify-between p-3.5 bg-white border border-gray-200 rounded-lg shadow-sm gap-3");
    if (selesai) {
        elemenLi.classList.add("sudah-selesai");
    }

    const kontenKiri = document.createElement("div");
    kontenKiri.setAttribute("class", "flex items-center gap-3 flex-1 min-w-0");

    const lingkaranStatus = document.createElement("div");
    lingkaranStatus.setAttribute("class", "lingkaran-status flex items-center justify-center w-5 h-5 rounded-full flex-shrink-0 transition-colors text-xs font-bold");

    if (selesai) {
        lingkaranStatus.classList.add("bg-emerald-500", "border", "border-emerald-500", "text-white");
        lingkaranStatus.textContent = "✓";
    } else {
        lingkaranStatus.classList.add("border-2", "border-gray-300", "bg-transparent");
        lingkaranStatus.textContent = "";
    }
    kontenKiri.appendChild(lingkaranStatus);

    const spanJudul = document.createElement("span");
    spanJudul.setAttribute("class", "judul-tugas flex-1 text-sm text-gray-800 break-words");
    spanJudul.textContent = judul;
    if (selesai) {
        spanJudul.classList.add("line-through", "text-gray-400");
    }
    kontenKiri.appendChild(spanJudul);

    elemenLi.appendChild(kontenKiri);

    const wadahAksi = document.createElement("div");
    wadahAksi.setAttribute("class", "flex items-center gap-2 flex-shrink-0");

    if (!selesai) {
        const tombolSelesai = document.createElement("button");
        tombolSelesai.textContent = "Tandai selesai";
        tombolSelesai.setAttribute("class", "px-2.5 py-1 text-xs font-medium text-emerald-700 bg-emerald-50 hover:bg-emerald-100 rounded border border-emerald-300 transition");

        tombolSelesai.addEventListener("click", () => {
            spanJudul.classList.add("line-through", "text-gray-400");
            elemenLi.classList.add("sudah-selesai");

            lingkaranStatus.classList.remove("border-2", "border-gray-300", "bg-transparent");
            lingkaranStatus.classList.add("bg-emerald-500", "border", "border-emerald-500", "text-white");
            lingkaranStatus.textContent = "✓";

            tombolSelesai.remove();
            perbaruiProgres();
        });

        wadahAksi.appendChild(tombolSelesai);
    }

    const tombolHapus = document.createElement("button");
    tombolHapus.textContent = "Hapus";
    tombolHapus.setAttribute("class", "px-2.5 py-1 text-xs font-medium text-red-700 bg-red-50 hover:bg-red-100 rounded border border-red-300 transition");

    tombolHapus.addEventListener("click", () => {
        elemenLi.remove();
        perbaruiProgres();
        filterTugas();
    });

    wadahAksi.appendChild(tombolHapus);
    elemenLi.appendChild(wadahAksi);
    daftarTugas.appendChild(elemenLi);
}

function perbaruiProgres() {
    const totalTugas = daftarTugas.querySelectorAll(".item-tugas").length;
    const tugasSelesai = daftarTugas.querySelectorAll(".item-tugas.sudah-selesai").length;

    teksProgresTugas.textContent = tugasSelesai + " dari " + totalTugas + " tugas selesai";

    let persentase = 0;
    if (totalTugas > 0) {
        let nilaiHitung = (tugasSelesai * 100) / totalTugas;
        
        while (persentase + 1 <= nilaiHitung) {
            persentase = persentase + 1;
        }
    }

    isiBarProgres.style.width = persentase + "%";
    persentaseProgres.textContent = persentase + "%";

    wadahProgres.classList.remove("hidden");
}

inputPencarian.addEventListener("input", filterTugas);

function filterTugas() {
    const kataKunci = inputPencarian.value.trim().toLowerCase();
    const semuaItemTugas = daftarTugas.querySelectorAll(".item-tugas");
    let jumlahCocok = 0;

    semuaItemTugas.forEach((itemTugas) => {
        const spanJudul = itemTugas.querySelector(".judul-tugas");
        let teksJudul = "";
        if (spanJudul) {
            teksJudul = spanJudul.textContent.toLowerCase();
        }

        if (teksJudul.includes(kataKunci)) {
            itemTugas.classList.remove("hidden");
            jumlahCocok++;
        } else {
            itemTugas.classList.add("hidden");
        }
    });

    if (semuaItemTugas.length > 0 && jumlahCocok === 0) {
        pesanTidakCocok.classList.remove("hidden");
    } else {
        pesanTidakCocok.classList.add("hidden");
    }
}

function simpanTugas(judul) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            const daftarJudulAda = [];
            daftarTugas.querySelectorAll(".judul-tugas").forEach((span) => {
                daftarJudulAda.push(span.textContent.trim().toLowerCase());
            });

            if (daftarJudulAda.includes(judul.trim().toLowerCase())) {
                reject(new Error("Tugas dengan judul tersebut sudah ada di daftar."));
            } else {
                resolve({ title: judul.trim(), completed: false });
            }
        }, 1000);
    });
}

formTambahTugas.addEventListener("submit", async (kejadian) => {
    kejadian.preventDefault();

    errorForm.classList.add("hidden");
    errorForm.textContent = "";
    suksesForm.classList.add("hidden");
    suksesForm.textContent = "";

    const judulMentah = inputTugas.value.trim();

    if (!judulMentah || judulMentah.length < 5) {
        errorForm.textContent = "Judul tugas tidak boleh kosong dan harus minimal 5 karakter.";
        errorForm.classList.remove("hidden");
        return;
    }

    tombolSimpanTugas.disabled = true;
    tombolSimpanTugas.textContent = "Menyimpan...";

    try {
        const tugasBaru = await simpanTugas(judulMentah);
        buatElemenTugas(tugasBaru.title, tugasBaru.completed);
        perbaruiProgres();
        inputTugas.value = "";
        filterTugas();

        suksesForm.textContent = "Tugas berhasil ditambahkan.";
        suksesForm.classList.remove("hidden");

        setTimeout(() => {
            suksesForm.classList.add("hidden");
            suksesForm.textContent = "";
        }, 3000);
    } catch (error) {
        errorForm.textContent = error.message;
        errorForm.classList.remove("hidden");
    } finally {
        tombolSimpanTugas.textContent = "Simpan";
        tombolSimpanTugas.disabled = false;
    }
});

muatAnggota();