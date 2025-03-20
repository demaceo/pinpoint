import { Request, Response } from "express";

export interface AuthenticatedRequest extends Request {
    user: {
        userId: string;
    };
}
import User from "../models/user.js";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

const JWT_SECRET = process.env.JWT_SECRET || "supersecretkey";

// User Registration
export const registerUser = async (req: Request, res: Response): Promise<void> => {
    try {
        const { firstName, lastName, email, password } = req.body;

        if (!firstName || !lastName || !email || !password) {
            res.status(400).json({ message: "All fields are required" });
            return;
        }

        const userExists = await User.findOne({ email });
        if (userExists) {
            res.status(400).json({ message: "Email already registered" });
            return;
        }

        const user = new User({ firstName, lastName, email, password });
        await user.save();

        res.status(201).json({ message: "User registered successfully" });
    } catch (error) {
        res.status(500).json({ message: "Server error", error: error instanceof Error ? error.message : error });
    }
};

// User Login
export const loginUser = async (req: Request, res: Response): Promise<void> => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email });

        if (!user || !(await user.comparePassword(password))) {
            res.status(401).json({ message: "Invalid email or password" });
            return;
        }

        const token = jwt.sign({ userId: user._id }, JWT_SECRET, { expiresIn: "1h" });

        res.json({ token, user: { id: user._id, email: user.email, firstName: user.firstName, lastName: user.lastName } });
    } catch (error) {
        res.status(500).json({ message: "Server error", error: error instanceof Error ? error.message : error });
    }
}

// Get User Profile
// const getUserProfile = async (req: AuthenticatedRequest, res: Response): Promise<void> => {
//     try {
//         const user = await User.findById(req.user.userId).select("-password");
//         if (!user) {
//             res.status(404).json({ message: "User not found" });
//             return;
//         }

//         res.json(user);
//     } catch (error) {
//         res.status(500).json({ message: "Server error", error: error instanceof Error ? error.message : error });
//     }
// };
