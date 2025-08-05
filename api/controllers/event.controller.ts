import { prisma } from "../configs/prisma.config";
import { Request, Response } from "express";
import { faker } from "@faker-js/faker";
import { Category } from "../generated/prisma";

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

export async function getEventById(id: string) {
  try {
    const event = await prisma.event.findUnique({
      where: { id },
      include: {
        TicketType: true, // ⬅️ Tambahkan ini!
      },
    });
    if (!event) {
      return { status: "not_found", message: "Event not found" };
    }
    return { status: "success", data: event };
  } catch (error: any) {
    return { status: "error", message: error.message };
  }
}
export const createEvent = async (req: Request, res: Response) => {
  try {
    const {
      name,
      price,
      startDate,
      endDate,
      seats,
      description,
      image,
      organizerId,
    } = req.body;

    const cities = [
      "Jakarta",
      "Bandung",
      "Surabaya",
      "Medan",
      "Makassar",
      "Yogyakarta",
      "Semarang",
      "Denpasar",
      "Palembang",
      "Balikpapan",
    ];

    const event = await prisma.event.create({
      data: {
        name,
        description,
        image,
        location: faker.helpers.arrayElement(cities),
        category: faker.helpers.arrayElement(Object.values(Category)),
        start_date: new Date(startDate),
        end_date: new Date(endDate),
        is_paid: Number(price) > 0,
        price: Number(price),
        quota: Number(seats),
        organizer: {
          connect: { id: organizerId },
        },
      },
    });

    return res.status(201).json(event);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Failed to create event" });
  }
};
