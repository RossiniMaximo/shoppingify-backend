require("dotenv").config();
import { app } from "./app";
import { sequelize } from "./database";
import "./models/Auth";
import "./models/User";
import "./models/Item";
import "./models/ShopLists";
import { items } from "../items";
import { Item } from "./models/Item";

const PORT = process.env.PORT || 5500;

async function main() {
  try {
    /*  await sequelize.authenticate(); */
    /* await sequelize.sync({ alter: true }); */
    Item.bulkCreate(items)

    app.listen(PORT, () => console.log("server running on port :", PORT));
  } catch (error) {
    console.error("Unable to connect to the database:", error);
  }
}
main();
