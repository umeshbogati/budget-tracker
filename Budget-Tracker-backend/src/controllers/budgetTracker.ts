import { Request, Response, NextFunction } from "express" 
import * as budgetTrackerService from "../services/budgetTracker";

export const fetchAll = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        console.log("Fetching all budget items");

        const response = await budgetTrackerService.fetchAll();

        res.status(200).json({
            data: response
        })
    }
    catch (error) {
        next(error);
    }
}

export const create = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        const requestBody = req.body;

        const data = await budgetTrackerService.create(requestBody);
        // Core logic
        res.status(201).json({
            data
        });
    }
    catch (error) {
        next(error);
    }
}

export const fetchById = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        const id = req.params.id;

        const data = await budgetTrackerService.fetchById(String(id));

        res.status(200).json({
            data
        })
    }
    catch (error) {
        next(error);

    }
}

export const deleteById = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        const id = req.params.id;

        await budgetTrackerService.deleteById(String(id));

        res.status(200).json({})
    }
    catch (error) {
        next(error);
    }
}

export const update = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        const requestBody = req.body;
        const id = req.params.id;

        const data = await budgetTrackerService.update(String(id), requestBody);

        res.status(200).json({
            data
        });
    }
    catch (error) {
        next(error);
    }
}