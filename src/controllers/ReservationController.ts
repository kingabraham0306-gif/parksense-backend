import { Request, Response } from "express";
import Parking from "../models/Parking";
import Reservation from "../models/Reservation";

const RESERVATION_MINUTES = 15;

const clearExpiredReservations = async () => {
  await Reservation.deleteMany({ expiresAt: { $lte: new Date() } });
};

export const getActiveReservations = async (_req: Request, res: Response) => {
  try {
    await clearExpiredReservations();
    const reservations = await Reservation.find().sort({ expiresAt: 1 });

    return res.status(200).json(reservations);
  } catch (error) {
    return res.status(500).json({ message: "Failed to fetch reservations" });
  }
};

export const createReservation = async (req: Request, res: Response) => {
  try {
    const { spotName } = req.body;

    if (!spotName || typeof spotName !== "string") {
      return res.status(400).json({ message: "spotName is required" });
    }

    await clearExpiredReservations();

    const spot = await Parking.findOne({ name: spotName });

    if (spot && !spot.isAvailable) {
      return res.status(409).json({ message: "Parking spot is occupied" });
    }

    const existingReservation = await Reservation.findOne({ spotName });

    if (existingReservation) {
      return res.status(409).json({ message: "Parking spot is already reserved" });
    }

    const expiresAt = new Date(Date.now() + RESERVATION_MINUTES * 60 * 1000);
    const reservation = await Reservation.create({ spotName, expiresAt });

    return res.status(201).json(reservation);
  } catch (error: any) {
    if (error?.code === 11000) {
      return res.status(409).json({ message: "Parking spot is already reserved" });
    }

    return res.status(500).json({ message: "Failed to reserve parking spot" });
  }
};

export const cancelReservation = async (req: Request, res: Response) => {
  try {
    const { spotName } = req.params;
    const reservation = await Reservation.findOneAndDelete({ spotName });

    if (!reservation) {
      return res.status(404).json({ message: "Reservation not found" });
    }

    return res.status(200).json({ message: "Reservation cancelled" });
  } catch (error) {
    return res.status(500).json({ message: "Failed to cancel reservation" });
  }
};
