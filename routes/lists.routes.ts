import { Router } from "express";
import {
  createShoppingList,
  deleteShoppingListById,
  getShoppingListById,
  getShoppingListItems,
  addItemToShoplist,
  deleteItemFromShopList,
  updateShoppingListById,
} from "../controllers/shopList";

const router = Router();

router.get("/shopping-list/:id", getShoppingListById);

router.post("/shopping-list/:id/item", getShoppingListItems);

router.post("/shopping-list", createShoppingList);

router.post("/shopping-list/:id/items", addItemToShoplist);

router.delete("/shopping-list/:id", deleteShoppingListById);

router.delete("/shopping-list/:id/item", deleteItemFromShopList);

router.put("/shopping-list/:id", updateShoppingListById);

export default router;
