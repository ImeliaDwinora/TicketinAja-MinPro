import { prisma } from "../configs/prisma.config";
import { Request, Response, NextFunction } from "express";

export const createTicket = async (req: Request, res: Response) => {
  try {
    const { eventId, data } = req.body;
    const payload = data.map((element) => {
      return {
        ticketType: element.name,
        price: element.price,
        stock: element.stock,
        eventId,
      };
    });
    const ticket = await prisma.ticket.createMany({
      data: payload,
    });

    return res.status(201).json(ticket);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Failed to create ticket" });
  }
};
