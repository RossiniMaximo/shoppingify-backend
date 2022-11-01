import { Router } from "express";
import {
  getItemsSortedByCategory,
  createItem,
  getItemByName,
  updateItemsToAlgolia,
} from "../src/controllers/item";

const router = Router();

// Returns all items for main page.
router.get("/items", getItemsSortedByCategory);

router.post("/item", getItemByName);

// Creates a new item.
router.post("/items", createItem);

router.post("/items/update", updateItemsToAlgolia);

export default router;
