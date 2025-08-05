"use client";

import { useState } from "react";

export default function CreateEventForm() {
  const [form, setForm] = useState({
    name: "",
    description: "",
    image: "",
    price: 0,
    startDate: "",
    endDate: "",
    seats: 0,
    organizerId: "",
  });

  const [ticketTypes, setTicketTypes] = useState([{ name: "", price: 0 }]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleTicketChange = (
    index: number,
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const updated = [...ticketTypes];
    updated[index][e.target.name] =
      e.target.name === "price" ? Number(e.target.value) : e.target.value;
    setTicketTypes(updated);
  };

  const addTicketType = () => {
    setTicketTypes([...ticketTypes, { name: "", price: 0 }]);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const payload = { ...form, ticketTypes };
    try {
      const res = await fetch("http://localhost:8000/api/event", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const data = await res.json();
      alert("Event created!");
    } catch (error) {
      console.error(error);
      alert("Failed to create event");
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-3xl mx-auto p-6 bg-white shadow-md rounded-xl space-y-6"
    >
      <h2 className="text-2xl font-semibold text-gray-800">Create Event</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Event Name
          </label>
          <input
            type="text"
            name="name"
            value={form.name}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded-md px-3 py-2"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Image URL
          </label>
          <input
            type="text"
            name="image"
            value={form.image}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded-md px-3 py-2"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Price (IDR)
          </label>
          <input
            type="number"
            name="price"
            value={form.price}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded-md px-3 py-2"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Available Seats
          </label>
          <input
            type="number"
            name="seats"
            value={form.seats}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded-md px-3 py-2"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Start Date
          </label>
          <input
            type="datetime-local"
            name="startDate"
            value={form.startDate}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded-md px-3 py-2"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            End Date
          </label>
          <input
            type="datetime-local"
            name="endDate"
            value={form.endDate}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded-md px-3 py-2"
            required
          />
        </div>

        <div className="md:col-span-2">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Organizer ID
          </label>
          <input
            type="text"
            name="organizerId"
            value={form.organizerId}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded-md px-3 py-2"
            required
          />
        </div>

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
        <h3 className="text-lg font-medium text-gray-800 mb-2">Ticket Types</h3>
        <div className="space-y-2">
          {ticketTypes.map((ticket, index) => (
            <div key={index} className="flex gap-2">
              <input
                type="text"
                name="name"
                placeholder="Ticket Name"
                value={ticket.name}
                onChange={(e) => handleTicketChange(index, e)}
                className="w-full border border-gray-300 rounded-md px-3 py-2"
                required
              />
              <input
                type="number"
                name="price"
                placeholder="Price"
                value={ticket.price}
                onChange={(e) => handleTicketChange(index, e)}
                className="w-32 border border-gray-300 rounded-md px-3 py-2"
                required
              />
            </div>
          ))}
        </div>
        <button
          type="button"
          onClick={addTicketType}
          className="mt-2 text-sm text-blue-600 hover:underline"
        >
          + Add Ticket Type
        </button>
      </div>

      <button
        type="submit"
        className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 rounded-md transition"
      >
        Create Event
      </button>
    </form>
  );
}
