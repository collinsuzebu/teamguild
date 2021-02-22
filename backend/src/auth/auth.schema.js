import * as mongoose from "mongoose";
import { randomBytes } from "../utils";

export const SessionSchema = new mongoose.Schema(
  {
    ip: { type: String, required: true },
    userAgent: { type: String },
    token: { type: String, default: randomBytes(128) },
    user: { type: mongoose.Schema.Types.ObjectId, required: true, ref: "user" },
  },
  {
    timestamps: true,
  }
);

const Session = mongoose.model("sessions", SessionSchema);

export { Session };
