import React, { createContext, useContext, useEffect, useState } from "react";
import type { BudgetItem } from "../hooks/useBudgetTracker";

interface BudgetContextType {
  budgetItems: BudgetItem[];
  addBudgetItem: (item: BudgetItem) => void;
  deleteBudgetItem: (id: string) => void;
  setBudgetItems: React.Dispatch<React.SetStateAction<BudgetItem[]>>;
}

// Create the context with a default value of underdefined
const BudgetContext = createContext<BudgetContextType | undefined>(undefined);

export const useBudgetContext = () => {
  const context = useContext(BudgetContext);

  if (!context) {
    throw new Error(
      "useBudgetContext must be used within a BudgetContextProvider",
    );
  }
  return context;
};

export const BudgetContextProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [budgetItems, setBudgetItems] = useState<BudgetItem[]>(() => {
    console.log("Initializing budget items from localStorage....");
    // Load from localStorage if available (run only on first render)

    const items = localStorage.getItem("budgetItems");
    return items ? JSON.parse(items) : [];
  });

  useEffect(() => {
    localStorage.setItem("budgetItems", JSON.stringify(budgetItems));
  }, [budgetItems]);

  // Add a new budget item (availble to all component via context)
  const addBudgetItem = (item: Omit<BudgetItem, "id">) => {
    setBudgetItems((prev) => [...prev, { ...item, id: crypto.randomUUID() }]);
  };

  // Delete a budget item by id (available to ALL components via context)
  const deleteBudgetItem = (id: string) => {
    setBudgetItems((prev) => prev.filter((item) => item.id !== id));
  };

  return (
    <BudgetContext.Provider
      value={{ budgetItems, addBudgetItem, deleteBudgetItem, setBudgetItems }}
    >
      {children}
    </BudgetContext.Provider>
  );
};
