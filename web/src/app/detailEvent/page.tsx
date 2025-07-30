import Image from "next/image";
import Link from "next/link";

export default function DetailEvent() {
  return (
    <div className="flex flex-col min-h-screen font-sans bg-white text-[#46718e]">
      {/* NAVBAR */}
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
            <a href="#" className="hover:text-[#f8b071] transition-colors">
              Kategori
            </a>
            <Link href="/" className="hover:text-[#f8b071] transition-colors">
              Beranda
            </Link>
            <a href="#" className="hover:text-[#f8b071] transition-colors">
              Tentang
            </a>
          </nav>
          <div className="hidden md:flex flex-row gap-3">
            <Link
              href="/event"
              className="text-[16px] bg-white border rounded-xl px-4 py-2 text-[#f8b071] hover:bg-[#f8b071] hover:text-white transition"
            >
              Buat Acara
            </Link>
            <button className="text-[16px] bg-[#f8b071] border rounded-xl px-4 py-2 text-white hover:opacity-90 transition">
              Masuk
            </button>
          </div>
        </div>

        {/* SEARCH BAR */}
      </header>

      {/* HERO SECTION */}
      <main className="relative flex-grow px-4 min-h-[60vh] overflow-hidden m-10 rounded-xl">
        <div className="absolute inset-0 z-0">
          <Image
            src="https://images.unsplash.com/photo-1497911270199-1c552ee64aa4?q=80&w=1170&auto=format&fit=crop"
            alt="Hero Background"
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-black/30" />
        </div>
      </main>

      {/* EVENT DETAILS */}
      <section className="px-6 md:px-20 py-8 space-y-6 bg-white text-[#46718e]">
        {/* Info Event */}
        <div className="space-y-2">
          <h2 className="text-2xl font-bold">Judul Event</h2>
          <p className="text-md">Deskripsi event secara lengkap dan menarik.</p>
          <p className="text-sm">📍 Lokasi Event</p>
          <p className="text-sm">🕒 Jam dan Tanggal</p>
        </div>

        {/* Harga & Tombol */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 border-t pt-6">
          <div>
            <h2 className="text-xl font-semibold">Harga Tiket</h2>
            <p className="text-lg font-bold text-[#f8b071]">Rp 100.000</p>
          </div>
          <button className="bg-[#f8b071] text-white px-6 py-2 rounded-md hover:bg-[#f59e42] transition text-sm">
            Beli Tiket
          </button>
        </div>
      </section>
    </div>
  );
}
