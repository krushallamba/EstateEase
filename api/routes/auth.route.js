import express from 'express';
import { google, signin, signout, signup } from '../controllers/auth.controller.js';
import { verifyToken } from '../utils/verifyUser.js';

const router = express.Router();

router.post("/signup", signup)
router.post("/signin", signin)
router.post("/google", google)
router.get("/signout", signout)
router.get("/check-session", verifyToken, (req, res) => {
    res.status(200).json({ message: "Session is valid" });
  });
  

export default router;