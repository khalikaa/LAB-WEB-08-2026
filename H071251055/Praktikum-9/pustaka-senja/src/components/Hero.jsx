// Pasangan [lebar, tinggi] punggung buku pada rak di bawah langit senja.
const punggung = [
  [18, 70], [24, 92], [16, 64], [26, 80], [20, 98], [14, 58], [28, 86], [18, 74],
  [22, 66], [16, 90], [24, 78], [20, 60], [30, 96], [16, 72], [22, 84], [18, 56],
  [26, 94], [14, 68], [24, 76], [20, 88], [28, 62], [16, 82], [22, 100], [18, 70],
  [26, 58], [20, 90], [14, 76], [24, 66], [30, 92], [18, 80], [22, 60], [16, 96],
  [26, 72], [20, 64], [28, 88], [14, 84], [24, 56], [18, 94], [22, 74], [16, 68],
  [26, 86], [20, 98], [30, 62], [18, 78], [24, 90], [14, 70], [22, 82], [28, 58],
  [16, 92], [20, 76], [26, 66], [18, 100], [22, 72], [24, 84], [14, 60], [28, 94],
];
const warna = ["#1c1017", "#26151d", "#2f1b24"];
const dasar = 108;

// Posisi bintang berupa kelas Tailwind; kelasnya sendiri unik sehingga dipakai sebagai key.
const bintang = [
  "top-[9%] left-[8%]",
  "top-[16%] left-[22%]",
  "top-[7%] left-[38%]",
  "top-[14%] left-[55%]",
  "top-[6%] left-[68%]",
  "top-[19%] left-[81%]",
  "top-[10%] left-[92%]",
  "top-[26%] left-[46%]",
];

export default function Hero({ nama, slogan, lokasi, jamBuka }) {
  const kata = nama.split(" ");
  const terakhir = kata.pop();

  // x awal tiap buku = jumlah lebar buku sebelumnya, jadi unik dan dipakai sebagai key.
  let x = 0;
  const buku = punggung.map(([w, h], i) => {
    const posisi = x;
    x += w;
    return { w, h, x: posisi, i };
  });

  return (
    <section className="relative isolate overflow-hidden border-2 border-dusk bg-[linear-gradient(to_bottom,#2b1a33_0%,#4a2b45_28%,#b5475a_62%,#e8743b_84%,#f2b45e_100%)]">
      {bintang.map((posisi) => (
        <span
          key={posisi}
          aria-hidden="true"
          className={"absolute size-[3px] rounded-full bg-paper opacity-60 " + posisi}
        />
      ))}

      {/* matahari terbenam */}
      <div
        aria-hidden="true"
        className="absolute bottom-10 left-1/2 size-40 -translate-x-1/2 rounded-full bg-[radial-gradient(circle_at_50%_40%,#fff0c2,#f6b45a_55%,#e8743b)] shadow-[0_0_90px_30px_rgba(246,160,77,0.55)] sm:left-[76%] sm:size-52"
      />

      {/* rak buku */}
      <svg
        aria-hidden="true"
        viewBox="0 0 1000 120"
        preserveAspectRatio="xMidYMax slice"
        className="absolute inset-x-0 bottom-0 h-28 w-full"
      >
        {buku.map(({ w, h, x: bx, i }) => (
          <g key={bx}>
            <rect x={bx} y={dasar - h} width={w - 1} height={h} fill={warna[i % 3]} />
            {i % 3 === 0 && (
              <rect x={bx + 2} y={dasar - h + 10} width={w - 5} height="3" fill="#e9b25a" opacity="0.5" />
            )}
            {i % 4 === 1 && (
              <rect x={bx + 2} y={dasar - 16} width={w - 5} height="2" fill="#d9622b" opacity="0.45" />
            )}
          </g>
        ))}
        <rect x="0" y={dasar} width="1000" height="12" fill="#140b10" />
      </svg>

      <div className="relative z-10 px-6 pb-60 pt-12 text-paper sm:px-12 sm:pb-56 sm:pt-16">
        <p className="font-mono text-xs uppercase tracking-[0.3em] text-gold">
          Perpustakaan komunitas
        </p>
        <h1 className="mt-4 font-display text-5xl font-light leading-[0.95] tracking-tight sm:text-7xl">
          {kata.join(" ")} <em className="font-light text-gold">{terakhir}</em>
        </h1>
        <p className="mt-6 max-w-xl text-lg leading-relaxed text-paper/90 sm:text-xl">{slogan}</p>
        <p className="mt-6 flex flex-wrap gap-x-6 gap-y-1 font-mono text-xs uppercase tracking-[0.18em] text-paper/85">
          <span>{lokasi}</span>
          <span aria-hidden="true">/</span>
          <span>{jamBuka}</span>
        </p>
      </div>
    </section>
  );
}
