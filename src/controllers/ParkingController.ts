import { Request, Response } from "express";
import Parking from "../models/Parking";

export const upsertParkingStatus = async (req: Request, res: Response) => {
  try {
    const { name, isAvailable } = req.body;

    if (!name || typeof isAvailable !== "boolean") {
      return res.status(400).json({ message: "name and isAvailable are required" });
    }

    const parking = await Parking.findOneAndUpdate(
      { name },
      { name, isAvailable },
      { new: true, upsert: true }
    );

    return res.status(200).json(parking);
  } catch (error) {
    return res.status(500).json({ error: "Server error" });
  }
};

export const getParkingStatus = async (req: Request, res: Response) => {
  try {
    const { name } = req.params;

    const parking = await Parking.findOne({ name });

    if (!parking) {
      return res.status(404).json({ message: "Parking spot not found" });
    }

    return res.status(200).json(parking);
  } catch (error) {
    return res.status(500).json({ error: "Server error" });
  }
};

export const getAllParkingStatuses = async (_req: Request, res: Response) => {
  try {
    const parkings = await Parking.find();
    res.json(parkings);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch parking spots" });
  }
};
