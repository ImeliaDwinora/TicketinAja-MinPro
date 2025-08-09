"use client";

import Navbarheader from "@/components/navbar";
import { useState } from "react";
import { toast } from "react-toastify";

export default function CreateEventForm({ claims }: any) {
  const [form, setForm] = useState({
    name: "",
    description: "",
    image: null as File | null,
    price: 0,
    startDate: "",
    endDate: "",
    seats: 0,
    organizerId: claims.id,
    location: "",
    category: "",
  });
  const [isFree, setIsfree] = useState<"Free" | "Paid" | null>(null);

  const [ticketTypes, setTicketTypes] = useState([
    { name: "REGULER", price: 0, stock: 0 },
    { name: "VIP", price: 0, stock: 0 },
    { name: "VVIP", price: 0, stock: 0 },
  ]);

  const locations = [
    "Jakarta",
    "Bandung",
    "Surabaya",
    "Yogyakarta",
    "Denpasar",
  ];

  const categories = ["MUSIC", "COMMUNITY", "FAMILY", "EDUCATION", "WELLNESS"];

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleTicketChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    index: number
  ) => {
    const { name, value } = e.target;

    const updatedTickets = [...ticketTypes];
    updatedTickets[index] = {
      ...updatedTickets[index],
      [name]: name === "price" || name === "stock" ? Number(value) : value,
    };

    setTicketTypes(updatedTickets);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!form.image) {
      alert("Image is required");
      return;
    }

    const formData = new FormData();
    formData.append("image", form.image);
    formData.append("name", form.name);
    formData.append("description", form.description);
    formData.append("price", form.price.toString());
    formData.append("startDate", form.startDate);
    formData.append("endDate", form.endDate);
    formData.append("seats", form.seats.toString());
    formData.append("organizerId", form.organizerId);
    formData.append("location", form.location);
    formData.append("category", form.category);
    formData.append("is_free", isFree === "Free" ? "true" : "false");

    const filter = ticketTypes.filter((element) => element.price > 0);

    try {
      const res = await fetch("http://localhost:8000/api/event", {
        method: "POST",
        body: formData,
      });

      if (!res.ok) throw new Error("Failed to create event");

      const event = await res.json();
      const eventId = event.id;
      const response = await fetch("http://localhost:8000/api/ticket", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          eventId,
          data: filter,
        }),
      });

      toast.success("Event created!");
    } catch (error) {
      console.error(error);
      toast.error("Failed to create event");
    }
  };

  return (
    <>
      <Navbarheader />
      <form
        onSubmit={handleSubmit}
        className="max-w-3xl mx-auto p-6 bg-white shadow-md rounded-xl space-y-6 mt-6"
      >
        <h2 className="text-2xl font-semibold text-gray-800">Create Event</h2>

        {/* Event Info */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <FormInput
            label="Event Name"
            name="name"
            value={form.name}
            onChange={handleChange}
          />
          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Upload Image
            </label>
            <input
              type="file"
              name="image"
              accept="image/*"
              onChange={(e) => {
                const file = e.target.files?.[0];
                if (file) setForm((prev) => ({ ...prev, image: file }));
              }}
              className="w-full border border-gray-300 rounded-md px-3 py-2"
              required
            />
          </div>

          <FormInput
            label="Start Date"
            name="startDate"
            type="datetime-local"
            value={form.startDate}
            onChange={handleChange}
          />
          <FormInput
            label="End Date"
            name="endDate"
            type="datetime-local"
            value={form.endDate}
            onChange={handleChange}
          />

          {/* Select Location */}
          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Location
            </label>
            <select
              name="location"
              value={form.location}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-md px-4 py-2"
              required
            >
              <option value="">Pilih Lokasi</option>
              {locations.map((city) => (
                <option key={city} value={city}>
                  {city}
                </option>
              ))}
            </select>
          </div>

          {/* Select Category */}
          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Category
            </label>
            <select
              name="category"
              value={form.category}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-md px-4 py-2"
              required
            >
              <option value="">Pilih Category</option>
              {categories.map((cat) => (
                <option key={cat} value={cat}>
                  {cat}
                </option>
              ))}
            </select>
          </div>

          {/* Description */}
          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Description
            </label>
            <textarea
              name="description"
              value={form.description}
              onChange={handleChange}
              rows={4}
              className="w-full border border-gray-300 rounded-md px-3 py-2 resize-none"
              required
            />
          </div>
        </div>
        <div>
          <span className="block text-sm font-medium mb-1">Tipe Event</span>
          <div className="flex items-center gap-4">
            <label className="flex items-center gap-2 text-sm">
              <input
                type="radio"
                name="isFree"
                value="Free"
                onChange={() => setIsfree("Free")}
                checked={isFree === "Free"}
                className="accent-amber-400"
              />
              Free
            </label>
            <label className="flex items-center gap-2 text-sm">
              <input
                type="radio"
                name="isFree"
                value="Paid"
                onChange={() => setIsfree("Paid")}
                checked={isFree === "Paid"}
                className="accent-amber-400"
              />
              Paid
            </label>
          </div>
        </div>

        {isFree === "Paid" && (
          <div>
            <h3 className="text-lg font-medium text-gray-800 mb-2">
              Ticket Type
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div>
                <h4>REGULER</h4>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Price (IDR)
                </label>
                <input
                  type="number"
                  name="price"
                  value={ticketTypes[0].price}
                  onChange={(e) => handleTicketChange(e, 0)}
                  className="w-full border border-gray-300 rounded-md px-3 py-2"
                  placeholder="0"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Stock
                </label>
                <input
                  type="number"
                  name="stock"
                  value={ticketTypes[0].stock}
                  onChange={(e) => handleTicketChange(e, 0)}
                  className="w-full border border-gray-300 rounded-md px-3 py-2"
                  placeholder="50"
                  required
                />
              </div>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div>
                <h4>VIP</h4>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Price (IDR)
                </label>
                <input
                  type="number"
                  name="price"
                  value={ticketTypes[1].price}
                  onChange={(e) => handleTicketChange(e, 1)}
                  className="w-full border border-gray-300 rounded-md px-3 py-2"
                  placeholder="0"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Stock
                </label>
                <input
                  type="number"
                  name="stock"
                  value={ticketTypes[1].stock}
                  onChange={(e) => handleTicketChange(e, 1)}
                  className="w-full border border-gray-300 rounded-md px-3 py-2"
                  placeholder="50"
                  required
                />
              </div>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div>
                <h4>VVIP</h4>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Price (IDR)
                </label>
                <input
                  type="number"
                  name="price"
                  value={ticketTypes[2].price}
                  onChange={(e) => handleTicketChange(e, 2)}
                  className="w-full border border-gray-300 rounded-md px-3 py-2"
                  placeholder="0"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Stock
                </label>
                <input
                  type="number"
                  name="stock"
                  value={ticketTypes[2].stock}
                  onChange={(e) => handleTicketChange(e, 2)}
                  className="w-full border border-gray-300 rounded-md px-3 py-2"
                  placeholder="50"
                  required
                />
              </div>
            </div>
          </div>
        )}

        {/* Submit */}
        <button
          type="submit"
          className="w-full bg-[#f8b071] text-white px-4 py-2 hover:bg-[#f59e42] transition text-sm font-medium rounded-md"
        >
          Create Event
        </button>
      </form>
    </>
  );
}

function FormInput({
  label,
  name,
  value,
  onChange,
  type = "text",
  className = "",
}: {
  label: string;
  name: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  type?: string;
  className?: string;
}) {
  return (
    <div className={className}>
      <label className="block text-sm font-medium text-gray-700 mb-1">
        {label}
      </label>
      <input
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        className="w-full border border-gray-300 rounded-md px-3 py-2"
        required
      />
    </div>
  );
}
