"use client";

import Image from "next/image";
import Link from "next/link";
import { useState, useEffect } from "react";
import Navbarheader from "@/components/navbar";

// Enum untuk kategori event
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

export default function EventsPage({ claims }) {
  const [events, setEvents] = useState<Event[]>([]);
  const [locations, setLocations] = useState<string[]>([]);
  const [search, setSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedLocation, setSelectedLocation] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [pages, setPages] = useState(0);
  const [totalPage, setTotalPage] = useState(1);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const res = await fetch(
          `http://localhost:8000/api/event?page=${currentPage}&limit=9`
        );
        const result = await res.json();

        setEvents(result.data);
        setCurrentPage(result.page);
        setTotalPage(result.totalPage);

        const uniqueLocations = [
          ...new Set(result.data.map((event: any) => String(event.location))),
        ] as string[];

        setLocations(uniqueLocations);
      } catch (error) {
        console.error("Gagal mengambil event:", error);
      }
    };

    fetchEvents();
  }, [currentPage]);

  function handlePrev() {
    if (currentPage > 1) {
      setCurrentPage((prev) => prev - 1);
    }
  }
  function handleNext() {
    if (currentPage < totalPage) {
      setCurrentPage((prev) => prev + 1);
    }
  }

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
      <Navbarheader claims={claims} />

      <section className="max-w-7xl mx-auto px-4 py-6">
        <h1 className="text-3xl font-bold mb-3">Cari dan Temukan Event Seru</h1>
        <p className="mb-3">
          Klik login atau register untuk lihat detail event{" "}
        </p>

        {/* Filter Form */}
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
        {filteredEvents.length === 0 ? (
          <div className="text-center text-gray-500 text-lg py-10">
            Tidak ada event yang ditemukan. Coba ubah kata kunci atau filter.
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
              {filteredEvents.map((event) => (
                <div
                  key={event.id}
                  className="bg-white rounded-2xl shadow-md hover:shadow-lg overflow-hidden transition-all"
                >
                  <Image
                    src={event.image?.trim() ? event.image : "/concert.jpg"}
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

                    {claims !== null && (
                      <div className="flex items-center justify-between mt-4">
                        <Link
                          href={`/event/${event.id}`}
                          className="bg-[#f8b071] text-white px-4 py-2 rounded-md hover:bg-[#f59e42] transition text-sm"
                        >
                          Lihat Event
                        </Link>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>

            {/* Pagination */}
            <div className="flex flex-row items-center justify-center p-10 gap-2">
              <button
                className="bg-[#f8b071] hover:bg-[#f8b071] text-white font-semibold transitionp-2 rounded-2xl p-2"
                onClick={handlePrev}
              >
                Prev
              </button>
              <span>
                Page {currentPage} of {totalPage}
              </span>
              <button
                className="bg-[#f8b071] hover:bg-[#f8b071] text-white font-semibold transitionp-2 rounded-2xl p-2"
                onClick={handleNext}
              >
                Next
              </button>
            </div>
          </>
        )}
      </section>
    </main>
  );
}
