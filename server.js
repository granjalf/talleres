import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import connectDB from "./src/config/db.js";
import authRoutes from "./src/routes/auth.routes.js";
//import userRoutes from "./src/routes/user.routes.js";

dotenv.config();
connectDB(); // Llamar la función para conectar MongoDB

const app = express();
app.use(cors());
app.use(express.json());

app.use("/api/auth", authRoutes);
//app.use("/api/users", userRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Servidor corriendo en puerto ${PORT}`));
