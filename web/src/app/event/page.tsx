"use client";

import Image from "next/image";
import Link from "next/link";
import { useState, useEffect } from "react";

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

const categories = Object.values(Category);

export default function EventsPage() {
  const [events, setEvents] = useState<Event[]>([]);
  const [locations, setLocations] = useState<string[]>([]);
  const [search, setSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedLocation, setSelectedLocation] = useState("");

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const res = await fetch("http://localhost:8000/api/event");
        const data: Event[] = await res.json();
        setEvents(data);
        const uniqueLocations = [
          ...new Set(data.map((event: Event) => event.location)),
        ];
        setLocations(uniqueLocations);
      } catch (error) {
        console.error("Gagal mengambil event:", error);
      }
    };

    fetchEvents();
  }, []);

  const filteredEvents = events.filter((event) => {
    const matchesSearch = event.name
      .toLowerCase()
      .includes(search.toLowerCase());
    const matchesCategory = selectedCategory
      ? event.category === selectedCategory
      : true;
    const matchesLocation = selectedLocation
      ? event.location === selectedLocation
      : true;

    return matchesSearch && matchesCategory && matchesLocation;
  });

  return (
    <main className="min-h-screen font-sans bg-white text-[#46718e]">
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

      <section className="max-w-7xl mx-auto px-4 py-6">
        <h1 className="text-3xl font-bold mb-6">Cari dan Temukan Event Seru</h1>

        {/* Search + Filter Form */}
        <form className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          <input
            type="text"
            name="search"
            placeholder="Cari event..."
            className="col-span-1 md:col-span-2 border border-gray-300 rounded-lg px-4 py-2 w-full"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <select
            className="border border-gray-300 rounded-lg px-4 py-2 w-full"
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
          >
            <option value="">Semua Kategori</option>
            {categories.map((cat) => (
              <option key={cat} value={cat}>
                {cat}
              </option>
            ))}
          </select>
          <select
            className="border border-gray-300 rounded-lg px-4 py-2 w-full"
            value={selectedLocation}
            onChange={(e) => setSelectedLocation(e.target.value)}
          >
            <option value="">Semua Lokasi</option>
            {locations.map((loc) => (
              <option key={loc} value={loc}>
                {loc}
              </option>
            ))}
          </select>
        </form>

        {/* Event List */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {filteredEvents.map((event) => (
            <div
              key={event.id}
              className="bg-white rounded-2xl shadow-md hover:shadow-lg overflow-hidden transition-all"
            >
              <Image
                src={event.image}
                alt={event.name}
                width={500}
                height={300}
                className="w-full h-48 object-cover"
              />
              <div className="p-4 space-y-2">
                <h2 className="text-lg font-semibold text-[#3B6377]">
                  {event.name}
                </h2>
                <p className="text-sm text-gray-500">
                  {new Date(event.start_date).toLocaleDateString("id-ID", {
                    weekday: "long",
                    day: "numeric",
                    month: "long",
                    year: "numeric",
                  })}{" "}
                  • {event.location}
                </p>
                <p className="text-sm text-gray-600">
                  {event.description || "Deskripsi event belum tersedia."}
                </p>

                <div className="flex items-center justify-between mt-4">
                  <p className="text-[#f8b071] font-bold">
                    {event.price > 0
                      ? `Rp ${event.price.toLocaleString()}`
                      : "Gratis"}
                  </p>
                  <Link
                    href={`/events/${event.id}`}
                    className="bg-[#f8b071] text-white px-4 py-2 rounded-md hover:bg-[#f59e42] transition text-sm"
                  >
                    Beli Tiket
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}
