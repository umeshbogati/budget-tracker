import { useEffect, useMemo } from "react";
import { useNavigate, useParams } from "react-router";
import "./BudgetItemDetailView.css";
import { useAppDispatch, useAppSelector } from "../hooks/hooks";
import {
  deleteBudgetItem,
  fetchAllBudgetItems,
} from "../store/slices/budgetItemSlice";

const BudgetItemDetailView = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { budgetItems, loading } = useAppSelector((state) => state.budgetItem);

  useEffect(() => {
    if (budgetItems.length === 0) {
      dispatch(fetchAllBudgetItems());
    }
  }, [dispatch, budgetItems.length]);

  const item = useMemo(() => {
    if (budgetItems && id) {
      return budgetItems.find((item) => item._id === id);
    }
    return null;
  }, [budgetItems, id]);

  const onDelete = async () => {
    if (!item) {
      return;
    }
    try {
      await dispatch(deleteBudgetItem(item._id)).unwrap();
      navigate("/");
    } catch (error) {
      console.error("Error deleting item: ", error);
    }
  };

  const handleEdit = () => {
    navigate(`/item/${id}/edit`);
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!item) {
    return <div>Budget item not found</div>;
  }

  const details = [
    { title: "Description", content: item.description },
    { title: "Amount", content: `$${item.amount.toFixed(2)}` },
    { title: "Date", content: item.date },
    { title: "Category", content: item.category },
  ];

  return (
    <div className="budget-item-detail">
      <h2>Budget Item Detail</h2>
      <ul className="budget-item-detail__list">
        {details.map(({ title, content }) => (
          <li key={title} className="budget-item-detail__item">
            <p className="budget-item-detail__item-title">{title}:</p>
            <p className="budget-item-detail__item-content">{content}</p>
          </li>
        ))}
      </ul>
      <div className="budget-item-detail__actions">
        <button className="budget-item-detail__btn" onClick={handleEdit}>
          Edit
        </button>
        <button
          className="budget-item-detail__btn budget-item-detail__delete-btn"
          onClick={onDelete}
        >
          Delete
        </button>
      </div>
    </div>
  );
};

export default BudgetItemDetailView;
