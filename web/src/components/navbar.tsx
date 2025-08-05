import Link from "next/link";
import Image from "next/image";

export default function Navbarheader() {
  return (
    <header className="bg-white text-[#46718e] shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 py-3 flex justify-between items-center">
        <div className="flex items-center gap-2">
          <Image
            src="/logoTicket.png"
            alt="Logo Ticketin.Aja"
            width={180}
            height={180}
            className="rounded"
          />
        </div>
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
      </div>
    </header>
  );
}
