import { Router } from "express";
import { register, login } from "../controllers/auth.controller";
import { verifyToken, AuthRequest } from "../middleware/auth.middleware";

const router = Router();

router.post("/register", register);

router.post("/login", login);

router.get("/profile", verifyToken, (req: AuthRequest, res) => {
  res.json({
    message: "Welcome!",
    user: req.user,
  });
});

export default router;