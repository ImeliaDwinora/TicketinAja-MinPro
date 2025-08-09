"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import Image from "next/image";
import Navbarheader from "@/components/navbar";

export default function PaymentPageComponent({ claims }: any) {
  const searchParams = useSearchParams();
  const eventId = searchParams.get("eventId");
  const ticketId = searchParams.get("ticketId");
  const [transactionId, setTransactionId] = useState("");
  const userId = claims?.id;
  const [event, setEvent] = useState<any>(null);
  const [vouchers, setVouchers] = useState<any>(null);
  const [ticketCount, setTicketCount] = useState(1);
  const [selectedVouchers, setSelectedVouchers] = useState<string[]>([]);
  const [upload, setUpload] = useState(false);
  const [paymentDeadline, setPaymentDeadline] = useState(new Date(Date.now()));
  const [form, setForm] = useState({
    image: null as File | null,
  });
  const [isFinish, setIsFinish] = useState(false);
  const [remainingTime, setRemainingTime] = useState<number>(0);

  useEffect(() => {
    if (!upload || !paymentDeadline) return;

    const interval = setInterval(() => {
      const now = new Date().getTime();
      const distance = paymentDeadline.getTime() - now;

      if (distance <= 0) {
        clearInterval(interval);
        setRemainingTime(0);
      } else {
        setRemainingTime(distance);
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [paymentDeadline, upload]);

  useEffect(() => {
    const fetchEvent = async () => {
      await fetch(`http://localhost:8000/api/event/${eventId}`)
        .then((res) => res.json())
        .then((data) => setEvent(data))
        .catch((err) => console.error("Failed to fetch event:", err));
    };
    const fetchVoucher = async () => {
      await fetch(`http://localhost:8000/api/voucher/${eventId}`)
        .then((res) => res.json())
        .then((data) => setVouchers(data))
        .catch((err) => console.error("Failed to fetch voucher:", err));
    };
    fetchEvent();
    fetchVoucher();
  }, [eventId]);

  if (!event) return <p className="text-center py-10">Loading...</p>;

  const basePrice = event?.Ticket?.find(
    (element) => element.id === ticketId
  )?.price;

  const toggleVoucher = (id: string) => {
    setSelectedVouchers((prev) =>
      prev.includes(id) ? prev.filter((vid) => vid !== id) : [...prev, id]
    );
  };
  const totalVoucherDiscount = vouchers
    .filter((v) => selectedVouchers.includes(v.id))
    .reduce((acc, v) => acc + v.discount, 0);

  const totalPrice = Math.max(
    ticketCount * basePrice -
      (totalVoucherDiscount * ticketCount * basePrice) / 100,
    0
  );

  const onSubmit = async () => {
    const payload = {
      userId: userId,
      eventId: eventId,
      ticketId: ticketId,
      quantity: ticketCount,
      finalPrice: totalPrice,
    };
    try {
      const res = await fetch("http://localhost:8000/api/transaction", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!res.ok) throw new Error("Transaction failed");

      const response = await res.json();
      console.log("Transaction Success:", response);
      setTransactionId(response.id);
      setUpload(true);
      const createdAt = new Date(response.created_at);

      const expiredAt = new Date(createdAt.getTime() + 2 * 60 * 60 * 1000);
      setPaymentDeadline(expiredAt);
    } catch (err) {
      console.error("Transaction error:", err);
    }
  };

  const onSubmitImage = async () => {
    if (!form.image) return;
    console.log(transactionId);
    const formData = new FormData();
    formData.append("image", form.image);
    formData.append("transactionId", transactionId);

    try {
      const res = await fetch(
        "http://localhost:8000/api/transaction/paymentproof",
        {
          method: "POST",
          body: formData,
        }
      );

      if (!res.ok) throw new Error("Failed to create event");

      const paymentProof = await res.json();
      setIsFinish(true);
    } catch (error) {
      console.error(error);
      alert("Failed to create payment proof");
    }
  };

  const formatTime = (ms: number) => {
    const totalSeconds = Math.floor(ms / 1000);
    const hours = Math.floor(totalSeconds / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const seconds = totalSeconds % 60;

    const pad = (n: number) => n.toString().padStart(2, "0");
    return `${pad(hours)}:${pad(minutes)}:${pad(seconds)}`;
  };

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
              Rp {basePrice?.toLocaleString("id-ID")}
            </p>
            {upload && (
              <p className="text-sm text-red-500 mt-2">
                Sisa waktu pembayaran: {formatTime(remainingTime)}
              </p>
            )}
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
        {vouchers.map((voucher) => (
          <label key={voucher.id} className="flex items-center gap-2">
            <input
              type="checkbox"
              checked={selectedVouchers.includes(voucher.id)}
              onChange={() => toggleVoucher(voucher.id)}
            />
            <span>
              {voucher.code} - Diskon
              {voucher.discount?.toLocaleString("id-ID")}%
            </span>
          </label>
        ))}

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

          <button
            className="w-full bg-[#f8b071] hover:opacity-90 text-white font-semibold py-3 rounded-xl mb-5"
            onClick={onSubmit}
          >
            Konfirmasi Pembayaran
          </button>

          {upload && (
            <div>
              <div className="mb-6">
                <h3 className="text-lg font-semibold mb-2">
                  Unggah Bukti Pembayaran
                </h3>
                <input
                  type="file"
                  name="image"
                  accept="image/*"
                  onChange={(e) => {
                    const file = e.target.files?.[0];
                    if (file) setForm((prev) => ({ ...prev, image: file }));
                  }}
                  className="block w-full border border-gray-300 rounded-lg p-2"
                />
              </div>
              <button
                className="w-full bg-[#f8b071] hover:opacity-90 text-white font-semibold py-3 rounded-xl mt-4"
                onClick={onSubmitImage}
              >
                Unggah Bukti Pembayaran
              </button>
            </div>
          )}
          {isFinish && <p>WAITING FOR CONFIRMATION</p>}
        </section>
      </div>
    </main>
  );
}
