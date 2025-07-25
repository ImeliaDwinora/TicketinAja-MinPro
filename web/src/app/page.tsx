import Image from "next/image";

export default function Home() {
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
            <a href="#" className="hover:text-[#f8b071] transition-colors">
              Kategori
            </a>
            <a href="#" className="hover:text-[#f8b071] transition-colors">
              Beranda
            </a>
            <a href="#" className="hover:text-[#f8b071] transition-colors">
              Tentang
            </a>
          </nav>
          <div className="hidden md:flex flex-row gap-3">
            <button className="text-[16px] bg-white border rounded-xl px-4 py-2 text-[#f8b071] hover:bg-[#f8b071] hover:text-white transition">
              Buat Acara
            </button>
            <button className="text-[16px] bg-[#f8b071] border rounded-xl px-4 py-2 text-white hover:opacity-90 transition">
              Masuk
            </button>
          </div>
        </div>
        <div className="w-full px-4 pb-4">
          <div className="relative w-full max-w-xl mx-auto">
            <input
              type="text"
              placeholder="Cari event seru..."
              className="w-full pl-10 pr-4 py-2 rounded-xl border border-gray-300 shadow-sm focus:outline-none focus:ring-2 focus:ring-[#f8b071] text-sm"
            />
            <svg
              className="absolute left-3 top-2.5 w-5 h-5 text-gray-400"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M21 21l-4.35-4.35m0 0A7.5 7.5 0 1116.65 6.65a7.5 7.5 0 010 10.6z"
              />
            </svg>
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
          Acara Unggulan
        </h2>
        <p className="text-md md:text-lg drop-shadow-md">
          Dari konser seru hingga seminar inspiratif, semua ada di Ticketin.Aja
          🎫
        </p>
        <div className="grid grid-cols-3 md:grid-cols-2 lg:grid-cols-5 text-center gap-1">
          {[
            "MUSIC 🎵",
            "COMMUNITY 👩🏻‍🤝‍🧑🏽",
            "FAMILY 👨‍👨‍👦‍👦",
            "EDUCATION 📚",
            "WELLNESS 🏏",
          ].map((category, index) => (
            <div
              key={index}
              className="bg-[#f8b071] shadow rounded-lg p-4 text-sm font-medium hover:bg-white"
            >
              {category}
            </div>
          ))}
        </div>

        {/* EVENT CARDS */}
        <section className="py-10 px-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {[1, 2, 3].map((_, i) => (
              <div
                key={i}
                className="bg-white shadow-md rounded-xl overflow-hidden hover:shadow-lg transition"
              >
                <div className="relative w-full h-48">
                  <Image
                    src="https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e"
                    alt="Event Image"
                    fill
                    className="object-cover"
                    priority
                  />
                </div>
                <div className="p-4 space-y-2">
                  <h2 className="text-lg font-semibold text-[#3B6377]">
                    Festival Musik Jakarta 2025
                  </h2>
                  <p className="text-sm text-gray-500">
                    Sabtu, 30 Agustus 2025 • Jakarta
                  </p>
                  <p className="text-sm text-gray-600">
                    Saksikan penampilan musisi favoritmu di malam penuh cahaya!
                  </p>
                  <p className="text-sm text-gray-600">⭐Rating 5.0</p>
                  <div className="flex items-center justify-between mt-4">
                    <p className="text-[#f8b071] font-bold">Rp 300.000</p>
                    <button className="bg-[#f8b071] text-white px-4 py-2 rounded-md hover:bg-[#f59e42] transition text-sm">
                      Beli Tiket
                    </button>
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
      <footer className="bg-[#46718e] text-white text-center p-4 font-cherry text-sm">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 justify-end">
          Made with ❤️ by Ticketin.Aja © 2025. Made with ❤️ by Ticketin.Aja ©
          2025.
        </div>
      </footer>
    </div>
  );
}
