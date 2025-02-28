import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import officialsRoutes from "./routes/officialsRoutes";
import emailRoutes from "./routes/emailRoutes";
import moderationRoutes from "./routes/moderationRoutes";
import chatbotRoutes from "./routes/chatbotRoutes";

dotenv.config();

const app = express();
app.use(express.json());
app.use(cors());

app.use("/api/officials", officialsRoutes);
app.use("/api/email", emailRoutes);
app.use("/api/moderation", moderationRoutes);
app.use("/api/chatbot", chatbotRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
