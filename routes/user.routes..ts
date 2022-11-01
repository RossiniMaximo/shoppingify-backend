import { Router } from "express";
import { checkPassword } from "../src/controllers/auth";
import { getMyShoppingLists } from "../src/controllers/shopList";
import { findOrCreateUser, getAllUsers, getMe } from "../src/controllers/user";
import { authMiddlware } from "../src/lib/middlewares/auth";

const router = Router();

router.get("/users", getAllUsers);

router.get("/users/login", checkPassword);

router.post("/users", findOrCreateUser);

router.get("/users/me", getMe);

// Returns shopping list's history.
router.post("/user/history", getMyShoppingLists);

export default router;
