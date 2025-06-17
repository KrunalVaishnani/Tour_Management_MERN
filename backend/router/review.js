import { Router } from "express";
import { createReview } from "../controllers/reviewController.js";
import { verifyUser } from "../middlewares/auth-middleware.js";

const router = Router();

router.post("/:tourId", verifyUser, createReview);

export default router;
