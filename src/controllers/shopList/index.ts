import { index } from "../../database/algolia";
import { Item, Shoplist } from "../../models";

// auth middleware
export const createShoppingList = async (req, res) => {
  try {
    const { title, userId } = req.body;
    console.log({ title });
    console.log({ userId });
    const [newShopList, created] = await Shoplist.findOrCreate({
      where: { title, owner: userId },
      defaults: { title, owner: userId },
    });
    return res.send(newShopList);
  } catch (error) {
    return { error: error.message };
  }
};

// auth middleware
export const getMyShoppingLists = async (req, res) => {
  try {
    const { userId } = req.body;
    const shopLists = await Shoplist.findAll({ where: { owner: userId } });
    return res.send(shopLists);
  } catch (e) {
    return res.send({ error: e.message });
  }
};

// auth middleware
export const getShoppingListById = async (req, res) => {
  const { userId } = req.body;
  try {
    const id = req.params.id;
    const shopList = await Shoplist.findOne({ where: { id, owner: userId } });
    const data = shopList.get();
    return res.send(data);
  } catch (e) {
    return res.send({ error: e.message });
  }
};
// auth middleware
export const deleteShoppingListById = async (req, res) => {
  const { userId } = req.body;
  try {
    const id = req.params.id;
    await Shoplist.destroy({
      where: {
        id: id,
        owner: userId,
      },
    });
    return res.sendStatus(204);
  } catch (error) {
    return res.status(500).send({ error: error.message });
  }
};

export const updateShoppingListById = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;
    if (status == "completed" || status == "cancelled") {
      const shoppingList: any = await Shoplist.findByPk(id);
      shoppingList.completed = status;
      await shoppingList.save();
      return res.send(true);
    }
  } catch (error) {
    return res.status(500).send({ error: error.message });
  }
};

// I had a typo in the second if , I only had 1 equal sign instead of 2 and that was converting
// all the non-vegetable items into meat and fish category.
export const getShoppingListItems = async (req, res) => {
  try {
    const meat = [];
    const beverages = [];
    const pasta = [];
    const fruit = [];
    const vegetables = [];
    const dairy = [];
    let newShoppinglist;
    const shoppingListId = req.params.id as number;
    const shoppinglist = await Shoplist.findByPk(shoppingListId);
    newShoppinglist = shoppinglist;
    const items = await newShoppinglist.getItems();

    items.map((i) => {
      if (i.category == "Vegetables") {
        vegetables.push(i);
      }
      if (i.category == "Meat & Fish") {
        meat.push(i);
      }
      if (i.category == "Dairy products") {
        dairy.push(i);
      }
      if (i.category == "Fruit") {
        fruit.push(i);
      }
      if (i.category == "Pasta") {
        pasta.push(i);
      }
      if (i.category == "Beverages") {
        beverages.push(i);
      }
    });
    return res.send({ meat, vegetables, beverages, dairy, pasta, fruit });
  } catch (error) {
    return res.status(500).send({ error: error.message });
  }
};

export const addItemToShoplist = async (req, res) => {
  const shoppingListId = req.params.id;
  const { items } = req.body;

  let itemsIds = [];
  let newShoppingList;

  try {
    const shoppingList = await Shoplist.findOne({
      where: {
        id: shoppingListId,
      },
    });
    if (shoppingList === null) {
      throw { error: { message: "Shopping list not found." } };
    } else {
      newShoppingList = shoppingList;
      /*   await Promise.allSettled(
        items.map(async (i) => {
          const item = await index.search(i, {
            hitsPerPage: 1,
            attributesToHighlight: [],
          });
          return itemsIds.push(item.hits[0].objectID);
        })
      ); */
      const itemsArr = await Promise.allSettled(
        items.map(async (i) => {
          console.log("Item :", i);
          let result = await Item.findOne({ where: { name: i } });
          if(result === null)
          console.log("result :", result);
          return result;
        })
      );
      console.log("Array de items:", itemsArr);

      /* await newShoppingList.addItems(itemsIds); */
      res.status(201).send(true);
    }
  } catch (error) {
    return res.status(500).send({ error: error.message || error });
  }
};

export const deleteItemFromShopList = async (req, res) => {
  try {
    const listId = req.params.id;
    const { itemName } = req.body;
    const list = await Shoplist.findByPk(listId);
    let newList;
    newList = list;
    const newListItems = await newList.getItems();

    const result = newListItems.find((item) => {
      if (item.name == itemName) {
        return item;
      }
    });

    await newList.removeItem(result);

    res.sendStatus(201);
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
};
