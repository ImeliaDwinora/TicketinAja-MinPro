// app/payment/page.tsx atau pages/payment.tsx
import Image from "next/image";
import Link from "next/link";

export default function PaymentPage() {
  const paymentDeadline = new Date(Date.now() + 2 * 60 * 60 * 1000); // 2 jam dari sekarang

  return (
    <main className="min-h-screen bg-white text-[#46718e] font-sans">
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
      </header>

      {/* Konten Pembayaran */}
      <div className="max-w-4xl mx-auto px-6 py-10">
        <h1 className="text-3xl font-bold mb-6 text-center text-[#f8b071]">
          Pembayaran Tiket
        </h1>

        {/* Info Event */}
        <div className="bg-gray-100 rounded-xl p-6 mb-6 shadow">
          <div className="flex flex-col sm:flex-row gap-4">
            <Image
              src="https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e"
              alt="Event"
              width={300}
              height={200}
              className="rounded-lg object-cover w-full sm:w-1/3"
            />
            <div className="flex-1">
              <h2 className="text-2xl font-semibold">Music Festival 2025</h2>
              <p className="text-sm text-gray-500">Bali • 10 Desember 2025</p>
              <p className="text-lg mt-4 font-bold">Rp 250.000</p>
              <p className="text-sm text-red-500 mt-2">
                Batas waktu pembayaran:{" "}
                {paymentDeadline.toLocaleTimeString("id-ID")}
              </p>
            </div>
          </div>
        </div>

        {/* Info Tiket & Total */}
        <div className="mb-6">
          <div className="flex justify-between items-center border-b py-3">
            <span>Jumlah Tiket</span>
            <span>2</span>
          </div>
          <div className="flex justify-between items-center border-b py-3 font-bold text-lg">
            <span>Total Bayar</span>
            <span>Rp 500.000</span>
          </div>
        </div>

        {/* Metode Pembayaran */}
        <div className="mb-6">
          <h3 className="text-lg font-semibold mb-2">Transfer ke Rekening</h3>
          <p className="mb-1">Bank BCA</p>
          <p className="mb-1 font-mono">1234567890</p>
          <p>a.n. PT EventKeren</p>
        </div>

        {/* Upload Bukti Pembayaran */}
        <div className="mb-6">
          <h3 className="text-lg font-semibold mb-2">
            Unggah Bukti Pembayaran
          </h3>
          <input
            type="file"
            accept="image/*"
            className="block w-full border border-gray-300 rounded-lg p-2"
          />
        </div>

        {/* Tombol Konfirmasi */}
        <button className="w-full bg-[#f8b071] hover:opacity-90 text-white font-semibold py-3 rounded-xl">
          Konfirmasi Pembayaran
        </button>
      </div>
    </main>
  );
}
