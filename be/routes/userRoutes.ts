import express, { Request, Response } from "express";
import { registerUser, loginUser } from "../controllers/userController.js";
// import { authenticateToken } from "../middleware/authenticateToken.js";

const router = express.Router();

router.post("/register", (req: Request, res: Response) => registerUser(req, res));
router.post("/login", (req: Request, res: Response) => loginUser(req, res));
// router.get("/profile", authenticateToken, (req: Request, res: Response) => getUserProfile(req, res));

export default router;
