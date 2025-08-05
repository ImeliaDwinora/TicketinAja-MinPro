"use client";

import { useState } from "react";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  return (
    <main className="min-h-screen flex items-center justify-center bg-gradient-to-br from-yellow-100 to-amber-100 px-4">
      <form
        onSubmit={(e) => e.preventDefault()}
        className="bg-white rounded-3xl shadow-2xl w-full max-w-md p-8 md:p-10 space-y-6"
      >
        <h1 className="text-3xl font-bold text-center text-[#3B6377]">
          Selamat Datang 👋
        </h1>
        <p className="text-center text-gray-600 text-sm">
          Masuk ke akun Ticketin.Aja kamu
        </p>

        {/* Email */}
        <div>
          <label htmlFor="email" className="block text-sm font-medium mb-1">
            Email
          </label>
          <input
            id="email"
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="you@example.com"
            className="w-full px-4 py-2 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-amber-400"
          />
        </div>

        {/* Password */}
        <div>
          <label htmlFor="password" className="block text-sm font-medium mb-1">
            Password
          </label>
          <input
            id="password"
            type="password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="••••••••"
            className="w-full px-4 py-2 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-amber-400"
          />
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full bg-amber-400 hover:bg-amber-500 text-white font-semibold py-2 rounded-xl transition"
        >
          Masuk
        </button>

        {/* Divider */}
        <div className="flex items-center gap-3 text-gray-400 text-sm">
          <div className="flex-1 border-t border-gray-300" />
          <span>atau</span>
          <div className="flex-1 border-t border-gray-300" />
        </div>

        {/* Google Login */}
        <button
          type="button"
          className="w-full border border-gray-300 hover:bg-gray-50 flex items-center justify-center gap-2 py-2 rounded-xl transition"
        >
          <span>🔒</span>
          <span className="text-sm text-gray-700">Masuk dengan Google</span>
        </button>

        {/* Optional register link */}
        <p className="text-center text-sm text-gray-500 mt-4">
          Belum punya akun?{" "}
          <a href="/user/register" className="text-amber-500 hover:underline">
            Daftar sekarang
          </a>
        </p>
      </form>
    </main>
  );
}
