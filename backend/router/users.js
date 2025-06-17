import { Router } from "express";
import { deleteUser, getAllUser, getSingleUser, updateUser } from "../controllers/userController.js";
import { verifyAdmin, verifyUser } from "../middlewares/auth-middleware.js";



const router = Router();

router.put("/:id", updateUser);
router.delete("/:id", deleteUser);
router.get("/:id", verifyUser ,getSingleUser);
router.get("/", verifyAdmin ,getAllUser);

export default router;