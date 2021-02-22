import express from "express";
import { AuthService } from "../auth/auth.service";
const router = express.Router();

router.post("/", async (req, res) => {
  await new AuthService().logout({ req, res });
  res.status(200).json({ message: "User logged out" });
});

module.exports = router;
