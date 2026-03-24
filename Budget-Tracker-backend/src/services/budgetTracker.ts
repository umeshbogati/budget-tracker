import { NotFoundError } from "../constants/error";
import { BudgetItem, BudgetItemRequest } from "../interfaces/budgetTracker";
import BudgetItemModel from "../models/BudgetItem";

export const create = async (data: BudgetItemRequest) => {
    return await BudgetItemModel.create(data);
}

export const fetchAll = async () => {
    return await BudgetItemModel.find();
}

export const fetchById = async (id: string) => {
    const budgetItem = await BudgetItemModel.findById(id);

    if (!budgetItem) {
        throw NotFoundError("Item not found");
    }

    return budgetItem;
}

export const deleteById = async (id: string) => {    
    const deletedItem = await BudgetItemModel.findByIdAndDelete(id);

    if (!deletedItem) {
        throw NotFoundError();
    }
}

export const update = async (id: string, data: BudgetItemRequest) => {
    const updatedItem = await BudgetItemModel.findByIdAndUpdate(id, data, { new: true });

    if (!updatedItem) {
        throw NotFoundError();
    }

    return updatedItem;
}