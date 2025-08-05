"use client";

import CreateVoucherForm from "@/components/CreateVoucherForm";

export default function CreateVoucherPage() {
  const handleSubmit = async (data: any) => {
    try {
      const res = await fetch("http://localhost:8000/api/voucher", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (!res.ok) throw new Error("Failed to create voucher");

      const result = await res.json();
      alert("Voucher created: " + result.code);
    } catch (err) {
      console.error(err);
      alert("Failed to create voucher");
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <CreateVoucherForm onSubmit={handleSubmit} />
    </div>
  );
}
