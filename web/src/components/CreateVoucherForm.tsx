"use client";

import { useState } from "react";

export default function CreateVoucherForm({
  onSubmit,
}: {
  onSubmit: (data: any) => void;
}) {
  const [formData, setFormData] = useState({
    code: "",
    discount: 0,
    quota: 0,
    start_date: "",
    end_date: "",
    eventId: "",
    userId: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-lg mx-auto p-6 bg-white rounded-2xl shadow space-y-4"
    >
      <h2 className="text-xl font-semibold text-center">Create New Voucher</h2>

      <input
        name="code"
        value={formData.code}
        onChange={handleChange}
        placeholder="Voucher Code"
        className="w-full p-2 border rounded"
        required
      />
      <input
        name="discount"
        type="number"
        value={formData.discount}
        onChange={handleChange}
        placeholder="Discount (%)"
        className="w-full p-2 border rounded"
        required
      />
      <input
        name="quota"
        type="number"
        value={formData.quota}
        onChange={handleChange}
        placeholder="Quota"
        className="w-full p-2 border rounded"
        required
      />
      <input
        name="start_date"
        type="datetime-local"
        value={formData.start_date}
        onChange={handleChange}
        className="w-full p-2 border rounded"
        required
      />
      <input
        name="end_date"
        type="datetime-local"
        value={formData.end_date}
        onChange={handleChange}
        className="w-full p-2 border rounded"
        required
      />
      <input
        name="eventId"
        value={formData.eventId}
        onChange={handleChange}
        placeholder="Event ID"
        className="w-full p-2 border rounded"
        required
      />
      <input
        name="userId"
        value={formData.userId}
        onChange={handleChange}
        placeholder="User ID (optional)"
        className="w-full p-2 border rounded"
      />

      <button
        type="submit"
        className="w-full bg-blue-600 text-white p-2 rounded hover:bg-blue-700"
      >
        Create Voucher
      </button>
    </form>
  );
}
