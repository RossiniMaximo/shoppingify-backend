import { index } from "../../database/algolia";
import { Item, Shoplist } from "../../models";

export const createShoppingList = async (req, res) => {
  try {
    const { title, userId } = req.body;

    const shoppingList = await Shoplist.create({
      title: title,
      owner: userId,
    });

    return res.send(shoppingList);
  } catch (error) {
    return { error: error.message };
  }
};

export const getMyShoppingLists = async (req, res) => {
  try {
    const { userId } = req.body;
    const shopLists = await Shoplist.findAll({ where: { owner: userId } });
    return res.send(shopLists);
  } catch (e) {
    return res.send({ error: e.message });
  }
};

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
  const shoppingListId = Number(req.params.id);
  const { items, userId } = req.body;
  let newShoppingList;
  let itemsIds = [];

  try {
    const shoppingList = await Shoplist.findOne({
      where: {
        id: shoppingListId,
      },
    });
    newShoppingList = shoppingList;
    items.map(async (i) => {
      let result = await index.search(i, {
        attributesToRetrieve: ["objectID"],
      });
      result.hits.map((item) => {
        newShoppingList.addItem(Number(item.objectID));
      });
    });
    res.status(201).send({ added: true, itemsIds });
  } catch (error) {
    console.log({ error });
    res.status(500).send({ error });
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
