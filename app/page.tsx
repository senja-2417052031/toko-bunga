import { supabase } from "@/lib/supabase";

export const dynamic = "force-dynamic";

export default async function Home() {
  const { data: categories, error } = await supabase
    .from("categories")
    .select("*");

  return (
    <main className="p-8">
      <h1 className="text-3xl font-bold">Toko Bunga</h1>
      <h2 className="mt-6 text-xl font-semibold">Kategori</h2>
      {error && <p className="text-red-500">Error: {error.message}</p>}
      <ul className="mt-2 list-disc pl-6">
        {categories?.map((c) => (
          <li key={c.id}>{c.nama}</li>
        ))}
      </ul>
    </main>
  );
}