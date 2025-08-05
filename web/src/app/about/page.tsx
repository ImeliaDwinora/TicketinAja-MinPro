"use client";

import Image from "next/image";
import Navbarheader from "@/components/navbar";

export default function AboutPage() {
  return (
    <>
      <Navbarheader />
      <main className="min-h-screen bg-white text-[#374151] px-6 py-12">
        <section className="max-w-5xl mx-auto grid gap-10">
          {/* Judul */}
          <div className="text-center">
            <h1 className="text-4xl font-bold text-[#1f2937]">
              Tentang TicketinAja
            </h1>
            <p className="mt-4 text-lg text-gray-600 max-w-2xl mx-auto">
              TicketinAja adalah platform digital untuk mencari, membuat, dan
              mengelola event dari mana saja. Mulai dari konser, workshop,
              hingga acara komunitas, semua bisa di TicketinAja!
            </p>
          </div>

          {/* Gambar + Deskripsi */}
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <Image
              src="/concert.jpg"
              alt="Event Illustration"
              width={500}
              height={400}
              className="w-full object-contain"
            />

            <div className="text-gray-700 space-y-4">
              <h2 className="text-2xl font-semibold text-[#1f2937]">
                Misi Kami
              </h2>
              <p>
                Memberdayakan penyelenggara acara dan peserta dengan solusi
                tiket yang cepat, aman, dan efisien. Kami percaya bahwa setiap
                orang berhak merasakan pengalaman event yang mudah diakses dan
                berkesan.
              </p>
              <p>
                TicketinAja hadir untuk menjadi jembatan antara ide dan
                aksi—mewujudkan event impianmu tanpa ribet!
              </p>
            </div>
          </div>

          {/* Nilai-nilai */}
          <div>
            <h2 className="text-2xl font-semibold text-[#1f2937] text-center mb-6">
              Nilai Utama Kami
            </h2>
            <div className="grid md:grid-cols-3 gap-6">
              <div className="bg-amber-100 p-6 rounded-xl shadow-md">
                <h3 className="text-xl font-bold mb-2">Kemudahan Akses</h3>
                <p>
                  Kami merancang sistem yang user-friendly agar semua orang bisa
                  mengelola event dengan mudah.
                </p>
              </div>
              <div className="bg-emerald-100 p-6 rounded-xl shadow-md">
                <h3 className="text-xl font-bold mb-2">Transparansi</h3>
                <p>
                  Harga, status tiket, dan data transaksi disajikan secara jelas
                  dan jujur.
                </p>
              </div>
              <div className="bg-indigo-100 p-6 rounded-xl shadow-md">
                <h3 className="text-xl font-bold mb-2">Komunitas</h3>
                <p>
                  Kami mendorong kolaborasi dan pertumbuhan komunitas lokal
                  melalui acara yang berdampak.
                </p>
              </div>
            </div>
          </div>

          {/* CTA */}
          <div className="text-center mt-12">
            <h2 className="text-2xl font-semibold">Gabung Bersama Kami</h2>
            <p className="text-gray-600 mt-2">
              Mulai buat event kamu sendiri atau temukan event seru lainnya hari
              ini!
            </p>
            <button className="mt-4 bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-full font-semibold shadow-md">
              Mulai Sekarang
            </button>
          </div>
        </section>
      </main>
    </>
  );
}
