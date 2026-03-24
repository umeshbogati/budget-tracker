import dotenv from "dotenv";
dotenv.config({
  path: ".env",
});

import express from "express";
import routes from "./routes";
import { errorHandler } from "./middlewares/errorHandler";

import connectDB from "./config/db";
import cors from "cors";

const app = express();

connectDB();

// This is used to parse JSON in request body
app.use(express.json());
app.use(cors());

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});

// All routes are defined here
app.use("/api", routes);

// Use generic error handler
app.use(errorHandler);
