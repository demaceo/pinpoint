import express from "express";
// const {express} = require("express");
import cors from "cors";
// const { cors } = require("cors");
// const { dotenv } = require("dotenv")
import dotenv from "dotenv";
import officialsRoutes from "./routes/officialsRoutes.js";
import emailRoutes from "./routes/emailRoutes.js";
import moderationRoutes from "./routes/moderationRoutes.js";
import chatbotRoutes from "./routes/chatbotRoutes.js";
// const {officialsRoutes} = require("./routes/officialsRoutes");
// const {emailRoutes} = require("./routes/emailRoutes");
// const {moderationRoutes} = require("./routes/moderationRoutes");
// const {chatbotRoutes} = require("./routes/chatbotRoutes");

dotenv.config();

const app = express();
app.use(express.json());
app.use(cors());

app.use("/api/officials", officialsRoutes);
app.use("/api/email", emailRoutes);
app.use("/api/moderation", moderationRoutes);
app.use("/api/chatbot", chatbotRoutes);

const PORT = process.env.PORT || 5001;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
