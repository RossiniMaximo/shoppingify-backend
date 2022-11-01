import { Item } from "../../src/models";
import { index } from "../../database/algolia";

export const getItemsSortedByCategory = async (req, res) => {
  try {
    let meatAndFish = [];
    let vegetables = [];
    let fruits = [];
    let beverages = [];
    let pasta = [];
    let dairyProducts = [];
    const allItems: any = await index.search("", {
      attributesToHighlight: [],
      hitsPerPage: 1000,
    });

    allItems.hits.filter((item) => {
      if (item.category === "Meat & Fish") {
        meatAndFish.push(item);
      }
      if (item.category === "Vegetables") {
        vegetables.push(item);
      }
      if (item.category === "Fruits") {
        fruits.push(item);
      }
      if (item.category === "Beverages") {
        beverages.push(item);
      }
      if (item.category === "Dairy products") {
        dairyProducts.push(item);
      }
      if (item.category === "Pasta") {
        pasta.push(item);
      }
    });
    return res.send({
      meatAndFish,
      vegetables,
      fruits,
      beverages,
      pasta,
      dairyProducts,
    });
  } catch (error) {
    return res.send({ error: error.message });
  }
};

export const getItemByName = async (req, res) => {
  try {
    const { itemName } = req.body;
    const result = await index.search(itemName, {
      attributesToHighlight: [],
      attributesToRetrieve: [
        "name",
        "description",
        "img",
        "category",
        "objectID",
      ],
    });
    res.send(result.hits);
  } catch (error) {
    return res.status(500).send({ error: error.message });
  }
};

export const createItem = async (req, res) => {
  const { name, description, img, category } = req.body.item;

  try {
    const newItem = await Item.create({
      name,
      description,
      img,
      category,
    });
    const newItemForAlgolia = {
      name,
      description,
      img,
      category,
      objectID: newItem.get("id"),
    };
    await index.saveObject(newItemForAlgolia);
    return res.send(newItem);
  } catch (error) {
    return res.send({ error: error.message });
  }
};

export const updateItemsToAlgolia = async (req, res) => {
  const items = await Item.findAll();
  const itemsForAlgolia = items.map((item: any) => {
    return {
      name: item.name,
      description: item.description,
      img: item.img,
      category: item.category,
      objectID: item.id,
    };
  });
  await index.saveObjects(itemsForAlgolia);
  res.send(itemsForAlgolia);
};
