"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import Navbarheader from "@/components/navbar";

export default function PaymentPage() {
  const searchParams = useSearchParams();
  const eventId = searchParams.get("eventId");
  const [event, setEvent] = useState<any>(null);
  const [ticketCount, setTicketCount] = useState(1);
  const [useVoucher, setUseVoucher] = useState(false);
  const [usePoint, setUsePoint] = useState(false);
  const [useCoupon, setUseCoupon] = useState(false);

  const paymentDeadline = new Date(Date.now() + 2 * 60 * 60 * 1000); // 2 jam dari sekarang

  useEffect(() => {
    if (eventId) {
      fetch(`http://localhost:8000/api/event/${eventId}`)
        .then((res) => res.json())
        .then((data) => setEvent(data))
        .catch((err) => console.error("Failed to fetch event:", err));
    }
  }, [eventId]);

  if (!event) return <p className="text-center py-10">Loading...</p>;

  const basePrice = event.price || 0;
  const voucherDiscount = useVoucher ? 50000 : 0;
  const pointDiscount = usePoint ? 25000 : 0;
  const couponDiscount = useCoupon ? 15000 : 0;

  const totalPrice = Math.max(
    ticketCount * basePrice - voucherDiscount - pointDiscount - couponDiscount,
    0
  );

  return (
    <main className="min-h-screen bg-white text-[#46718e] font-sans">
      {/* NAVBAR */}
      <Navbarheader />

      {/* EVENT INFO */}
      <section className="bg-gray-100 rounded-xl max-w-6xl mx-auto px-6 py-6 space-y-6 shadow">
        <div className="flex flex-col sm:flex-row gap-4">
          <Image
            src={event.image || "/placeholder.jpg"}
            alt={event.name}
            width={300}
            height={200}
            className="rounded-lg object-cover w-full sm:w-1/3"
          />
          <div className="flex-1">
            <h2 className="text-2xl font-semibold">{event.name}</h2>
            <p className="text-sm text-gray-500">
              {event.location} •{" "}
              {new Date(event.date).toLocaleDateString("id-ID")}
            </p>
            <p className="text-lg mt-4 font-bold">
              Rp {basePrice.toLocaleString("id-ID")}
            </p>
            <p className="text-sm text-red-500 mt-2">
              Batas waktu pembayaran:{" "}
              {paymentDeadline.toLocaleTimeString("id-ID")}
            </p>
          </div>
        </div>
      </section>

      <div className="max-w-4xl mx-auto px-6 py-6 space-y-6">
        {/* TICKET COUNT */}
        <div className="border-b pb-3 flex justify-between items-center">
          <span>Jumlah Tiket</span>
          <div className="flex items-center gap-2">
            <button
              className="bg-gray-200 px-3 py-1 rounded-full"
              onClick={() => setTicketCount(Math.max(1, ticketCount - 1))}
            >
              -
            </button>
            <span className="min-w-[24px] text-center">{ticketCount}</span>
            <button
              className="bg-gray-200 px-3 py-1 rounded-full"
              onClick={() => setTicketCount(ticketCount + 1)}
            >
              +
            </button>
          </div>
        </div>

        {/* DISCOUNT */}
        <div className="space-y-2">
          <label className="flex items-center gap-2">
            <input
              type="checkbox"
              checked={useVoucher}
              onChange={(e) => setUseVoucher(e.target.checked)}
            />
            Gunakan Voucher (potongan Rp 50.000)
          </label>
          <label className="flex items-center gap-2">
            <input
              type="checkbox"
              checked={usePoint}
              onChange={(e) => setUsePoint(e.target.checked)}
            />
            Gunakan Point (potongan Rp 25.000)
          </label>
          <label className="flex items-center gap-2">
            <input
              type="checkbox"
              checked={useCoupon}
              onChange={(e) => setUseCoupon(e.target.checked)}
            />
            Gunakan Kupon (potongan Rp 15.000)
          </label>
        </div>

        {/* TOTAL */}
        <div className="flex justify-between items-center border-b py-3 font-bold text-lg">
          <span>Total Bayar</span>
          <span>Rp {totalPrice.toLocaleString("id-ID")}</span>
        </div>

        {/* PAYMENT SECTION */}
        <section className="py-10">
          <h1 className="text-3xl font-bold text-center text-[#f8b071] mb-6">
            Pembayaran Tiket
          </h1>

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

          <button className="w-full bg-[#f8b071] hover:opacity-90 text-white font-semibold py-3 rounded-xl">
            Konfirmasi Pembayaran
          </button>
        </section>
      </div>
    </main>
  );
}
