import { Router } from "express";
import { verifyAdmin, verifyUser } from "../middlewares/auth-middleware.js";
import { createBooking, getAllBooking, getBooking } from "../controllers/bookingController.js";

const router = Router();

router.post("/", verifyUser, createBooking);
router.get("/:id", verifyUser, getBooking);
router.get("/", verifyAdmin, getAllBooking);

export default router;
