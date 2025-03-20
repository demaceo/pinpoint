import { Request, Response, NextFunction } from "express";

interface CustomRequest extends Request {
  user?: { userId: string };
}
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

const JWT_SECRET = process.env.JWT_SECRET || "supersecretkey";

export const authenticateToken = (req: CustomRequest, res: Response, next: NextFunction) => {
  const token = req.header("Authorization")?.split(" ")[1];
  if (!token) return res.status(401).json({ message: "Access denied, token missing" });
  try {
    const verified = jwt.verify(token, JWT_SECRET) as { userId: string };
    req.user = verified;
    next();
  } catch (err) {
    res.status(400).json({ message: 'Invalid token' });
  }
};

export default authenticateToken;