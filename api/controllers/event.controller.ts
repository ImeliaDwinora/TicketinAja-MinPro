import { prisma } from "../configs/prisma.config";
import { Request, Response, NextFunction } from "express";
import cloudinary from "../configs/cloudinary.configs";

export async function getAllEvents(
  request: Request,
  response: Response,
  next: NextFunction
) {
  try {
    const { page = 1, limit = 9, location, category, search } = request.query;
    const skip = (Number(page) - 1) * Number(limit);
    const where: any = {};
    if (location) {
      where.location = {
        contains: location as string,
        mode: `insensitive`,
      };
    }
    if (category) {
      where.category = {
        contains: category as string,
        mode: `insensitive`,
      };
    }
    if (search) {
      where.name = {
        contains: search as string,
        mode: "insensitive",
      };
    }
    const totalEvents = await prisma.event.count();
    const events = await prisma.event.findMany({
      take: Number(limit),
      skip: skip,
      orderBy: {
        start_date: "asc",
      },
    });
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
        Ticket: true,
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
      description,
      location,
      category,
      organizerId,
      is_free,
    } = req.body;

    const file = req.file;
    if (!file) return res.status(400).json({ message: "No image uploaded" });

    const result: any = await new Promise((resolve, reject) => {
      const uploadStream = cloudinary.uploader.upload_stream(
        { folder: "events" },
        (error, result) => {
          if (error) return reject(error);
          resolve(result);
        }
      );
      uploadStream.end(file.buffer);
    });

    const imageUrl = result.secure_url;
    const parsed = is_free === "true";

    const event = await prisma.event.create({
      data: {
        name,
        description,
        image: imageUrl,
        location,
        category,
        start_date: new Date(startDate),
        end_date: new Date(endDate),
        is_paid: Number(price) > 0,
        is_free: parsed,
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
