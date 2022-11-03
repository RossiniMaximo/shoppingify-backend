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
  foreignKey: "owner",
  targetKey: "id",
});
Shoplist.hasMany(Item, { foreignKey: "owner" });
Item.belongsToMany(Shoplist, {
  through: "list_item",
});

export { User, Item, Shoplist };
