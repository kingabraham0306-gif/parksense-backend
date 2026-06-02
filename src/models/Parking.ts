import { Schema, model } from "mongoose";

const ParkingSchema = new Schema({
  name: { type: String, required: true, unique: true },
  isAvailable: { type: Boolean, required: true }
});

const Parking = model("Parking", ParkingSchema);
export default Parking;