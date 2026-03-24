import { useEffect, useState } from "react";
import "./BudgetTracker.css";


type Category = "Income" | "Expense";

interface BudgetItem {
    id: string;
    description: string;
    amount:  number;
    date: string;
    category: Category;
}
const INITIAL_BUDGET_ITEMS: BudgetItem[] = [
    {
        id: "id1",
        description: "Salary",
        amount: 5000,
        date: "2026-05-23",
        category: "Income"
    },
    {
         id: "id2",
        description: "Cofee",
        amount: 500,
        date: "2026-05-26",
        category: "Expense"
    }
];


const BudgetTracker = () => {
    const [budgetItems, setBudgetItems] = useState<BudgetItem[]>(INITIAL_BUDGET_ITEMS);
    const [description, setDescription] = useState("");
    const [amount, setAmount] = useState<number>();
    const [date, setDate] = useState("");
    const [category, setCategory] = useState<Category>("Expense");

    useEffect(() => {
        // Load from local storage or initialize if not present
        const items = localStorage.getItem("budgetItems");
        if (items) {
            try {
                const itemParsed: BudgetItem[] = JSON.parse(items);
                if (itemParsed.length > 0) {
                    setBudgetItems(itemParsed);
                }
            } catch (error) {
                console.error("Error: ", error);
            }
        } else {
            localStorage.setItem("budgetItems", JSON.stringify(INITIAL_BUDGET_ITEMS));
        }
    }, []);

    useEffect(() => {
        // Save to local storage whenever budgetItems change
        if (budgetItems.length === 0){
            return;
        };
        localStorage.setItem("budgetItems", JSON.stringify(budgetItems));
    }, [budgetItems]);


    
    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (description.trim() === ""){
            alert("Description is required");
            console.log("Description is required");
        }

        if (amount === undefined || isNaN(amount) || amount <= 0){
            console.log("Amount must be a positive number");
            alert("Amount must be a positive number");
            return;
        }

        const itemToAdd: BudgetItem = {
            id: crypto.randomUUID(),
            description,
            amount: amount,
            date: date,
            category:category
        }
        setBudgetItems(prev => [...prev, itemToAdd])

        setDescription("");
        setAmount(0);
        setDate("");
        setCategory("Expense");
    }

    const handleDelete = (id:string) => {
        const newArry = budgetItems.filter(item => item.id !== id);
        setBudgetItems(newArry);
    }
    return (
        <div className="budget-tracker">
        <div>
          <form className="budget-tracker- form" onSubmit={handleSubmit}>
            <label>
                 <input 
              className="budget-tracker-form__input"
              type="text"
              placeholder="Enter budget item..."
              value = {description}
              onChange={(e) => setDescription(e.target.value)}
            />

            <input
               className="budget-tracker-form__input"
               type="number"
               placeholder="Enter the amount..."
               value={amount}
               onChange={(e) => setAmount(Number(e.target.value))}
            />
            <input
               
               
                className="budget-tracker-form__input"
                type="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
            
            />
            <select
               className="budget-tracker-form__input"
               value={category}
               onChange={(e) => setCategory(e.target.value as Category)}
            >
                <option value="Income">Income</option>
                <option value="Expense">Expense</option>
            </select>
                
            </label>
          
            <button type="submit" className="budget-tracker-form__submit">Submit</button>
          </form>
        </div>
        <div className="budget-list">
            {budgetItems.map(item =>(
                <div className="budget-item" key={item.id}>
                    <div>
                        <p className="budget-item__description">{item.description}</p>
                        <p className="budget-item__amount">{item.amount}</p>
                        <p className="budget-item__date">{item.date}</p>
                        <p className="budget-item__category">{item.category}</p>

                    </div>
                     <button onClick={()=> handleDelete(item.id)} className="budget-item__delete">Delete</button>
           
                    
                </div>
            ))}   

        </div>
        </div>
    )
}

export default BudgetTracker;