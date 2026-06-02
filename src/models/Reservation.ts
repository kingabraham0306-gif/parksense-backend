import { Schema, model } from "mongoose";

const ReservationSchema = new Schema(
  {
    spotName: { type: String, required: true, unique: true, trim: true },
    expiresAt: { type: Date, required: true },
  },
  { timestamps: true }
);

ReservationSchema.index({ expiresAt: 1 }, { expireAfterSeconds: 0 });

const Reservation = model("Reservation", ReservationSchema);
export default Reservation;
