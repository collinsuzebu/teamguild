import mongoose from "mongoose";
import { SIGNING_KEY } from "../config";

// Project Schema
const UserSchema = new mongoose.Schema(
  {
    name: {
      type: String,
    },
    githubId: {
      type: String,
      required: true,
    },
    avatar: {
      type: String,
    },
    token: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

UserSchema.methods.generateJWT = function () {
  return jwt.sign({ _id: this._id }, SIGNING_KEY, { expiresIn: "1h" });
};

const User = mongoose.model("User", UserSchema);

export { User };
