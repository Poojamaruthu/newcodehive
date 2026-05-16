import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import connectDB from "./config/db.js";

import userRoutes from "./router/userRoutes.js";
import snippetRoutes from "./router/snippetRoutes.js";

dotenv.config();

connectDB();

const app = express();
app.use(cors());
app.use(express.json());


// routes
app.use("/api/users", userRoutes);

app.use("/api/snippets", snippetRoutes);


app.listen(5000, () => {
  console.log("Server running on port 5000");
});