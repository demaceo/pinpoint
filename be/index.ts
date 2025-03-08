import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import officialsRoutes from "./routes/officialsRoutes.js";
// import emailRoutes from "./routes/emailRoutes.js";
// import moderationRoutes from "./routes/moderationRoutes.js";
// import chatbotRoutes from "./routes/chatbotRoutes.js";
import openStatesRoutes from "./routes/openStatesRoutes.js";


dotenv.config();

const app = express();
app.use(express.json());
app.use(cors());


app.use("/api/openstates", openStatesRoutes);

// app.use("/api/officials", officialsRoutes);
// app.use("/api/email", emailRoutes);
// app.use("/api/moderation", moderationRoutes);
// app.use("/api/chatbot", chatbotRoutes);

const PORT = process.env.PORT || 5001;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
