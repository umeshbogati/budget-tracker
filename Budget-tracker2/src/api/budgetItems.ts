import type { BudgetItem } from "../pages/BudgetFormPage";
import http from "../utils/http";

export const fetchAll = () => {
    return http.get("/budgetTracker")
}

export const fetchById = (id: string) => {
    return http.get(`/budgetTracker/${id}`);
}

export const deleteById = (id: string) => {
    return http.delete(`/budgetTracker/${id}`);
}

export const create = (data: Omit<BudgetItem, "_id">) => {
    return http.post("/budgetTracker", data);
}

export const update = (id: string, data: Omit<BudgetItem, "_id">) => {
    return http.put(`/budgetTracker/${id}`, data);
}