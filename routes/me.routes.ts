import { Router } from "express";
import { updateShoppingListById } from "../src/controllers/shopList";

const router = Router();

// Deletes a item from my shopping list.
router.delete("/my-shopping-list/:id");

// Updates the state of an item from my shopping list (How many pieces)
router.put("/my-shopping-list/:id", updateShoppingListById);

export default router;
