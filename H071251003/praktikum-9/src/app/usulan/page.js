import pool from "@/lib/db";
import { tambahUsulan } from "@/actions/usulan_action";
import FormUsulan from "@/components/formUsulan";

export const dynamic = "force-dynamic";

export default async function UsulanPage() {
  const { rows } = await pool.query(
    "SELECT id_usulan, nama_pengusul, buku_usulan, kategori_usulan, alasan_usulan FROM usulan ORDER BY id_usulan DESC;"
  );

  return (
    <section className="max-w-xl mx-auto p-6 space-y-8">
      {/* (Client Component) */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-lg">
        <h1 className="text-2xl font-bold mb-2 text-white">Usulkan Koleksi Buku Baru</h1>
        <p className="text-slate-400 text-sm mb-6">
          Punya rekomendasi buku menarik untuk Pustaka Senja? Sampaikan usulan Anda melalui formulir di bawah ini.
        </p>

        <FormUsulan actionServer={tambahUsulan} />
      </div>

      {rows.length > 0 && (
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-lg">
          <h2 className="text-xl font-bold mb-4 text-white">Daftar Usulan di Database</h2>
          <div className="space-y-4">
            {rows.map((item) => (
              <div key={item.id_usulan} className="bg-slate-950 border border-slate-800 p-4 rounded-xl">
                <div className="flex justify-between items-start mb-1">
                  <h3 className="font-semibold text-amber-400">{item.buku_usulan}</h3>
                  <span className="text-xs bg-slate-800 text-slate-300 px-2.5 py-0.5 rounded-full border border-slate-700">
                    {item.kategori_usulan}
                  </span>
                </div>
                <p className="text-sm text-slate-300 mb-2">&quot;{item.alasan_usulan}&quot;</p>
                <p className="text-xs text-slate-500">Di-usulkan oleh: {item.nama_pengusul}</p>
              </div>
            ))}
          </div>
        </div>
      )}
    </section>
  );
}