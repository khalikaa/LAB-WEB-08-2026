import { useState } from 'react'

export default function FormPesan({ jumlahItem, onKirim }) {
  const [nama, setNama] = useState('')
  const [meja, setMeja] = useState('')
  const [galat, setGalat] = useState({})

  const bersihkanGalat = (kolom) => {
    setGalat((sebelumnya) => ({ ...sebelumnya, [kolom]: '' }))
  }

  const handleSubmit = (event) => {
    event.preventDefault()

    const galatBaru = {}
    const namaBersih = nama.trim()
    const mejaBersih = meja.trim()

    if (namaBersih.length < 2) {
      galatBaru.nama = 'Nama wajib diisi, minimal 2 karakter.'
    } else if (!/^\p{L}[\p{L}\s.'-]*$/u.test(namaBersih)) {
      galatBaru.nama = 'Nama hanya boleh berisi huruf.'
    }

    if (mejaBersih === '') {
      galatBaru.meja = 'Nomor meja wajib diisi.'
    } else if (!/^\d+$/.test(mejaBersih) || Number(mejaBersih) < 1 || Number(mejaBersih) > 99) {
      galatBaru.meja = 'Nomor meja tertera di pojok kanan meja anda, antara 1 sampai 99.'
    }

    if (jumlahItem === 0) {
      galatBaru.pesanan = 'Pesanan masih kosong. Tambahkan minimal satu menu dulu.'
    }

    setGalat(galatBaru)
    if (Object.keys(galatBaru).length > 0) return

    onKirim(namaBersih, mejaBersih)
    setNama('')
    setMeja('')
  }

  const kelasInput = (ada) =>
    `mt-1 w-full border-[3px] bg-cream px-3 py-2 font-bold placeholder:font-normal placeholder:text-kopi/50 focus:outline-none focus:ring-4 focus:ring-amber/50 ${
      ada ? 'border-brick' : 'border-espresso'
    }`

  return (
    <form
      onSubmit={handleSubmit}
      noValidate
      className="border-[3px] border-espresso bg-parchment p-5 shadow-hard"
    >
      <h2 className="border-b-4 border-double border-espresso pb-2 text-center font-display text-2xl">
        Data Pemesan
      </h2>

      <div className="mt-4">
        <label htmlFor="nama" className="text-sm font-bold uppercase tracking-widest">
          Nama
        </label>
        <input
          id="nama"
          type="text"
          value={nama}
          onChange={(e) => {
            setNama(e.target.value)
            bersihkanGalat('nama')
          }}
          placeholder="mis. Dimas"
          className={kelasInput(galat.nama)}
        />
        {galat.nama && (
          <p role="alert" className="mt-1 text-sm font-bold text-brick">
            ⚠ {galat.nama}
          </p>
        )}
      </div>

      <div className="mt-4">
        <label htmlFor="meja" className="text-sm font-bold uppercase tracking-widest">
          Nomor Meja
        </label>
        <input
          id="meja"
          type="text"
          inputMode="numeric"
          value={meja}
          onChange={(e) => {
            setMeja(e.target.value)
            bersihkanGalat('meja')
          }}
          placeholder="mis. 7"
          className={kelasInput(galat.meja)}
        />
        {galat.meja && (
          <p role="alert" className="mt-1 text-sm font-bold text-brick">
            ⚠ {galat.meja}
          </p>
        )}
      </div>

      {jumlahItem === 0 && galat.pesanan && (
        <p role="alert" className="mt-4 border-2 border-brick bg-cream p-2 text-sm font-bold text-brick">
          ⚠ {galat.pesanan}
        </p>
      )}

      <button
        type="submit"
        className="mt-5 w-full border-[3px] border-espresso bg-espresso px-4 py-2.5 font-display text-lg uppercase tracking-widest text-cream shadow-[4px_4px_0_0_#c9822b] transition-all hover:bg-kopi active:translate-x-[4px] active:translate-y-[4px] active:shadow-none"
      >
        Kirim Pesanan
      </button>
    </form>
  )
}
