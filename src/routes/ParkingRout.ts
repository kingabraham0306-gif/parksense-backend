import { Router } from "express";

import {
  upsertParkingStatus,
  getParkingStatus,
  getAllParkingStatuses,
} from "../controllers/ParkingController";

const parkingRoutes = Router();

parkingRoutes.post("/", upsertParkingStatus);

// :white_check_mark: THIS IS THE FIX
parkingRoutes.get("/", getAllParkingStatuses);

// :exclamation: MUST BE BELOW
parkingRoutes.get("/:name", getParkingStatus);

export default parkingRoutes;
