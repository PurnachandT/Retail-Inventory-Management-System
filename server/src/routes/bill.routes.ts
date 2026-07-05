import { Router } from "express";
import {
    createBill,
    getBills,
    getBillById,
    deleteBill
} from "../controllers/bill.controller";
import { verifyToken } from "../middleware/auth.middleware";


const router = Router();

router.post("/",verifyToken,createBill);
router.get("/", verifyToken, getBills);
router.get("/:id", verifyToken, getBillById);
router.delete("/:id", verifyToken, deleteBill);

export default router;