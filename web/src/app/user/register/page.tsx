"use client";

import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useRouter } from "next/navigation";

const registerSchema = z.object({
  name: z.string().min(2, "Nama harus diisi"),
  email: z.string().email("Please enter a valid email address"),
  password: z
    .string()
    .min(3, "Password must be at least 3 characters")
    .max(25, "Password cannot be more than 25 characters")
    .regex(/\d/, "Password must include at least one number")
    .regex(/[a-z]/, "Password must include at least one lowercase letter")
    .regex(/[A-Z]/, "Password must include at least one uppercase letter"),
  role: z.enum(["USER", "ORGANIZER"] as const, {
    errorMap: () => ({ message: "Pilih salah satu role" }),
  }),
  referralCode: z.string().optional(), // bisa kosong
});

type RegisterForm = z.infer<typeof registerSchema>;

export default function RegisterPage() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm<RegisterForm>({
    resolver: zodResolver(registerSchema),
  });

  const selectedRole = watch("role");
  const router = useRouter();

  const [file, setFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);

  const onSubmit = async (data: RegisterForm) => {
    setLoading(true);
    try {
      const formData = new FormData();
      formData.append("name", data.name);
      formData.append("email", data.email);
      formData.append("password", data.password);
      formData.append("role", data.role);
      if (data.referralCode)
        formData.append("refferal_code", data.referralCode);
      if (file) formData.append("profilePic", file);

      const res = await fetch("http://localhost:8000/api/auth/register", {
        method: "POST",
        body: formData,
      });

      const result = await res.json();

      if (!res.ok) throw new Error(result.message || "Registrasi gagal");

      alert("Registrasi berhasil!");
      router.push("/login");
    } catch (err: any) {
      alert(err.message || "Terjadi kesalahan");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen flex items-center justify-center bg-gradient-to-br from-yellow-100 to-amber-100 px-4">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="bg-white rounded-3xl shadow-2xl w-full max-w-md p-8 md:p-10 space-y-6"
      >
        <h1 className="text-3xl font-bold text-center text-[#3B6377]">
          Selamat Datang 👋
        </h1>
        <p className="text-center text-gray-600 text-sm">
          Daftarkan akun Ticketin.Aja kamu
        </p>

        {/* Name */}
        <div>
          <label htmlFor="name" className="block text-sm font-medium mb-1">
            Nama
          </label>
          <input
            id="name"
            {...register("name")}
            placeholder="Masukkan nama lengkap"
            className="w-full px-4 py-2 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-amber-400"
          />
          {errors.name && (
            <p className="text-sm text-red-500">{errors.name.message}</p>
          )}
        </div>

        {/* Email */}
        <div>
          <label htmlFor="email" className="block text-sm font-medium mb-1">
            Email
          </label>
          <input
            id="email"
            type="email"
            {...register("email")}
            placeholder="you@example.com"
            className="w-full px-4 py-2 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-amber-400"
          />
          {errors.email && (
            <p className="text-sm text-red-500">{errors.email.message}</p>
          )}
        </div>

        {/* Password */}
        <div>
          <label htmlFor="password" className="block text-sm font-medium mb-1">
            Password
          </label>
          <input
            id="password"
            type="password"
            {...register("password")}
            placeholder="••••••••"
            className="w-full px-4 py-2 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-amber-400"
          />
          {errors.password && (
            <p className="text-sm text-red-500">{errors.password.message}</p>
          )}
        </div>

        {/* Role */}
        <div>
          <span className="block text-sm font-medium mb-1">
            Daftar sebagai:
          </span>
          <div className="flex items-center gap-4">
            <label className="flex items-center gap-2 text-sm">
              <input
                type="radio"
                value="USER"
                {...register("role")}
                className="accent-amber-400"
              />
              User
            </label>
            <label className="flex items-center gap-2 text-sm">
              <input
                type="radio"
                value="ORGANIZER"
                {...register("role")}
                className="accent-amber-400"
              />
              Organizer
            </label>
          </div>
          {errors.role && (
            <p className="text-sm text-red-500">{errors.role.message}</p>
          )}
        </div>

        {/* Referral Code */}
        {selectedRole === "USER" && (
          <div>
            <label
              htmlFor="referralCode"
              className="block text-sm font-medium mb-1"
            >
              Kode Referral (opsional)
            </label>
            <input
              id="referralCode"
              {...register("referralCode")}
              placeholder="Masukkan kode referral"
              className="w-full px-4 py-2 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-amber-400"
            />
          </div>
        )}
        <div>
          <label htmlFor="profilePic" className="block font-medium mb-1">
            Foto Profil
          </label>
          <input
            id="profilePic"
            type="file"
            accept="image/*"
            onChange={(e) => setFile(e.target.files?.[0] || null)}
            className="w-full"
          />
        </div>

        {/* Submit */}
        <button
          type="submit"
          disabled={loading}
          className="w-full bg-amber-400 hover:bg-amber-500 text-white font-semibold py-2 rounded-xl transition"
        >
          {loading ? "Memproses..." : "Daftar"}
        </button>

        <div className="flex items-center gap-3 text-gray-400 text-sm">
          <div className="flex-1 border-t border-gray-300" />
          <span>atau</span>
          <div className="flex-1 border-t border-gray-300" />
        </div>

        <p className="text-center text-sm text-gray-500 mt-4">
          Sudah punya akun?{" "}
          <a href="/user/login" className="text-amber-500 hover:underline">
            Login sekarang
          </a>
        </p>
      </form>
    </main>
  );
}
