import { Request, Response } from "express";
import { ItemService } from "../services/item.service";

const itemService = new ItemService();

export const createItem = async (req: Request, res: Response) => {
  try {
    const result = await itemService.create(req.body);
    res.status(201).json(result);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

export const getAllItems = async (req: Request, res: Response) => {
  try {
    const result = await itemService.getAll();
    res.json(result);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

export const getItemById = async (req: Request, res: Response) => {
  try {
    const result = await itemService.getById(Number(req.params.id));
    res.json(result);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

export const updateItem = async (req: Request, res: Response) => {
  try {
    const result = await itemService.update(Number(req.params.id), req.body);
    res.json(result);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

export const deleteItem = async (req: Request, res: Response) => {
    try {
        const result = await itemService.delete(Number(req.params.id));

        res.json(result);
    } catch (error: any) {
        console.error("DELETE ITEM ERROR:", error);

        res.status(500).json({
            message: error.message,
        });
    }
};