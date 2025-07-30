import Image from "next/image";
import Link from "next/link";

export default function EventsPage() {
  const categories = ["Musik", "Teknologi", "Keagamaan", "Olahraga"];
  const locations = ["Jakarta", "Bandung", "Surabaya", "Bali"];

  const events = [
    {
      id: "1",
      name: "JavaScript Conference 2025",
      category: "Teknologi",
      location: "Jakarta",
      price: 100000,
      start_date: "2025-09-15",
      image: "https://source.unsplash.com/600x400/?conference,event",
    },
    {
      id: "2",
      name: "Tech Startup Meetup",
      category: "Teknologi",
      location: "Bandung",
      price: 0,
      start_date: "2025-10-01",
      image: "https://source.unsplash.com/600x400/?startup,meeting",
    },
    {
      id: "3",
      name: "Music Festival 2025",
      category: "Musik",
      location: "Bali",
      price: 250000,
      start_date: "2025-12-10",
      image: "https://source.unsplash.com/600x400/?concert,music",
    },
  ];

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
          />
          <select className="border border-gray-300 rounded-lg px-4 py-2 w-full">
            <option value="">Semua Kategori</option>
            {categories.map((cat) => (
              <option key={cat} value={cat}>
                {cat}
              </option>
            ))}
          </select>
          <select className="border border-gray-300 rounded-lg px-4 py-2 w-full">
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
          {events.map((event) => (
            <Link
              key={event.id}
              href={`/events/${event.id}`}
              className="bg-white rounded-2xl shadow-md hover:shadow-lg overflow-hidden transition-all"
            >
              <Image
                src={event.image}
                alt={event.name}
                width={500}
                height={300}
                className="w-full h-48 object-cover"
              />
              <div className="p-4">
                <h2 className="text-xl font-semibold">{event.name}</h2>
                <p className="text-sm text-gray-500">{event.location}</p>
                <p className="text-sm mt-1">
                  {new Date(event.start_date).toLocaleDateString("id-ID", {
                    day: "numeric",
                    month: "long",
                    year: "numeric",
                  })}
                </p>
                <p className="mt-2 font-bold">
                  {event.price > 0
                    ? `Rp ${event.price.toLocaleString()}`
                    : "Gratis"}
                </p>
              </div>
            </Link>
          ))}
        </div>
      </section>
    </main>
  );
}
