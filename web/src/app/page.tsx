"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
enum Category {
  MUSIC = "MUSIC",
  COMMUNITY = "COMMUNITY",
  FAMILY = "FAMILY",
  EDUCATION = "EDUCATION",
  WELLNESS = "WELLNESS",
}

interface Event {
  id: string;
  name: string;
  description: string;
  location: string;
  category: Category;
  start_date: string;
  end_date: string;
  is_paid: boolean;
  price: number;
  quota: number;
  image: string;
  created_at: string;
  updated_at: string;
}

export default function Home() {
  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const res = await fetch("http://localhost:8000/api/event");
        if (!res.ok) throw new Error("Failed to fetch");
        const data = await res.json();
        setEvents(data);
      } catch (err) {
        console.error("Error fetching events:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchEvents();
  }, []);

  if (loading) {
    return <p className="text-center text-gray-500 py-10">Memuat event...</p>;
  }
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
            <Link
              href="/event"
              className="hover:text-[#f8b071] transition-colors"
            >
              Event
            </Link>
            <Link href="/" className="hover:text-[#f8b071] transition-colors">
              Beranda
            </Link>
            <a href="#" className="hover:text-[#f8b071] transition-colors">
              Tentang
            </a>
          </nav>
          <div className="hidden md:flex flex-row gap-3">
            <Link
              href="/event/create"
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

      {/* HERO SECTION */}
      <main className="relative flex-grow flex items-center justify-center px-4 text-center min-h-[60vh] overflow-hidden">
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
        <div className="z-10 text-white space-y-4">
          <h1 className="text-3xl md:text-5xl font-bold drop-shadow-lg">
            Temukan dan Nikmati Event Favoritmu!
          </h1>
          <p className="text-md md:text-lg drop-shadow-md">
            Dari konser seru hingga seminar inspiratif, semua ada di
            Ticketin.Aja 🎫
          </p>
        </div>
      </main>

      {/* CATEGORY SECTION */}
      <section className="py-10 px-2 flex flex-col items-center justify-center gap-5">
        <h2 className="text-3xl md:text-5xl font-bold drop-shadow-lg">
          Acara Minggu Ini
        </h2>
        <p className="text-md md:text-lg drop-shadow-md">
          Dari konser seru hingga seminar inspiratif, semua ada di Ticketin.Aja
          🎫
        </p>

        {/* EVENT CARDS */}
        <section className="py-10 px-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {events.slice(0, 3).map((event) => (
              <div
                key={event.id}
                className="bg-white shadow-md rounded-xl overflow-hidden hover:shadow-lg transition"
              >
                <div className="relative w-full h-48">
                  <Image
                    src={event.image}
                    alt="Event Image"
                    fill
                    className="object-cover"
                    priority
                  />
                </div>
                <div className="p-4 space-y-2">
                  <h2 className="text-lg font-semibold text-[#3B6377]">
                    {event.name}
                  </h2>
                  <p className="text-sm text-gray-500">
                    {event.start_date} • {event.location}
                  </p>
                  <p className="text-sm text-gray-600">{event.description}</p>
                  <div className="flex items-center justify-between mt-4">
                    <p className="text-[#f8b071] font-bold">
                      {event.price === 0
                        ? "Gratis"
                        : `Rp ${event.price.toLocaleString("id-ID")}`}
                    </p>
                    <Link
                      href={`/detailEvent?id=${event.id}`}
                      className="bg-[#f8b071] text-white px-4 py-2 rounded-md hover:bg-[#f59e42] transition text-sm"
                    >
                      Lihat Event
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>
      </section>

      {/* REVIEW SECTION */}
      <section className="py-10 px-4 bg-white">
        <h2 className=" text-[#3B6377] text-center mb-8 text-3xl md:text-5xl font-bold drop-shadow-lg">
          Apa Kata Mereka?
        </h2>
        <p className="text-md md:text-lg drop-shadow-md text-center mb-10">
          Dari konser seru hingga seminar inspiratif, semua ada di Ticketin.Aja
          🎫
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {[
            {
              name: "Nama Orang",
              location: "Jakarta",
              rating: "5.0",
              review:
                "Platform yang sangat mudah digunakan! Saya sudah membeli tiket konser beberapa kali di sini dan prosesnya sangat lancar.",
              image: "https://randomuser.me/api/portraits/women/44.jpg",
            },
            {
              name: "Nama Orang",
              location: "Bandung",
              rating: "4.5",
              review:
                "Saya suka antarmukanya yang simpel dan pilihan event-nya beragam. Tiket langsung masuk email, mantap!",
              image: "https://randomuser.me/api/portraits/men/33.jpg",
            },
            {
              name: "Nama Orang",
              location: "Surabaya",
              rating: "4.8",
              review:
                "Beli tiket seminar, prosesnya cepat dan gak ribet. Website-nya user-friendly banget.",
              image: "https://randomuser.me/api/portraits/women/65.jpg",
            },
          ].map((item, index) => (
            <div
              key={index}
              className="bg-white shadow-md rounded-xl p-6 space-y-4 hover:shadow-lg transition"
            >
              <p className="text-gray-700 italic">“{item.review}”</p>
              <div className="flex items-center gap-3">
                <div className="relative w-10 h-10">
                  <Image
                    src={item.image}
                    alt={item.name}
                    fill
                    className="rounded-full object-cover"
                  />
                </div>
                <div>
                  <p className="text-sm font-semibold text-[#3B6377]">
                    {item.name}
                  </p>
                  <p className="text-xs text-gray-500">
                    {item.location} • Rating ⭐ {item.rating}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* FOOTER */}
      <footer className="bg-[#46718e] text-white px-4 py-8 text-sm font-cherry">
        <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 text-center md:text-left">
          <div>
            <h4 className="font-semibold mb-2">Ticketin.Aja</h4>
            <p>Platform pencarian dan pembelian tiket event.</p>
          </div>
          <div>
            <h4 className="font-semibold mb-2">Kontak</h4>
            <p>email@ticketinaja.com</p>
            <p>+62 812-3456-7890</p>
          </div>
          <div>
            <h4 className="font-semibold mb-2">Ikuti Kami</h4>
            <p>Instagram | Twitter | TikTok</p>
          </div>
        </div>

        <div className="mt-8 text-center text-xs text-white/60">
          Made with ❤️ by Ticketin.Aja © 2025
        </div>
      </footer>
    </div>
  );
}
