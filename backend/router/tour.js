import { Router } from "express";
import multer from "multer";
import { fileURLToPath } from "url";
import { dirname, join } from "path";
import {
  createTour,
  deleteTour,
  getAllTour,
  getFeaturedTour,
  getSingleTour,
  getTourBySearch,
  getTourCount,
  updateTour,
} from "../controllers/tourController.js";
import { verifyAdmin } from "../middlewares/auth-middleware.js";

const router = Router();

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    return cb(null, join(__dirname, "../../frontend/public/tour-images")); // Use the correct path
  },
  filename: function (req, file, cb) {
    const timestamp = new Date().toISOString().replace(/[-:.]/g, ""); // Safe for filenames
    return cb(null, `${timestamp}_${file.originalname}`);
  },
});

const upload = multer({
  storage,
  limits: {
    fileSize: 5 * 1024 * 1024, // Limit file size to 5MB (adjust as needed)
  },
});

// router.post("/", verifyAdmin, createTour);
// router.put("/:id", verifyAdmin, updateTour);
// router.delete("/:id", verifyAdmin, deleteTour);
router.post("/", upload.single("photo"), createTour);
router.put("/:id", upload.single("photo"), updateTour);
router.delete("/:id", deleteTour);
router.get("/:id", getSingleTour);
router.get("/", getAllTour);
router.get("/search/getTourBySearch", getTourBySearch);
router.get("/search/getFeaturedTours", getFeaturedTour);
router.get("/search/getTourCount", getTourCount);

export default router;
