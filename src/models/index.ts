import { Auth } from "./Auth";
import { User } from "./User";
import { Shoplist } from "./ShopLists";
import { Item } from "./Item";

User.hasOne(Auth, {
  foreignKey: "user_id",
  sourceKey: "id",
});
Auth.belongsTo(User, {
  foreignKey: "user_id",
  targetKey: "id",
});
User.hasMany(Shoplist, {
  foreignKey: "owner",
  sourceKey: "id",
});
Shoplist.belongsTo(User, {
  targetKey: "id",
});
Shoplist.belongsToMany(Item, { foreignKey: "owner", through: "list_item" });
Item.belongsToMany(Shoplist, {
  through: "list_item",
});

export { User, Item, Shoplist };
