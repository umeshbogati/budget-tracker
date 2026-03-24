import { Router } from "express";
import * as budgetTrackerController from "../controllers/budgetTracker";
import { validateParams, validateQueryParams, validateRequestBody } from "../middlewares/validator";
import { createBudgetItemSchema, fetchAll, fetchByIdSchema, updateBudgetItemSchema } from "../schemas/budgetTracker";

const router:Router = Router();

router.get("/", budgetTrackerController.fetchAll)

router.post("/", validateRequestBody(createBudgetItemSchema), budgetTrackerController.create);

router.get("/:id", validateParams(fetchByIdSchema), budgetTrackerController.fetchById);

router.delete("/:id", validateParams(fetchByIdSchema), budgetTrackerController.deleteById);

router.put("/:id", validateParams(fetchByIdSchema), validateRequestBody(updateBudgetItemSchema), budgetTrackerController.update);

export default router;