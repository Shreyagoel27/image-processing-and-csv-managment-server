import express from "express";
import connectDB from "./config/db.js";
import userRoute from "./src/routes/userRouter.js";
import { config } from "./config/index.js";

const app = express();

connectDB();

app.use(express.json());

app.use(express.urlencoded({ extended: true }));

app.use("/user", userRoute);

const PORT = config.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
