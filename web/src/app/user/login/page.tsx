"use client";

import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";

const signInSchema = z.object({
  email: z.string().email("Please enter a valid email address"),
  password: z
    .string()
    .min(3, "Password must be at least 3 characters")
    .max(25, "Password cannot be more than 25 characters")
    .regex(/\d/, "Password must include at least one number")
    .regex(/[a-z]/, "Password must include at least one lowercase letter")
    .regex(/[A-Z]/, "Password must include at least one uppercase letter"),
});

type LoginFormData = z.infer<typeof signInSchema>;

export default function LoginPage() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormData>({
    resolver: zodResolver(signInSchema),
  });
  const router = useRouter();

  const onSubmit = async (data: LoginFormData) => {
    console.log("Login Data:", data);
    try {
      const res = await fetch("http://localhost:8000/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
        credentials: "include",
      });

      if (!res.ok) throw new Error("Login failed");

      const response = await res.json();
      console.log("Login Success:", response);
      router.push("/");
    } catch (err) {
      console.error("Login error:", err);
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
            placeholder="you@example.com"
            {...register("email")}
            className="w-full px-4 py-2 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-amber-400"
          />
          {errors.email && (
            <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>
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
            placeholder="••••••••"
            {...register("password")}
            className="w-full px-4 py-2 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-amber-400"
          />
          {errors.password && (
            <p className="text-red-500 text-sm mt-1">
              {errors.password.message}
            </p>
          )}
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

        {/* Register link */}
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
