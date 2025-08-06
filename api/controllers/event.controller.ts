import { prisma } from "../configs/prisma.config";
import { Request, Response, NextFunction } from "express";
import { faker } from "@faker-js/faker";
import { Category } from "../generated/prisma";

export async function getAllEvents(
  request: Request,
  response: Response,
  next: NextFunction
) {
  try {
    const { page = 1, limit = 9 } = request.query;
    const skip = (Number(page) - 1) * Number(limit);
    const totalEvents = await prisma.event.count();
    const events = await prisma.event.findMany({
      take: Number(limit),
      skip: skip,
      orderBy: {
        start_date: "asc", // sort dari tanggal terdekat
      },
    }); //limitation
    response.status(200).json({
      data: events,
      page: Number(page),
      totalData: totalEvents,
      totalPage: Math.ceil(totalEvents / Number(limit)),
    });
  } catch (error) {
    next(error);
  }
}

export async function getEventById(id: string) {
  try {
    const event = await prisma.event.findUnique({
      where: { id },
      include: {
        TicketType: true,
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
      location,
      category,
      organizerId,
    } = req.body;

    const event = await prisma.event.create({
      data: {
        name,
        description,
        image,
        location,
        category,
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
