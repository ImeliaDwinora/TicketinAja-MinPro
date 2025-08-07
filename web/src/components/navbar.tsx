"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { doLogout } from "@/actions/doLogout";

export default function Navbarheader({ claims }) {
  const [isOpen, setIsOpen] = useState(false);
  const router = useRouter();

  const handleLogout = async () => {
    const response = await doLogout();
    if (response.status) {
      window.location.href = "/"; // full reload
    }
  };

  return (
    <header className="bg-white text-[#46718e] shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 py-3 flex justify-between items-center">
        <div className="flex items-center gap-2">
          <Link href="/">
            <Image
              src="/logoTicket.png"
              alt="Logo Ticketin.Aja"
              width={180}
              height={180}
              className="rounded cursor-pointer"
            />
          </Link>
        </div>

        <button
          className="md:hidden flex flex-col gap-1"
          onClick={() => setIsOpen(!isOpen)}
        >
          <span className="w-6 h-0.5 bg-[#46718e]"></span>
          <span className="w-6 h-0.5 bg-[#46718e]"></span>
          <span className="w-6 h-0.5 bg-[#46718e]"></span>
        </button>

        <nav className="hidden md:flex gap-6 text-[16px] font-medium">
          <Link
            href="/event"
            className="hover:text-[#f8b071] transition-colors"
          >
            Event
          </Link>
          <Link href="/" className="hover:text-[#f8b071] transition-colors">
            Beranda
          </Link>
          <Link
            href="/about"
            className="hover:text-[#f8b071] transition-colors"
          >
            Tentang
          </Link>
        </nav>

        {claims === null && (
          <div className="hidden md:flex flex-row gap-3">
            <Link
              href="/user/login"
              className="text-[16px] bg-[#f8b071] border rounded-xl px-4 py-2 text-white hover:opacity-90 transition"
            >
              Masuk
            </Link>
            <Link
              href="/user/register"
              className="text-[16px] bg-[#f8b071] border rounded-xl px-4 py-2 text-white hover:opacity-90 transition"
            >
              Register
            </Link>
          </div>
        )}
        {claims?.role === "USER" && (
          <div className="hidden md:flex flex-row gap-3">
            <Link
              href="#"
              onClick={handleLogout}
              className="text-[16px] bg-[#f8b071] border rounded-xl px-4 py-2 text-white hover:opacity-90 transition"
            >
              Logout
            </Link>
          </div>
        )}
        {claims?.role === "ORGANIZER" && (
          <div className="hidden md:flex flex-row gap-3">
            <Link
              href="/event/create"
              className="text-[16px] bg-white border rounded-xl px-4 py-2 text-[#f8b071] hover:bg-[#f8b071] hover:text-white transition"
            >
              Buat Acara
            </Link>
            <Link
              href="/confirmation"
              className="text-[16px] bg-white border rounded-xl px-4 py-2 text-[#f8b071] hover:bg-[#f8b071] hover:text-white transition"
            >
              Konfirmasi
            </Link>
            <Link
              href="#"
              onClick={handleLogout}
              className="text-[16px] bg-[#f8b071] border rounded-xl px-4 py-2 text-white hover:opacity-90 transition"
            >
              Logout
            </Link>
          </div>
        )}
      </div>

      {isOpen && (
        <div className="md:hidden bg-white px-4 py-4 space-y-3 border-t shadow-sm">
          <nav className="flex flex-col gap-3 text-[16px] font-medium">
            <Link
              href="/event"
              className="hover:text-[#f8b071]"
              onClick={() => setIsOpen(false)}
            >
              Event
            </Link>
            <Link
              href="/"
              className="hover:text-[#f8b071]"
              onClick={() => setIsOpen(false)}
            >
              Beranda
            </Link>
            <Link
              href="/about"
              className="hover:text-[#f8b071]"
              onClick={() => setIsOpen(false)}
            >
              Tentang
            </Link>
          </nav>
          <div className="flex flex-col gap-3 pt-4 border-t">
            <Link
              href="/event/create"
              className="text-[16px] bg-white border rounded-xl px-4 py-2 text-[#f8b071] hover:bg-[#f8b071] hover:text-white transition"
              onClick={() => setIsOpen(false)}
            >
              Buat Acara
            </Link>
            <Link
              href="/confirmation"
              className="text-[16px] bg-white border rounded-xl px-4 py-2 text-[#f8b071] hover:bg-[#f8b071] hover:text-white transition"
              onClick={() => setIsOpen(false)}
            >
              Konfirmasi
            </Link>
            <Link
              href="/user/login"
              className="text-[16px] bg-[#f8b071] border rounded-xl px-4 py-2 text-white hover:opacity-90 transition"
              onClick={() => setIsOpen(false)}
            >
              Masuk
            </Link>
            <Link
              href="/user/register"
              className="text-[16px] bg-[#f8b071] border rounded-xl px-4 py-2 text-white hover:opacity-90 transition"
              onClick={() => setIsOpen(false)}
            >
              Register
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
