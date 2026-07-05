import { Router } from "express";
import {
  createCustomer,
  getAllCustomers,
  getCustomerById,
  updateCustomer,
  deleteCustomer,
} from "../controllers/customer.controller";
import { verifyToken } from "../middleware/auth.middleware";


const router = Router();

router.post("/", verifyToken, createCustomer);

router.get("/", verifyToken, getAllCustomers);

router.get("/:id", verifyToken, getCustomerById);

router.put("/:id", verifyToken, updateCustomer);

router.delete("/:id", verifyToken, deleteCustomer);

export default router;