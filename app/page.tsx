import { supabase } from "@/lib/supabase";

export const dynamic = "force-dynamic";

type Product = {
  id: number;
  nama: string;
  deskripsi: string | null;
  harga: number;
  stok: number;
  gambar_url: string | null;
  categories: { nama: string } | null;
};

const rupiah = (angka: number) =>
  new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    maximumFractionDigits: 0,
  }).format(angka);

export default async function Home() {
  const { data, error } = await supabase
    .from("products")
    .select("*, categories(nama)")
    .order("id");

  const products = (data ?? []) as Product[];

  return (
    <main className="mx-auto max-w-6xl p-8">
      <h1 className="text-3xl font-bold text-pink-700">Toko Bunga</h1>
      <p className="mt-1 text-gray-500">Rangkaian bunga segar untuk setiap momen.</p>

      {error && <p className="mt-4 text-red-500">Error: {error.message}</p>}

      <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {products.map((p) => (
          <div key={p.id} className="rounded-xl border p-4 shadow-sm">
            <div className="flex h-40 items-center justify-center rounded-lg bg-pink-50 text-5xl">
              {p.gambar_url ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img src={p.gambar_url} alt={p.nama} className="h-full w-full rounded-lg object-cover" />
              ) : (
                "💐"
              )}
            </div>
            <p className="mt-3 text-xs uppercase tracking-wide text-pink-600">
              {p.categories?.nama}
            </p>
            <h2 className="text-lg font-semibold">{p.nama}</h2>
            <p className="mt-1 text-sm text-gray-500">{p.deskripsi}</p>
            <div className="mt-3 flex items-center justify-between">
              <span className="font-bold">{rupiah(p.harga)}</span>
              <span className="text-xs text-gray-400">Stok: {p.stok}</span>
            </div>
          </div>
        ))}
      </div>
    </main>
  );
}