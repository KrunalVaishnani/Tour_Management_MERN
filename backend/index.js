import dotenv from "dotenv";
dotenv.config();

import express, { json } from "express";
import cors from "cors";
import connectDb from "./utils/db.js";
import errorMiddleware from "./middlewares/error-middleware.js";
import cookieParser from "cookie-parser";
import { default as tourRouter } from "./router/tour.js";
import { default as userRouter } from "./router/users.js";
import { default as authRouter } from "./router/auth.js";
import { default as reviewRouter } from "./router/review.js";
import { default as bookingRouter } from "./router/bookings.js";
import { authMiddleware } from "./middlewares/auth-middleware.js";
dotenv.config();
const app = express();

const corsOptions = {
  origin: "http://localhost:5173",
  optionsSuccessStatus: 200,
  methods: "GET, POST, PUT, DELETE, PATCH, HEAD",
  credentials: true,
};
app.use(cors(corsOptions));
app.use(express.json({ limit: '10mb' })); // Adjust the limit as necessary
app.use(express.urlencoded({ limit: '10mb', extended: true }));
app.use(json());
app.use(cookieParser());

// app.use(authMiddleware)

app.use("/api/tours", tourRouter);
app.use("/api/users", userRouter);
app.use("/api/auth", authRouter);
app.use("/api/review", reviewRouter);
app.use("/api/booking", bookingRouter);

app.use(errorMiddleware);
const PORT = 5000;
connectDb().then(() => {
  app.listen(PORT, () => {
    console.log(`server is running at port: ${PORT}`);
  });
});
