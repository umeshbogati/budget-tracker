import { Route, Routes } from "react-router";
import "./App.css";
import Header from "./Components/Header";
import BudgetList from "./pages/BudgetList";
import BudgetFormPage from "./pages/BudgetFormPage";
import BudgetItemDetailView from "./pages/BudgetItemDetailView";
import BudgetItemEdit from "./pages/BudgetItemEdit";

function App() {
  return (
    <>
      <Header
        title="Budget Tracker"
        description="This is a budget tracker app"
      />

      <div className="container">
        <Routes>
          <Route index element={<BudgetList />} />
          <Route path="list" element={<BudgetList />} />
          <Route path="/add" element={<BudgetFormPage />} />

          {/* Dynamic Routing */}
          <Route path="/item/:id">
            <Route index element={<BudgetItemDetailView />} />
            <Route path="edit" element={<BudgetItemEdit />} />
          </Route>

          <Route path="*" element={<div>Not Found</div>} />
        </Routes>
      </div>
    </>
  );
}

export default App;
