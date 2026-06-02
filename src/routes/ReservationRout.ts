import { Router } from "express";
import {
  cancelReservation,
  createReservation,
  getActiveReservations,
} from "../controllers/ReservationController";

const reservationRoutes = Router();

reservationRoutes.get("/active", getActiveReservations);
reservationRoutes.post("/", createReservation);
reservationRoutes.delete("/:spotName", cancelReservation);

export default reservationRoutes;
