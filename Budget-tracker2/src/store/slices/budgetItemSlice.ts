import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import type { BudgetItem } from "../../pages/BudgetFormPage"
import { create, deleteById, fetchAll, update } from "../../api/budgetItems";

interface BudgetItemState {
    budgetItems: BudgetItem[];
    loading: boolean;
}

const initialState: BudgetItemState = {
    budgetItems: [],
    loading: false,
}

export const fetchAllBudgetItems = createAsyncThunk("budgetItems/fetchAllBudgetItems", async () => {
    const { data } = await fetchAll();

    return data;
});

export const createBudgetItem = createAsyncThunk("budgeItems/createBudgetItem", async (data: Omit<BudgetItem, "_id">) => {
    const { data: createdBudgetItem } = await create(data);

    return createdBudgetItem;
})

export const deleteBudgetItem = createAsyncThunk("budgetItems/deleteBudgetItem", async (id: string) => {
    const response = await deleteById(id);

    return response;
})


export const updateBudgetItem = createAsyncThunk("budgetItems/updateBudgetItem", async (item: BudgetItem) => {
    const { _id, ...data } = item;
    const { data: updatedBudgetItem } = await update(_id, data);

    return updatedBudgetItem;
})


const budgetItemSlice = createSlice({
    name: "budgetItem",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(fetchAllBudgetItems.pending, (state) => {
            state.loading = true;
        })
        builder.addCase(fetchAllBudgetItems.fulfilled, (state, action) => {
            state.loading = false;
            state.budgetItems = action.payload;
        })
        builder.addCase(fetchAllBudgetItems.rejected, (state) => {
            state.loading = false;
        })
        builder.addCase(createBudgetItem.fulfilled, (state, action) => {
            state.budgetItems.push(action.payload);
        })
        builder.addCase(deleteBudgetItem.fulfilled, (state, action) => {
            state.budgetItems = state.budgetItems.filter((item) => item._id !== action.meta.arg);
        })
        builder.addCase(updateBudgetItem.fulfilled, (state, action) => {
            const index = state.budgetItems.findIndex(item => item._id === action.payload._id);
            
            if (index !== -1) {
                state.budgetItems[index] = action.payload;
            }
        })
    }
})

export default budgetItemSlice.reducer;