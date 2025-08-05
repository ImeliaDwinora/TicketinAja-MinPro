// "use client";

// import { useEffect, useState } from "react";

// interface Transaction {
//   id: string;
//   user: {
//     name: string;
//   };
//   event: {
//     name: string;
//   };
//   quantity: number;
//   totalPrice: number;
//   status: string;
//   paymentProofUrl: string | null;
// }

// export default function DashboardTransactionPage() {
//   const [transactions, setTransactions] = useState<Transaction[]>([]);

//   const fetchTransactions = async () => {
//     const res = await fetch("http://localhost:8000/api/transactions/organizer");
//     const data = await res.json();
//     setTransactions(data);
//   };

//   const handleAction = async (id: string, action: "accept" | "reject") => {
//     await fetch(`http://localhost:8000/api/transactions/${id}/${action}`, {
//       method: "PATCH",
//     });
//     fetchTransactions(); // refresh
//   };

//   useEffect(() => {
//     fetchTransactions();
//   }, []);

//   return (
//     <main className="max-w-6xl mx-auto px-4 py-8">
//       <h1 className="text-2xl font-bold mb-6">Daftar Transaksi Tiket</h1>

//       <div className="overflow-x-auto">
//         <table className="min-w-full text-sm text-left border">
//           <thead className="bg-gray-100">
//             <tr>
//               <th className="px-4 py-2">Pembeli</th>
//               <th className="px-4 py-2">Event</th>
//               <th className="px-4 py-2">Jumlah</th>
//               <th className="px-4 py-2">Total</th>
//               <th className="px-4 py-2">Status</th>
//               <th className="px-4 py-2">Bukti</th>
//               <th className="px-4 py-2">Aksi</th>
//             </tr>
//           </thead>
//           <tbody>
//             {transactions.map((tx) => (
//               <tr key={tx.id} className="border-t">
//                 <td className="px-4 py-2">{tx.user.name}</td>
//                 <td className="px-4 py-2">{tx.event.name}</td>
//                 <td className="px-4 py-2">{tx.quantity}</td>
//                 <td className="px-4 py-2">Rp{tx.totalPrice.toLocaleString("id-ID")}</td>
//                 <td className="px-4 py-2">{tx.status}</td>
//                 <td className="px-4 py-2">
//                   {tx.paymentProofUrl ? (
//                     <a
//                       href={tx.paymentProofUrl}
//                       target="_blank"
//                       className="text-blue-500 underline"
//                     >
//                       Lihat Bukti
//                     </a>
//                   ) : (
//                     "-"
//                   )}
//                 </td>
//                 <td className="px-4 py-2 space-x-2">
//                   {tx.status === "WAITING_CONFIRMATION" && (
//                     <>
//                       <button
//                         className="bg-green-500 text-white px-3 py-1 rounded"
//                         onClick={() => handleAction(tx.id, "accept")}
//                       >
//                         Terima
//                       </button>
//                       <button
//                         className="bg-red-500 text-white px-3 py-1 rounded"
//                         onClick={() => handleAction(tx.id, "reject")}
//                       >
//                         Tolak
//                       </button>
//                     </>
//                   )}
//                 </td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       </div>
//     </main>
//   );
// }
"use client";

import { useState } from "react";

const dummyTransactions = [
  {
    id: "tx1",
    buyer: "Andi",
    event: "Konser Musik Merdeka",
    quantity: 2,
    total: 200_000,
    status: "WAITING_CONFIRMATION",
    paymentProofUrl: "https://via.placeholder.com/150",
  },
  {
    id: "tx2",
    buyer: "Budi",
    event: "Workshop UI/UX",
    quantity: 1,
    total: 150_000,
    status: "DONE",
    paymentProofUrl: null,
  },
  {
    id: "tx3",
    buyer: "Citra",
    event: "Seminar Parenting",
    quantity: 3,
    total: 300_000,
    status: "REJECTED",
    paymentProofUrl: "https://via.placeholder.com/150",
  },
];

export default function DashboardTransactionPage() {
  const [transactions, setTransactions] = useState(dummyTransactions);

  return (
    <main className="max-w-6xl mx-auto px-4 py-10">
      <h1 className="text-3xl font-bold mb-8 text-[#374151]">
        Transaksi Tiket
      </h1>

      <div className="overflow-x-auto bg-white rounded-xl shadow border">
        <table className="min-w-full text-sm text-left border-collapse">
          <thead className="bg-gray-100 text-gray-700 uppercase text-xs">
            <tr>
              <th className="px-6 py-4">Pembeli</th>
              <th className="px-6 py-4">Event</th>
              <th className="px-6 py-4">Jumlah</th>
              <th className="px-6 py-4">Total</th>
              <th className="px-6 py-4">Status</th>
              <th className="px-6 py-4">Bukti</th>
              <th className="px-6 py-4">Aksi</th>
            </tr>
          </thead>
          <tbody>
            {transactions.map((tx) => (
              <tr key={tx.id} className="border-t text-gray-800">
                <td className="px-6 py-4">{tx.buyer}</td>
                <td className="px-6 py-4">{tx.event}</td>
                <td className="px-6 py-4">{tx.quantity}</td>
                <td className="px-6 py-4">
                  Rp{tx.total.toLocaleString("id-ID")}
                </td>
                <td className="px-6 py-4">
                  <span
                    className={`px-2 py-1 rounded-full text-xs font-medium ${
                      tx.status === "WAITING_CONFIRMATION"
                        ? "bg-yellow-100 text-yellow-800"
                        : tx.status === "DONE"
                        ? "bg-green-100 text-green-800"
                        : tx.status === "REJECTED"
                        ? "bg-red-100 text-red-800"
                        : "bg-gray-100 text-gray-700"
                    }`}
                  >
                    {tx.status.replaceAll("_", " ")}
                  </span>
                </td>
                <td className="px-6 py-4">
                  {tx.paymentProofUrl ? (
                    <a
                      href={tx.paymentProofUrl}
                      target="_blank"
                      className="text-blue-600 underline"
                    >
                      Lihat
                    </a>
                  ) : (
                    "-"
                  )}
                </td>
                <td className="px-6 py-4 space-x-2">
                  {tx.status === "WAITING_CONFIRMATION" && (
                    <>
                      <button className="bg-green-500 text-white px-3 py-1 rounded hover:bg-green-600">
                        Terima
                      </button>
                      <button className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600">
                        Tolak
                      </button>
                    </>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </main>
  );
}
