import { BiDownArrowAlt, BiUpArrowAlt } from "react-icons/bi";
import type { BudgetItem } from "../pages/BudgetFormPage";
import { MdDelete } from "react-icons/md";
import { useNavigate } from "react-router";

interface BudgetProps {
    item: BudgetItem;
    handleDelete: (id: string) => void;
}

const Budget = ({item, handleDelete}: BudgetProps) => {
    const navigate = useNavigate();
    
    const handleNavigation = () => {
        navigate(`/item/${item._id}`)
    };

    return (
        <div className="budget-item">
            <div className="budget-item__info" style={{ cursor: "pointer", width: '100%' }} onClick={handleNavigation}>
                <div className="budget-item__title-group">
                    <h3 className="budget-item__title" style={{marginBottom:'0.5rem'}}>{item.description}</h3>
                    <span>{item.category === "Income" ? <BiUpArrowAlt color="green" size={30} /> : <BiDownArrowAlt color="red" size={30} /> }</span>
                </div>
                <p className="budget-item__amount" style={{marginBottom:'0.5rem'}}>Amount: ${item.amount}</p>
                <p className="budget-item__date" style={{marginBottom:'0.5rem'}}>Date: {item.date}</p>
            </div>
            <button className="budget-item__delete" onClick={() => handleDelete(item._id)}><MdDelete color="red" />Delete</button>
        </div>
    )
}

export default Budget;