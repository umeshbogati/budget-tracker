import { useState, useEffect } from "react";
import "./BudgetForm.css";
import useBudgetTracker from "../hooks/useBudgetTracker";

export type Category = "Income" | "Expense";

export interface BudgetItem {
  id: string;
  description: string;
  amount: number;
  date: string;
  category: Category;
}

const BudgetForm = () => {
  const { budgetItems, setBudgetItems } = useBudgetTracker();

  const [description, setDescription] = useState("");
  const [amount, setAmount] = useState<number>(0);
  const [date, setDate] = useState("");
  const [category, setCategory] = useState<Category>("Expense");

  useEffect(() => {
    localStorage.setItem("budgetItems", JSON.stringify(budgetItems));
  }, [budgetItems]);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (description.trim() === "") {
      alert("Please enter a description.");
      return;
    }

    if (isNaN(amount) || amount <= 0) {
      alert("Please enter a valid amount greater than 0.");
      return;
    }

    if (!date) {
      alert("Please select a date.");
      return;
    }

    const itemToAdd: BudgetItem = {
      id: crypto.randomUUID(),
      description,
      amount,
      date,
      category,
    };

    setBudgetItems([...budgetItems, itemToAdd]);

    // Reset form
    setDescription("");
    setAmount(0);
    setDate("");
    setCategory("Expense");
  };

  return (
    <form className="budget-tracker-form" onSubmit={handleSubmit}>
      
      {/* Description */}
      <div className="budget-tracker-form__group">
        <label
          htmlFor="description"
          className="budget-tracker-form__label"
        >
          Description
        </label>
        <input
          id="description"
          type="text"
          className="budget-tracker-form__input"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
      </div>

      {/* Amount */}
      <div className="budget-tracker-form__group">
        <label
          htmlFor="amount"
          className="budget-tracker-form__label"
        >
          Amount
        </label>
        <input
          id="amount"
          type="number"
          className="budget-tracker-form__input"
          value={amount}
          onChange={(e) => setAmount(Number(e.target.value))}
        />
      </div>

      {/* Date */}
      <div className="budget-tracker-form__group">
        <label
          htmlFor="date"
          className="budget-tracker-form__label"
        >
          Date
        </label>
        <input
          id="date"
          type="date"
          className="budget-tracker-form__input"
          value={date}
          onChange={(e) => setDate(e.target.value)}
        />
      </div>

      {/* Category */}
      <div className="budget-tracker-form__group">
        <label
          htmlFor="category"
          className="budget-tracker-form__label"
        >
          Category
        </label>
        <select
          id="category"
          className="budget-tracker-form__input"
          value={category}
          onChange={(e) => setCategory(e.target.value as Category)}
        >
          <option value="Income">Income</option>
          <option value="Expense">Expense</option>
        </select>
      </div>

      <button
        type="submit"
        className="budget-tracker-form__submit"
      >
        Add Item
      </button>
    </form>
  );
};

export default BudgetForm;
