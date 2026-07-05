import { Request, Response } from "express";
import { DashboardService } from "../services/dashboard.service";

const service = new DashboardService();

export const getDashboard = async (
  req: Request,
  res: Response
) => {
  try {
    const data = await service.getDashboard();

    res.json(data);
  } catch (error: any) {
    res.status(500).json({
      message: error.message,
    });
  }
};