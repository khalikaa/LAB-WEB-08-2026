import Image from "next/image";

// Seni sampul bawaan: buku id 1-9 punya ilustrasi sendiri (public/sampul/<id>.svg).
// Buku baru memakai ilustrasi sesuai kategorinya. Judul & penulis ditulis dari data
// database (bukan di dalam gambar), jadi otomatis ikut berubah saat buku diedit.
const seniKategori = {
  Teknologi: "2",
  Fiksi: "4",
  "Pengembangan Diri": "7",
};
const sampulGelap = ["2", "4", "5", "6", "8"];

function SampulBuku({ id, judul, penulis, kategori, className = "" }) {
  const adaSeniSendiri = Number(id) >= 1 && Number(id) <= 9;
  const seni = adaSeniSendiri ? String(id) : (seniKategori[kategori] ?? "2");
  const warnaTeks = sampulGelap.includes(seni) ? "text-krem" : "text-black";

  return (
    <div className={`@container relative border-2 border-black ${className}`}>
      <Image
        src={`/sampul/${seni}.svg`}
        alt=""
        width={300}
        height={400}
        unoptimized
        className="block h-auto w-full"
      />
      <div
        className={`absolute inset-0 flex flex-col justify-between p-[9%] ${warnaTeks}`}
      >
        <span className="line-clamp-2 text-[4.2cqw] leading-tight">
          {penulis}
        </span>
        <span className="line-clamp-3 text-[10cqw] font-bold leading-tight break-words">
          {judul}
        </span>
      </div>
    </div>
  );
}

export default SampulBuku;
