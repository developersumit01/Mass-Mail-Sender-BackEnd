import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import userRoutes from "./routes/user.routes.js";
import { CONST_URL } from "./constants.js";

const app = express();

app.use(cors({ origin: process.env.CORS_ORIGIN, credentials: true }));
app.use(cookieParser());
app.use(express.urlencoded({ extended: true, limit: "16kb" }));

app.use(`${CONST_URL}/user`, userRoutes);

export default app;
