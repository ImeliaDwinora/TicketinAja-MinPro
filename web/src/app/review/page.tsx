"use client";

import Image from "next/image";
import { useEffect, useState } from "react";

interface Review {
  id: string;
  comment: string;
  rating: number;
  created_at: string;
  user: {
    name: string;
    image: string;
    location: string;
  };
  event: {
    name: string;
  };
}

export default function ReviewUser() {
  const [reviews, setReviews] = useState<Review[]>([]);

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const res = await fetch("http://localhost:8000/api/reviews");
        const data: Review[] = await res.json();
        setReviews(data);
      } catch (error) {
        console.error("Gagal mengambil review:", error);
      }
    };

    fetchReviews();
  }, []);

  return (
    <section className="py-10 px-4 bg-white">
      <h2 className="text-[#3B6377] text-center mb-8 text-3xl md:text-5xl font-bold drop-shadow-lg">
        Apa Kata Mereka?
      </h2>
      <p className="text-md md:text-lg drop-shadow-md text-center mb-10">
        Dari konser seru hingga seminar inspiratif, semua ada di Ticketin.Aja 🎫
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {reviews.slice(0, 6).map((item) => (
          <div key={item.id} className="p-4 border rounded-lg shadow-sm">
            <p className="text-gray-700 italic mb-4">“{item.comment}”</p>
            <div className="flex items-center gap-3">
              <div className="relative w-10 h-10">
                <Image
                  src={
                    item.user.image?.trim() ? item.user.image : "/concert.jpg"
                  }
                  alt={item.user.name}
                  fill
                  className="rounded-full object-cover"
                />
              </div>
              <div>
                <p className="text-sm font-semibold text-[#3B6377]">
                  {item.user.name}
                </p>
                <p className="text-xs text-gray-500">
                  {item.user.location} • Rating ⭐ {item.rating}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
