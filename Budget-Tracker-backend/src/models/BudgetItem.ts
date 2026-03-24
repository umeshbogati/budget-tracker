import { BudgetItem , BudgetItemRequest, Category} from "../interfaces/budgetTracker";
import mongoose, { Document, Schema } from "mongoose";

// interface IBudgetItem extends Document {
//     description: string;
//     amount: number;
//     date: string;
//     category: Category;
// }

export interface IBudgetItem extends BudgetItemRequest, Document{}

const CategoryValues: Category[] = ["Income", "Expense"];

const budgetItemSchema = new Schema<IBudgetItem>({
    description: { type: String, required: true},
    amount: { type: Number, required: true},
    date: { type: String, required: true },
    category: {type: String, enum: CategoryValues, required: true}
},
{
    timestamps: true
})

const BudgetItemModel = mongoose.model<IBudgetItem>("BudgetItem", budgetItemSchema);

export default BudgetItemModel;