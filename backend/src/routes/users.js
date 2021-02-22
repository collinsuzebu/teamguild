import express from "express";
import { AuthService } from "../auth/auth.service";

const router = express.Router();

router.get("/session", async (req, res) => {
  const token = req.cookies.token || "";
  if (token) {
    const user = await new AuthService()
      .getSession({ token })
      .then((ref_token) => ref_token)
      .catch((err) => next(err));
    res.status(200).send(user);
  } else {
    res.status(401).send({ message: "No valid session" });
  }
});
module.exports = router;
