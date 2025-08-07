"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import ReviewUser from "./review/page";
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

export default function Home() {
  const [events, setEvents] = useState<Event[]>([]);

  useEffect(() => {
    const fetchUpcomingEvents = async () => {
      try {
        const res = await fetch(
          "http://localhost:8000/api/event?page=1&limit=3"
        );
        const json = await res.json();

        const fetchedEvents = json.data?.events || json.data || [];

        setEvents(Array.isArray(fetchedEvents) ? fetchedEvents : []);
      } catch (error) {
        console.error("Failed to fetch events:", error);
      }
    };

    fetchUpcomingEvents();
  }, []);

  return (
    <div className="flex flex-col min-h-screen font-sans bg-white text-[#46718e]">
      {/* NAVBAR */}
      <Navbarheader />
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
          <h2 className="text-2xl font-bold text-center mb-6 text-[#3B6377]">
            Event Akan Datang
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {events.map((event) => (
              <div
                key={event.id}
                className="bg-white shadow-md rounded-xl overflow-hidden hover:shadow-lg transition"
              >
                <div className="relative w-full h-48">
                  <Image
                    src={event.image?.trim() ? event.image : "/concert.jpg"}
                    alt="Event Image"
                    fill
                    className="object-cover"
                    priority
                  />
                </div>
                <div className="p-4 space-y-2">
                  <h3 className="text-lg font-semibold text-[#3B6377]">
                    {event.name}
                  </h3>
                  <p className="text-sm text-gray-500">
                    {new Date(event.start_date).toLocaleDateString("id-ID", {
                      weekday: "long",
                      day: "numeric",
                      month: "long",
                      year: "numeric",
                    })}{" "}
                    • {event.location}
                  </p>
                  <p className="text-sm text-gray-600">{event.description}</p>
                  <div className="flex items-center justify-between mt-4">
                    <Link
                      href={`/event/${event.id}`}
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
        <ReviewUser />
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
