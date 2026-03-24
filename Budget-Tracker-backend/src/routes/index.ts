import { Router } from "express";
import budgetTrackerRoutes from "./budgetTracker";

const router: Router = Router();

router.use("/budgetTracker", budgetTrackerRoutes);

export default router;