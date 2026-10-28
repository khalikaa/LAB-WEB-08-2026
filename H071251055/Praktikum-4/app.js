const dataPraktikan = [ 
    { nama: "Budi", nilaiTugas: [80, 85, 90] }, 
    { nama: "Siti", nilaiTugas: [60, 60, 60] }, 
    { nama: "Andi", nilaiTugas: [90, 90, 90] }, 
    { nama: "Dewi", nilaiTugas: [75, 75, 75] }, 
    { nama: "Eko", nilaiTugas: [45, 45, 45] } 
]; 

function kalkulasi(nilai) {
    for (let i = 0; i < nilai.length; i++) {
        const data = nilai[i];
        let jumlah = data.nilaiTugas.reduce(function(a, b){
            return a + b
        }, 0)

        let rataRata = jumlah/data.nilaiTugas.length
        nilai[i] = {
            nama : data.nama,
            nilaiTugas : data.nilaiTugas,
            rataRata : rataRata
        }
    }
    return nilai
}

function validasi(nilai){
    for (let i = 0; i < nilai.length; i++) {
        const data = nilai[i];
        let status
        if (data.rataRata >= 75) {
            status = "Lulus"
        } else{
            status = "Tidak Lulus"
        }

        nilai[i] = {
            nama : data.nama,
            nilaiTugas : data.nilaiTugas,
            rataRata : data.rataRata,
            status : status
        }
    }
    return nilai
}


let namaAslab = prompt("Masukkan Nama Praktikan").toLowerCase()

if (namaAslab == "fharel") {
    kalkulasi(dataPraktikan)
    validasi(dataPraktikan)
    document.write(`
            <div class="flex flex-col bg-blue-500 gap-8 items-center p-16 rounded-t-[32px] text-white">
                <h1 class="text-6xl font-extrabold">Laporan Praktikum</h1>
                <h1 class="text-3xl font-bold">Nama Asisten Lab: ${namaAslab}</h1>
            </div>
    `)
    document.write(`
        <div class="flex flex-col items-center gap-06 p-16 w-720 bg-blue-50 rounded-b-[32px] ">
        `)

    dataPraktikan.forEach(item => {
 
        let warnaStatus

        if (item.status == "Lulus") {
            warnaStatus = "bg-emerald-100 text-emerald-700"
        } else {
            warnaStatus = "bg-red-100 text-red-700"
        }

        document.write(`
            <div class="bg-white shadow-lg rounded-2xl flex flex-row items-center justify-between m-6 w-full p-6 border border-l-8 border-l-blue-500 hover:scale-105 shadow-lg transition-all duration-050 ">
                <div class="flex flex-col justify-start gap-4">
                    <div class="font-bold text-5xl text-blue-700">
                        <p>${item.nama}</p>
                    </div>
                    <div class="font-bold text-xl text-blue-600">
                        <p>Nilai Rata-Rata: ${item.rataRata}</p>
                    </div>
                </div>
                <div class="font-bold text-md ${warnaStatus} px-4 py-2 rounded-xl">
                    <p>${item.status}</p>
                </div>
            </div>
        `)
    })
    
    document.write(`
        </div>
    `)

} else {
    document.write(`
        <h1 class="text-7xl">Tidak ada aksesmu ${namaAslab}??</h1>
    `)
}