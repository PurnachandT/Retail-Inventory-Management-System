import { Request, Response } from "express";
import { AuthService } from "../services/auth.service";

const authService = new AuthService();

export const register = async (req: Request, res: Response) => {
  try {
    const { name, email, password } = req.body;

    const result = await authService.register(name, email, password);

    res.status(201).json(result);
  } catch (error: any) {
    res.status(400).json({
      message: error.message,
    });
  }
};

export const login = async (req: Request, res: Response) => {
  try {
    console.log("========== LOGIN REQUEST ==========");
    console.log("Request Body:", req.body);

    const { email, password } = req.body;

    const result = await authService.login(email, password);

    console.log("========== LOGIN SUCCESS ==========");
    console.log(result);

    res.json(result);

  } catch (error: any) {

    console.log("========== LOGIN ERROR ==========");
    console.error(error);

    res.status(401).json({
      message: error.message,
    });
  }
};