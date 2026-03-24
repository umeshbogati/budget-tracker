import { configureStore } from "@reduxjs/toolkit";
import budgetItemReducer from "./slices/budgetItemSlice";

export const store = configureStore({
    reducer: {
        budgetItem: budgetItemReducer
    }
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch