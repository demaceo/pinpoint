import express from "express";
import cors from "cors";
import dotenv from "dotenv";
// import connectDB from "./config/database.js";
// import officialsRoutes from "./routes/officialsRoutes.js";
// import emailRoutes from "./routes/emailRoutes.js";
// import moderationRoutes from "./routes/moderationRoutes.js";
// import chatbotRoutes from "./routes/chatbotRoutes.js";
// import openStatesRoutes from "./routes/openStatesRoutes.js";
// import userRoutes from "./routes/userRoutes.js";

dotenv.config();
const PORT = process.env.PORT || 5001;

// Connect to MongoDB database
import { connectDB } from "./config/database.js";
connectDB();


// Define routes
const app = express();

// Middleware setup
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

// Homepage route
app.get("/", (req, res) => {
    res.json({ message: "Backend is up" });
});

// module.exports = app; // Export app for Vercel

// if (require.main === module) {
//     app.listen(3001, () => console.log("Server running on port 3001"));
// }

// app.use("/api/openstates", openStatesRoutes);
// app.use("/api/user", userRoutes);

// app.use("/api/officials", officialsRoutes);
// app.use("/api/email", emailRoutes);
// app.use("/api/moderation", moderationRoutes);
// app.use("/api/chatbot", chatbotRoutes);

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
