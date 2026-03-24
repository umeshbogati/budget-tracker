import './BudgetList.css';
import Budget from "../Components/Budget";
import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../hooks/hooks';
import { deleteBudgetItem, fetchAllBudgetItems } from '../store/slices/budgetItemSlice';

const BudgetList = () => {
    const dispatch = useAppDispatch();
    const { budgetItems: budgetItemsFromRedux, loading } = useAppSelector(state => state.budgetItem);

    useEffect(() => {
        dispatch(fetchAllBudgetItems())
    }, [dispatch])

    const handleDelete = (id: string) => {
        console.log(`Deleting item with id: ${id}`)
        dispatch(deleteBudgetItem(id))
    }

    if (loading) {
        return <div>Loading...</div>
    }

    if (budgetItemsFromRedux.length === 0) {
        return <div>
            <p className="budget-item-list budget-item-list__empty">No budget items found. Please add some.</p>
        </div>
    }
    
    return (
        <div>
            <div className="budget-item-list" style={{width:'100%'}}>
                {budgetItemsFromRedux.map(item => (
                    <Budget key={item._id} item={item} handleDelete={() => handleDelete(item._id)} />
                ))}
            </div>
        </div>

    )
}

export default BudgetList;