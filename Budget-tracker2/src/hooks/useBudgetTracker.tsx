import {useEffect, useState } from "react";
export type Category = "Income" | "Expense";

export interface BudgetItem {
    id: string;
    description: string;
    amount: number;
    date: string;
    category: Category;
}

const useBudgetTracker = () => {
    const [budgetItems, setBudgetItems] = useState<BudgetItem[]>(() => {
        try {
            console.log("Retrieving items from localStorage...");
        const items = localStorage.getItem("budgetItems");
        return items ? JSON.parse(items) : [];
        }
        catch (error) {
            console.log("Error:", error);
            return [];
        }
    });

    const handleDelete = (id: string) => {
        const newArray = budgetItems.filter((item => item.id !== id));
        setBudgetItems(newArray);
    }

    useEffect(() => {
        localStorage.setItem("budgetItems", JSON.stringify(budgetItems));
    }, [budgetItems]);

    return {
        budgetItems, setBudgetItems, handleDelete
    }
}
export default useBudgetTracker;