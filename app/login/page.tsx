"use client";

import { useState } from "react";
import { supabaseBrowser } from "@/lib/supabase-browser";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [pesan, setPesan] = useState("");

  async function masuk(e: React.FormEvent) {
    e.preventDefault();
    setPesan("");
    const { error } = await supabaseBrowser().auth.signInWithPassword({
      email,
      password,
    });
    if (error) setPesan("Email atau password salah.");
    else window.location.href = "/";
  }

  return (
    <main className="mx-auto max-w-sm p-8">
      <h1 className="text-2xl font-bold">Masuk</h1>
      <form onSubmit={masuk} className="mt-6 space-y-3">
        <input className="w-full rounded border p-2" type="email" placeholder="Email"
          value={email} onChange={(e) => setEmail(e.target.value)} required />
        <input className="w-full rounded border p-2" type="password" placeholder="Password"
          value={password} onChange={(e) => setPassword(e.target.value)} required />
        <button className="w-full rounded bg-pink-600 p-2 text-white">Masuk</button>
        {pesan && <p className="text-sm text-red-500">{pesan}</p>}
      </form>
    </main>
  );
}