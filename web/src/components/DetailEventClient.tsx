"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import Navbarheader from "./navbar";

export default function DetailEventClient({ event }: { event: any }) {
  const [selectedTicketId, setSelectedTicketId] = useState("default");
  const [selectedPrice, setSelectedPrice] = useState(event.price); // default price

  useEffect(() => {
    if (selectedTicketId === "default") {
      setSelectedPrice(event.price);
    } else {
      const selected = event.TicketType?.find((t) => t.id === selectedTicketId);
      if (selected) setSelectedPrice(selected.price);
    }
  }, [selectedTicketId, event]);
  return (
    <div className="flex flex-col min-h-screen font-sans bg-white text-[#46718e]">
      <Navbarheader />

      {/* HERO */}
      <main className="relative flex-grow px-4 min-h-[60vh] overflow-hidden m-10 rounded-xl">
        <div className="absolute inset-0 z-0">
          <Image
            src={event.image?.trim() ? event.image : "/concert.jpg"}
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
        <div className="space-y-2">
          <h2 className="text-2xl font-bold">{event.title}</h2>
          <p className="text-md">{event.description}</p>
          <p className="text-sm">📍 {event.location}</p>
          <p className="text-sm">
            🕒{" "}
            {new Date(event.start_date).toLocaleDateString("id-ID", {
              day: "2-digit",
              month: "long",
              year: "numeric",
            })}{" "}
            -{" "}
            {new Date(event.end_date).toLocaleDateString("id-ID", {
              day: "2-digit",
              month: "long",
              year: "numeric",
            })}
          </p>
          <p className="text-sm">💺 {event.quota} Kursi</p>
          <div className="w-full sm:w-auto">
            <label className="block mb-2 text-sm font-medium">
              Pilih Tipe Tiket:
            </label>
            {/* <select
              className="border rounded-md px-4 py-2 w-full text-sm"
              value={selectedTicketId}
              onChange={(e) => setSelectedTicketId(e.target.value)}
            >
              <option value="default">
                Reguler - Rp{event.price.toLocaleString("id-ID")}
              </option>
              {event.TicketType?.map((ticket) => (
                <option key={ticket.id} value={ticket.id}>
                  {ticket.name} - Rp{ticket.price.toLocaleString("id-ID")}
                </option>
              ))}
            </select> */}
          </div>
        </div>

        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 border-t pt-6">
          <div>
            <h2 className="text-xl font-semibold">Harga Tiket</h2>
            {/* <p className="text-lg font-bold text-[#f8b071]">
              Rp {selectedPrice.toLocaleString("id-ID")}
            </p> */}
          </div>
          <Link
            href={`/payment?eventId=${event.id}&ticketId=${selectedTicketId}`}
            className="bg-[#f8b071] text-white px-6 py-2 rounded-md hover:bg-[#f59e42] transition text-sm"
          >
            Beli Tiket
          </Link>
        </div>
      </section>
    </div>
  );
}
