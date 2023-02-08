import Categories from "../models/categoriesModel.js";
import Transactions from "../models/transactionModel.js";

export const createCategories = async (req, res) => {
  try {
    const createCategories = await Categories.create({
      type: req.body.type,
      color: req.body.color,
    });

    await createCategories.save(); 

    return res.status(200).json(createCategories);
  } catch (error) {
    return res.status(500).json("Error while adding categories", error.message);
  }
};

export const getCategories = async (req, res) => {
  try {
    const data = await Categories.find({});

    const filter = await data.map((v) =>
      Object.assign({}, { type: v.type, color: v.color })
    );

    return res.status(200).json(filter);
  } catch (error) {
    return res
      .status(500)
      .json("Error while getting Categories", error.message);
  }
};

export const createTransactions = async (req, res) => {
  try {
    let { name, type, amount } = req.body;
    const createTransactions = await Transactions.create({
      name,
      type,
      amount,
      date: Date.now(),
    });

    return res.status(200).json(createTransactions);
  } catch (error) {
    return res
      .status(500)
      .json("error while create transactions", error.message);
  }
};

export const getTransactions = async (req, res) => {
  try {
    const data = await Transactions.find({});

    return res.status(200).json(data);
  } catch (error) {
    return res
      .status(500)
      .json("error while create transactions", error.message);
  }
};

export const deleteTransactions = async (req, res) => {
  try {
    await Transactions.findByIdAndDelete(req.body._id);

    return res.status(200).json("Transaction Item deleted successfully");
  } catch (error) {
    return res.status(500).json("error while get transactions", error.message);
  }
};

export const getLabels = async (req, res) => {
  try {
    const result = await Transactions.aggregate([
      {
        $lookup: {
          from: "categories",
          localField: "type",
          foreignField: "type",
          as: "categories_info",
        },
      },{
        $unwind:"$categories_info"
      }
    ]);

    const data = result.map(v=> Object.assign({},{_id:v._id,name:v.name,type:v.type,amount:v.amount,color:v.categories_info["color"]}))

    return res.status(200).json(data);
  } catch (error) {
    return res.json("error while get labels", error.message);
  }
};
