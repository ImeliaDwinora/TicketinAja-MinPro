import { prisma } from "../configs/prisma.config";

export async function getAllEvents() {
  try {
    const events = await prisma.event.findMany({
      orderBy: { start_date: "asc" },
    });

    return { status: "success", data: events };
  } catch (error) {
    console.error("Gagal mengambil data event:", error);
    return {
      status: "error",
      message: "Terjadi kesalahan saat mengambil event",
    };
  }
}
