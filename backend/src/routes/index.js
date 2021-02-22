import express from "express";
import { GITHUB_APP_ID, SCOPE } from "../config";

const router = express.Router();

router.get("/", (req, res) => {
  res.redirect(
    `https://github.com/login/oauth/authorize?client_id=${GITHUB_APP_ID}&scope=${SCOPE}&response_type=code`
  );
});

module.exports = router;
