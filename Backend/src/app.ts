import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import bodyParser from "body-parser";
import { MONGO_URI } from "./config";
import userRoutes from "./routes/userRoutes";

const app = express();

app.use(cors());
app.use(bodyParser.json());

app.use("/users", userRoutes);

mongoose
  .connect(MONGO_URI)
  .then(() => {
    app.listen(3000, () => {
      console.log("Server running on http://localhost:3000");
    });
  })
  .catch((error) => console.error(error));
