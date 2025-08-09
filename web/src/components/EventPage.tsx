"use client";

import Image from "next/image";
import Link from "next/link";
import { useState, useEffect } from "react";
import Navbarheader from "@/components/navbar";

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
const allLocations = [
  "Jakarta",
  "Bandung",
  "Surabaya",
  "Yogyakarta",
  "Denpasar",
];

export default function EventsPage({ claims }) {
  const [events, setEvents] = useState<Event[]>([]);
  const [search, setSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedLocation, setSelectedLocation] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPage, setTotalPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchEvents = async () => {
      setIsLoading(true);
      try {
        // Build query parameters
        const params = new URLSearchParams();
        params.append("page", currentPage.toString());
        params.append("limit", "9");
        if (search) params.append("search", search);
        if (selectedCategory) params.append("category", selectedCategory);
        if (selectedLocation) params.append("location", selectedLocation);

        const res = await fetch(
          `http://localhost:8000/api/event?${params.toString()}`
        );
        const result = await res.json();

        setEvents(result.data);
        setTotalPage(result.totalPage);
      } catch (error) {
        console.error("Failed to fetch events:", error);
      } finally {
        setIsLoading(false);
      }
    };

    // Add debounce for search
    const timer = setTimeout(() => {
      fetchEvents();
    }, 300);

    return () => clearTimeout(timer);
  }, [currentPage, search, selectedCategory, selectedLocation]);

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

  return (
    <main className="min-h-screen font-sans bg-white text-[#46718e]">
      <Navbarheader claims={claims} />

      <section className="max-w-7xl mx-auto px-4 py-6">
        <h1 className="text-3xl font-bold mb-3">Cari dan Temukan Event Seru</h1>
        <p className="mb-3">
          Klik login atau register untuk lihat detail event
        </p>

        {/* Filter Form - Now triggers API calls */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          <input
            type="text"
            placeholder="Cari event..."
            className="col-span-1 md:col-span-2 border border-gray-300 rounded-lg px-4 py-2 w-full"
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
              setCurrentPage(1); // Reset to first page when search changes
            }}
          />

          <select
            className="border border-gray-300 rounded-lg px-4 py-2 w-full"
            value={selectedCategory}
            onChange={(e) => {
              setSelectedCategory(e.target.value);
              setCurrentPage(1);
            }}
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
            onChange={(e) => {
              setSelectedLocation(e.target.value);
              setCurrentPage(1);
            }}
          >
            <option value="">Semua Lokasi</option>
            {allLocations.map((loc) => (
              <option key={loc} value={loc}>
                {loc}
              </option>
            ))}
          </select>
        </div>

        {/* Event List */}
        {isLoading ? (
          <div className="text-center text-gray-500 text-lg py-10">
            Memuat event...
          </div>
        ) : events.length === 0 ? (
          <div className="text-center text-gray-500 text-lg py-10">
            Tidak ada event yang ditemukan. Coba ubah kata kunci atau filter.
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
              {events.map((event) => (
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

                    <p className="text-sm text-gray-600 line-clamp-2">
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
                className="bg-[#f8b071] hover:bg-[#f59e42] text-white font-semibold rounded-2xl p-2 disabled:opacity-50"
                onClick={handlePrev}
                disabled={currentPage === 1 || isLoading}
              >
                Prev
              </button>
              <span>
                Page {currentPage} of {totalPage}
              </span>
              <button
                className="bg-[#f8b071] hover:bg-[#f59e42] text-white font-semibold rounded-2xl p-2 disabled:opacity-50"
                onClick={handleNext}
                disabled={currentPage === totalPage || isLoading}
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
