import express from "express";
import { AuthService } from "../auth/auth.service";
import { FRONTEND_URL, GITHUB_APP_ID, GITHUB_APP_SECRET } from "../config";

const router = express.Router();

router.post("/", (req, res) => {
  res.redirect(FRONTEND_URL);
});

router.get("/oauth2/github", async (req, res, next) => {
  const body = {
    client_id: GITHUB_APP_ID,
    client_secret: GITHUB_APP_SECRET,
    code: req.query.code,
  };
  const user = await new AuthService()
    .githubAuth(body, { req, res })
    .catch((err) => next(err));

  return res.redirect(FRONTEND_URL);
});

module.exports = router;
