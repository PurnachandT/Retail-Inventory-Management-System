import { Request, Response } from "express";
import { CustomerService } from "../services/customer.service";

const customerService = new CustomerService();

export const createCustomer = async (
    req: Request,
    res: Response
) => {
    try {
        const result = await customerService.create(req.body);

        res.status(201).json(result);
    } catch (error: any) {
        console.error(error);

        res.status(500).json({
            message: error.message,
        });
    }
};

export const getAllCustomers = async (
    req: Request,
    res: Response
) => {
    try {
        const result = await customerService.getAll();

        res.json(result);
    } catch (error: any) {
        console.error(error);

        res.status(500).json({
            message: error.message,
        });
    }
};

export const getCustomerById = async (
    req: Request,
    res: Response
) => {
    try {
        const id = Number(req.params.id);

        const result = await customerService.getById(id);

        res.json(result);
    } catch (error: any) {
        console.error(error);

        res.status(500).json({
            message: error.message,
        });
    }
};

export const updateCustomer = async (
    req: Request,
    res: Response
) => {
    try {
        const id = Number(req.params.id);

        const result = await customerService.update(id, req.body);

        res.json(result);
    } catch (error: any) {
        console.error(error);

        res.status(500).json({
            message: error.message,
        });
    }
};

export const deleteCustomer = async (
    req: Request,
    res: Response
) => {
    try {
        const id = Number(req.params.id);

        const result = await customerService.delete(id);

        res.json(result);
    } catch (error: any) {
        console.error("DELETE CUSTOMER ERROR:", error);

        res.status(500).json({
            message: error.message,
        });
    }
};