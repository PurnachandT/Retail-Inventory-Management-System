import { Request, Response } from "express";
import { BillService } from "../services/bill.service";

const service = new BillService();

export const createBill = async (req: Request, res: Response) => {

    try {

        const result = await service.createBill(req.body);

        res.json(result);

    } catch (error: any) {

        res.status(400).json({
            message: error.message
        });

    }

}

export const getBills = async (req: Request, res: Response) => {

    try {

        const result = await service.getBills();

        res.json(result);

    } catch (error: any) {

        res.status(500).json({
            message: error.message
        });

    }

};

export const getBillById = async (req: Request, res: Response) => {
    try {
        const result = await service.getBillById(Number(req.params.id));

        res.json(result);
    } catch (error: any) {
        res.status(404).json({
            message: error.message,
        });
    }
};

export const deleteBill = async (req: Request, res: Response) => {

    try {

        const result = await service.deleteBill(
            Number(req.params.id)
        );

        res.json(result);

    } catch (error: any) {

        res.status(400).json({
            message: error.message
        });

    }

};