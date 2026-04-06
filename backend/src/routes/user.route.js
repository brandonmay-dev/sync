import { Router } from "express";
import { protectRoute } from "../middleware/auth.middleware.js";

const router = Router();

router.get("/like", protectRoute, (req, res) => {
  req.auth.userID;
  res.send("User route with GET method");
});

export default router;
